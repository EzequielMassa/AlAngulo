import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CartModel } from '../models/Cart.model.js'
import RoleModel from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'

//controlador para traer todos los usuarios
export const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find()
		res.status(200).json(users)
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}
//trae un solo usuario con sus respectivas reservas y ordenes

export const getUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await UserModel.findById(id)
		if (!user) return res.status(404).json({ message: 'User not found' })
		return res.status(200).json(user)
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'no pudimos encontrar el usuario solicitado' })
	}
}
//obtener solo el email del usuario
export const getUserEmail = async (req, res) => {
	const { email } = req.params
	const emailFound = await UserModel.find({
		email: email,
	})
	{
		emailFound.length > 0
			? res.status(200).json(emailFound)
			: res.status(400).json({ message: 'email no encontrado' })
	}
}

//controlador para crear un usuario
export const createUser = async (req, res) => {
	try {
		const { name, lastname, email, phone, password, roles } = req.body
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)
		// Creating a new User Object
		const newUser = new UserModel({
			name,
			lastname,
			email,
			phone,
			password: passwordHash,
			roles,
		})

		// checking for roles
		if (roles) {
			const foundRoles = await RoleModel.find({ name: { $in: roles } })
			newUser.roles = foundRoles.map((role) => role._id)
		} else {
			const role = await RoleModel.findOne({ name: 'user' })
			newUser.roles = [role._id]
		}

		// Saving the User Object in Mongodb
		const savedUser = await newUser.save()

		await CartModel.create({
			user: newUser._id,
		})

		// Create a token
		const token = jwt.sign(
			{
				id: savedUser._id,
				name: savedUser.name,
				lastname: savedUser.lastname,
				email: savedUser.email,
				phone: savedUser.phone,
				roles: savedUser.roles,
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 86400, // 24 hours
			}
		)

		return res.status(200).json({ token })
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

//controlador para borrar un usuario
export const deleteUser = async (req, res) => {
	const { id } = req.params
	try {
		const deletedUser = await UserModel.findByIdAndDelete(id)
		if (!deleteUser) {
			return res.status(404).json({ message: 'Usuario no encontrado' })
		}
		res.json({ message: 'Usuario eliminado correctamente' })
	} catch (error) {
		console.error('Error deleting user:', error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

//controlador para actualizar un usuario
export const updateUser = async (req, res) => {
	const { id } = req.params
	const { name, lastname, email, phone, image, role } = req.body
	try {
		const updateUser = await UserModel.findByIdAndUpdate(
			id,
			{ name, lastname, email, phone, image, role },
			{ new: true }
		)
		res.json(updateUser)
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

//controlador para loguear usuario con autenticacion

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Por favor llena todos los campos' })
		}
		const user = await UserModel.findOne({ email }).populate({
			path: 'roles',
			select: 'name -_id',
		})
		if (!user) {
			return res.status(400).json({ message: 'El usuario no existe' })
		}
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.status(400).json({ message: 'user o password incorrectos' })
		}

		const token = jwt.sign(
			{
				id: user._id,
				name: user.name,
				lastname: user.lastname,
				phone: user.phone,
				roles: user.roles,
			},
			process.env.SECRET_KEY,
			{ expiresIn: '1D' }
		)
		res.header(token).json({ token })
		// res.status(200).json({message:"Bienvenvido, alquila tu cancha tranquilo"})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
