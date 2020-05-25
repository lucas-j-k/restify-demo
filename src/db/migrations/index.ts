/*
*
* Drop all existing tables and run migrations to build the database
*
*/

import resetDb from './reset-db';
import migrateUsers from './create-users';
import migratePosts from './create-posts';
import migrateComments from './create-comments';

const runMigrations = async () => {
    try {
        console.log('Resetting DB...');
        await resetDb();
        console.log('Migrating Users Table...');
        await migrateUsers();
        console.log('Migrating Posts Table...');
        await migratePosts();
        console.log('Migrating Comments Table...');
        await migrateComments();
        console.log('Database ready');
        return false;
    } catch(e){
        console.log("Error running migrations: ", e);
    }

}


// Export for testing
module.exports = runMigrations;