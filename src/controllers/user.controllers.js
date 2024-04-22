import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CartModel } from '../models/Cart.model.js'
import RoleModel from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'

export const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find().populate({
			path: 'role',
			select: '-createdAt -updatedAt -_id',
		})
		res.status(200).json({ data: users })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const getUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await UserModel.findById(id).populate({
			path: 'role',
			select: '-createdAt -updatedAt -_id',
		})
		if (!user)
			return res.status(404).json({ message: 'Usuario no encontrado.' })
		return res.status(200).json({ data: user })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
export const getUserEmail = async (req, res) => {
	const { email } = req.params
	const emailFound = await UserModel.find({
		email: email,
	})
	{
		emailFound.length > 0
			? res.status(200).json({ data: emailFound })
			: res.status(400).json({ message: 'Email no encontrado.' })
	}
}

export const createUser = async (req, res) => {
	try {
		const { name, lastname, email, phone, password, role, image } = req.body
		if (!password)
			return res.status(400).json({ message: 'La contraseña es requerida.' })
		if (password.length < 8)
			return res
				.status(400)
				.json({ message: 'La contraseña debe tener al menos 8 caracteres.' })
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)
		const newUser = new UserModel({
			name,
			lastname,
			email,
			phone,
			password: passwordHash,
			role,
			image,
		})

		let tokenRole

		if (role) {
			const foundRoles = await RoleModel.findOne({ name: role })
			newUser.role = foundRoles._id
			tokenRole = foundRoles.name
		} else {
			const role = await RoleModel.findOne({ name: 'user' })
			newUser.role = role._id
			tokenRole = role.name
		}

		const savedUser = await newUser.save()

		await CartModel.create({
			user: newUser._id,
		})

		const token = jwt.sign(
			{
				id: savedUser._id,
				name: savedUser.name,
				lastname: savedUser.lastname,
				email: savedUser.email,
				phone: savedUser.phone,
				image: savedUser.image,
				role: tokenRole,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 86400,
			}
		)

		return res.status(201).header('x-access-token', token).json({ data: token })
	} catch (error) {
		if (error.message.includes('phone')) {
			return res.status(400).json({ message: 'El telefono ya existe' })
		} else {
			return res.status(500).json({ message: error.message })
		}
	}
}
export const deleteUser = async (req, res) => {
	const { id } = req.params
	try {
		const deletedUser = await UserModel.findByIdAndDelete(id)
		if (!deleteUser) {
			return res.status(404).json({ message: 'Usuario no encontrado.' })
		}
		return res.status(200).json({ message: 'Usuario eliminado correctamente.' })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const updateUser = async (req, res) => {
	const { id } = req.params
	const { name, lastname, email, phone, image, role } = req.body
	try {
		const updateUser = await UserModel.findByIdAndUpdate(
			id,
			{ name, lastname, email, phone, image, role },
			{ new: true }
		)
		if (!updateUser) {
			return res.status(404).json({ message: 'Usuario no encontrado' })
		}
		return res.status(200).json({ data: updateUser })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		if (!email || !password) {
			return res.status(400).json({ message: 'Rellene todos los campos' })
		}
		const user = await UserModel.findOne({ email }).populate({
			path: 'role',
			select: 'name -_id',
		})
		if (!user) {
			return res.status(404).json({ message: 'El usuario no existe.' })
		}
		if (!user.active) {
			return res
				.status(400)
				.json({ message: 'Usuario baneado,contacta con los administradores.' })
		}
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.status(400).json({ message: 'Credenciales invalidas.' })
		}

		const token = jwt.sign(
			{
				id: user._id,
				name: user.name,
				lastname: user.lastname,
				phone: user.phone,
				image: user.image,
				role: user.role.name,
			},
			process.env.SECRET_KEY,
			{ expiresIn: '1D' }
		)
		return res.status(200).header('x-access-token', token).json({ token })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}
export const handleUserState = async (req, res) => {
	const { id } = req.params
	const { active } = req.body

	try {
		if (typeof active !== 'boolean') {
			return res
				.status(400)
				.json({ message: `${active} no es un valor valido.` })
		}
		const user = await UserModel.findById(id)
		if (!user) {
			return res.status(400).json({ message: 'El usuario no existe.' })
		}

		user.active = active
		user.save()
		return res
			.status(200)
			.json({ message: `Estado de usuario cambiado a ${active}` })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
