import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { CartModel } from '../models/Cart.model.js'
import RoleModel from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'

export const getUsers = async (req, res) => {
	try {
		const users = await UserModel.find().populate({
			path: 'roles',
			select: '-createdAt -updatedAt -_id',
		})
		res.status(200).json({ data: users })
	} catch (error) {
		return res.status(404).json({ message: error.message })
	}
}

export const getUser = async (req, res) => {
	const { id } = req.params
	try {
		const user = await UserModel.findById(id).populate({
			path: 'roles',
			select: '-createdAt -updatedAt -_id',
		})
		if (!user) return res.status(404).json({ message: 'User not found' })
		return res.status(200).json({ data: user })
	} catch (error) {
		return res
			.status(404)
			.json({ message: `We couldnt find the user with ID : ${id} ` })
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
			: res.status(400).json({ message: 'Email not found' })
	}
}

export const createUser = async (req, res) => {
	try {
		const { name, lastname, email, phone, password, roles } = req.body
		if (!password)
			return res.status(400).json({ message: 'The password is required' })
		if (password.length < 8)
			return res
				.status(400)
				.json({ message: 'The password must have at least 8 characters long' })
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)
		const newUser = new UserModel({
			name,
			lastname,
			email,
			phone,
			password: passwordHash,
			roles,
		})

		if (roles) {
			const foundRoles = await RoleModel.find({ name: { $in: roles } })
			newUser.roles = foundRoles.map((role) => role._id)
		} else {
			const role = await RoleModel.findOne({ name: 'user' })
			newUser.roles = [role._id]
		}

		const tokenRoles = roles ? roles : ['user']
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
				roles: tokenRoles[0],
			},
			process.env.SECRET_KEY,
			{
				expiresIn: 86400,
			}
		)

		return res.status(200).json({ data: token })
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

export const deleteUser = async (req, res) => {
	const { id } = req.params
	try {
		const deletedUser = await UserModel.findByIdAndDelete(id)
		if (!deleteUser) {
			return res.status(404).json({ message: 'User not found' })
		}
		res.json({ message: 'User successfully deleted' })
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' })
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
		res.status(200).json({ data: updateUser })
	} catch (error) {
		res.status(404).json({ message: error.message })
	}
}

export const login = async (req, res) => {
	const { email, password } = req.body
	try {
		if (!email || !password) {
			return res.status(400).json({ message: 'Please complete all the fields' })
		}
		const user = await UserModel.findOne({ email }).populate({
			path: 'roles',
			select: 'name -_id',
		})
		if (!user) {
			return res.status(400).json({ message: 'The user do not exist' })
		}
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.status(400).json({ message: 'Invalid credentials' })
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
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
export const handleUserState = async (req, res) => {
	const { id } = req.params
	const { active } = req.body

	try {
		if (typeof active !== 'boolean') {
			return res.status(400).json({ message: `${active} is not a valid input` })
		}
		const user = await UserModel.findById(id)
		if (!user) {
			return res.status(400).json({ message: 'user do not exist' })
		}

		user.active = active
		user.save()
		return res.status(200).json({ message: `user stated changed to ${active}` })
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}
