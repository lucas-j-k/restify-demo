/*
*
*	Run migration script - for npm script
*
*/

import runMigrations from './index.js';

const seedConfig = {
	users: 5,
	postsPerUser: 5,
	comments: 40,
};

runMigrations(seedConfig);