/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const User = use('App/Models/User');
const Role = use('App/Models/Role');

class UserSeeder {
	async run() {
		/** CREATE ADMIN USER */
		const admin = new User();
		admin.username = 'admin';
		admin.email = 'admin@plataformasabia.com.br';
		admin.password = '#secret!';
		await admin.save(admin);

		/** CREATE ADMIN ROLE */
		const adminRole = new Role();
		adminRole.role = 'ADMIN';
		adminRole.description = 'ADMIN role';
		await adminRole.save(adminRole);

		/** ASSOCIATE ADMIN ROLE A ADMIN USER */
		await admin.roles().save(adminRole);
		admin.roles = await admin.roles().fetch();
		return admin;
	}
}

module.exports = UserSeeder;
