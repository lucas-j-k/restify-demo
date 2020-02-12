/*
*
* Drop existing tables and run migrations to build the database
*
*/

const resetDb = require('./reset-db');
const migrateUsers = require('./create-users');
const migratePosts = require('./create-posts');

const runMigrations = () => {
    try {
        console.log('Resetting DB...');
        resetDb();
        console.log('Migrating Users Table...');
        migrateUsers();
        console.log('Migrating Posts Table...');
        migratePosts();
        console.log('Database ready');
    } catch(e){
        console.log("Error running migrations: ", e);
    }

}

runMigrations();