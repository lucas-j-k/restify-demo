/*
*
*	Before Tests
*
*/

//Import migrations to set up the database
const runMigrations = require('../dist/db/migrations/index.js');

before(async function() {
	this.timeout(20000);
	await runMigrations();
	console.log('Finished migrating');
});