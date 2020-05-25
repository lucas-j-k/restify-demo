/*
*
*  Connect to SQLite database file
*
*/

import sqlite3, {Database} from 'sqlite3';
import config from '../config';


const connect = () => {
	const environment: string = process.env.ENVIRONMENT || 'development';
	const dbName = config[environment].dbName;

	console.log(`Connecting to DB in [${environment}] mode`);
	console.log(`Using [${dbName}] as the database file`);


	const db: Database  = new sqlite3.Database(dbName, (err) => {
  		if (err) {
	    console.error("ERROR ::  ", err.message);
	  }
	});
	return db;
};

const connectedDb = connect();

export default connectedDb;