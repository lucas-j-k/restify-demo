/*
*
*  Connect to SQLite database file
*
*/

import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.sqlite', (err) => {
  if (err) {
    console.error("ERROR ::  ", err.message);
  }
});

export default db;