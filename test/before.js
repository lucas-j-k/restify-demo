/*
*
*	Before Tests
*
*/

//Import migrations to set up the database
const runMigrations = require('../dist/db/migrations/index.js');

// Define config to determine what data is inserted into our test database:
const seedConfig = {
	users: 1,
	postsPerUser: 1,
	comments: 5,
};


before(async function() {
	this.timeout(20000);
	await runMigrations(seedConfig);
	console.log('Finished migrating');
});