/*
*
*  Connect to SQLite database file
*
*/

import sqlite3, {Database} from 'sqlite3';

const db: Database  = new sqlite3.Database('database.sqlite', (err) => {
  console.log('CONNECTED******');
  if (err) {
    console.error("ERROR ::  ", err.message);
  }
});

export default db;