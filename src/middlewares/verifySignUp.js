import { ROLES } from '../models/Role.model.js'
import { UserModel } from '../models/User.model.js'

export const checkExistingUser = async (req, res, next) => {
	try {
		const email = await UserModel.findOne({ email: req.body.email })
		if (email)
			return res.status(400).json({ message: 'The email already exists' })

		next()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const checkExistingRole = (req, res, next) => {
	if (req.body.role) {
		if (!ROLES.includes(req.body.role)) {
			return res.status(400).json({
				message: `Role ${req.body.role} does not exist`,
			})
		}
	}

	next()
}
