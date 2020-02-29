/*
*
* Drop existing tables and run migrations to build the database
*
*/

import resetDb from './resetDb';
import migrateUsers from './create-users';
import migratePosts from './create-posts';
import migrateComments from './create-comments';

const runMigrations = () => {
    try {
        console.log('Resetting DB...');
        resetDb();
        console.log('Migrating Users Table...');
        migrateUsers();
        console.log('Migrating Posts Table...');
        migratePosts();
        console.log('Migrating Comments Table...');
        migrateComments();
        console.log('Database ready');
    } catch(e){
        console.log("Error running migrations: ", e);
    }

}

runMigrations();