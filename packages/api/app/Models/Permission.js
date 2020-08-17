/* @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Role = use('App/Models/Role');
const Technology = use('App/Models/Technology');
const TechnologyReview = use('App/Models/TechnologyReview');
const Upload = use('App/Models/Upload');
const CE = require('@adonisjs/lucid/src/Exceptions');
const { permissions, matchesPermission } = require('../Utils');

class Permission extends Model {
	static boot() {
		super.boot();
		this.addTrait('Params');
	}

	roles() {
		return this.belongsToMany('App/Models/Role');
	}

	users() {
		return this.belongsToMany('App/Models/User');
	}

	/**
	 * Gets a permission by its id or slug
	 *
	 * @param {string|number} permission Permission id or slug.
	 * @returns {Permission}
	 */
	static async getPermission(permission) {
		if (Number.isInteger(Number(permission))) {
			return this.findOrFail(permission);
		}

		const permissionInst = await this.query()
			.where({ permission })
			.first();

		if (!permissionInst) {
			throw CE.ModelNotFoundException.raise('Permission');
		}

		return permissionInst;
	}

	static async checkIndividualPermission(user, matchedPermission, params) {
		const { id, idUser, idTechnology } = params;
		const userResourceId = id || idUser;
		const techonologyResourceId = id || idTechnology;

		/** Individual User Permissions */
		if (
			matchesPermission(
				[
					permissions.VIEW_USER,
					permissions.UPDATE_USER,
					permissions.DELETE_USER,
					permissions.LIST_BOOKMARK,
					permissions.DELETE_BOOKMARK,
				],
				matchedPermission,
			)
		) {
			if (user.id.toString() !== userResourceId) {
				return false;
			}
		}

		/** Individual Technology Permissions */
		if (
			matchesPermission(
				[permissions.UPDATE_TECHNOLOGY, permissions.DELETE_TECHNOLOGY],
				matchedPermission,
			)
		) {
			const technology = await Technology.findOrFail(techonologyResourceId);
			const technologyOwner = await technology.getOwner();
			if (!technologyOwner || technologyOwner.id !== user.id) {
				return false;
			}
		}
		/** Individual Technology Review Permissions */
		if (matchesPermission([permissions.UPDATE_TECHNOLOGY_REVIEW], matchedPermission)) {
			const technologyReview = await TechnologyReview.findOrFail(id);
			if (technologyReview.user_id !== user.id) {
				return false;
			}
		}

		/** Individual Uploads Permissions */
		if (matchesPermission([permissions.DELETE_UPLOAD], matchedPermission)) {
			const upload = await Upload.findOrFail(id);
			if (upload.user_id !== user.id) {
				return false;
			}
		}

		return true;
	}

	static async checkPermission(user, permissionsList, params) {
		// Get All Permission related to user
		const userRole = await Role.find(user.role_id);
		const [userRolePermissions, userDirectPermissions] = await Promise.all([
			userRole.permissions().fetch(),
			user.permissions().fetch(),
		]);
		const userPermissions = [...userRolePermissions.rows, ...userDirectPermissions.rows];
		const userPermissionsArr = userPermissions.map((up) => up.permission);
		const matchedPermissions = permissionsList.filter((p) => userPermissionsArr.includes(p));
		if (matchedPermissions && matchedPermissions.length) {
			return this.checkIndividualPermission(user, matchedPermissions[0], params);
		}
		return false;
	}
}

module.exports = Permission;
