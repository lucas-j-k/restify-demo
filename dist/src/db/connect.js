"use strict";
/*
*
*  Connect to SQLite database file
*
*/
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
    if (err) {
        console.error("ERROR :: ", err.message);
    }
});
module.exports = db;
