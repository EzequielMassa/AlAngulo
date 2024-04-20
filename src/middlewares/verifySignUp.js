import { ROLES } from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'

export const checkExistingUser = async (req, res, next) => {
	try {
		const email = await UserModel.findOne({ email: req.body.email })
		if (email) return res.status(400).json({ message: 'El email ya existe.' })

		next()
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
}

export const checkExistingRole = (req, res, next) => {
	if (req.body.role) {
		if (!ROLES.includes(req.body.role)) {
			return res.status(400).json({
				message: `El rol ${req.body.role} no existe.`,
			})
		}
	}

	next()
}
