/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Permission = use('App/Models/Permission');
class PermissionSeeder {
	async run() {
		const permissions = [
			{
				permission: 'CREATE_TECHNOLOGY',
				description: 'Permite criar uma tecnologia',
			},
			{
				permission: 'ADMIN_LOGON',
				description: 'Permite Logar no Painel Administrativo',
			},
			{
				permission: 'CREATE_USERS',
				description: 'Permite criar outros usuários',
			},
			{
				permission: 'CREATE_ROLES',
				description: 'Permite criar papéis',
			},
			{
				permission: 'CREATE_PERMISSIONS',
				description: 'Permite criar permissões',
			},
		];
		await Permission.createMany(permissions);
	}
}

module.exports = PermissionSeeder;
