import jwt from 'jsonwebtoken'
import RoleModel from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'

export const verifyToken = async (req, res, next) => {
	let token = req.headers['x-access-token']

	if (!token) return res.status(403).json({ message: 'No hay token.' })

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY)
		req.userId = decoded.id

		const user = await UserModel.findById(req.userId, { password: 0 })
		if (!user)
			return res.status(404).json({ message: 'Usuario no encontrado.' })

		next()
	} catch (error) {
		return res.status(401).json({ message: 'Sin autorizacion!' })
	}
}

export const isAdmin = async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.userId)
		const role = await RoleModel.findOne({ _id: user.role._id })

		if (role.name === 'admin') {
			next()
			return
		}

		return res.status(403).json({ message: 'Se requiere rol de admin!' })
	} catch (error) {
		return res.status(500).send({ message: error })
	}
}
