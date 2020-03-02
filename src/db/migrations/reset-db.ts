/*
*
*  Delete existing tables in DB
*
*/

import dbConnection from '../connect';

const tables: Array<string> = [
    'users',
    'posts',
    'comments',
];

const migrate = () => {
    //Serialize executes statements in sequence
    dbConnection.serialize(()=>{
        console.log('Dropping tables: ', tables.join(' | '));
        tables.forEach((table: string) => {
            dbConnection.run(`DROP TABLE IF EXISTS ${table}`);
        });
    })
}

export default migrate;