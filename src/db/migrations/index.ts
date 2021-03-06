/*
*
* Drop all existing tables and run migrations to build the database
*
*/

import dotenv from 'dotenv';

import resetDb from './reset-db';
import migrateUsers from './create-users';
import migratePosts from './create-posts';
import migrateComments from './create-comments';

dotenv.config();

interface configObject {
    users: number,
    postsPerUser: number,
    comments: number,
};


const runMigrations = async (config: configObject) => {
    console.log(`
  Seeding Database in [${process.env.ENVIRONMENT}] Mode
  ------------------------------------------------
  Number of users: ${config.users}
  Number of posts per user: ${config.postsPerUser}
  Number of comments: ${config.comments}
  ------------------------------------------------
        `
    );

    try {
        console.log('Resetting DB...');
        await resetDb();

        console.log('Migrating Users Table...');
        await migrateUsers(config.users);

        console.log('Migrating Posts Table...');
        await migratePosts(config.users, config.postsPerUser);

        console.log('Migrating Comments Table...');
        await migrateComments(config.users, config.postsPerUser, config.comments);

        console.log('Database ready');
    } catch (e) {
        console.log("Error running migrations: ", e);
    }

}


// Common mpdule export for testing
module.exports = runMigrations;

export default runMigrations;