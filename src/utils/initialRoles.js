import RoleModel from '../models/Role.model.js'

export const createRoles = async () => {
	try {
		const count = await RoleModel.estimatedDocumentCount()
		if (count > 0) {
			return
		}
		const values = await Promise.all([
			new RoleModel({ name: 'user' }).save(),
			new RoleModel({ name: 'admin' }).save(),
		])
	} catch (error) {}
}
