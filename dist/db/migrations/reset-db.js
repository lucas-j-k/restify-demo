"use strict";
/*
*
*  Delete existing tables in DB
*
*/
const dbConnection = require('../connect');
const tables = [
    'users',
    'posts',
    'comments',
];
const migrate = () => {
    //Serialize executes statements in sequence
    dbConnection.serialize(() => {
        console.log('Dropping tables: ', tables.join(' | '));
        tables.forEach(table => {
            dbConnection.run(`DROP TABLE IF EXISTS ${table}`);
        });
    });
};
module.exports = migrate;
