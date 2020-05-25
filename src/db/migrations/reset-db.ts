/*
*
*  Delete existing tables in DB
*
*/

import connectedDao from '../dao';

const tables: Array<string> = [
    'users',
    'posts',
    'comments',
];

const migrate = async () => {
    console.log('Dropping tables: ', tables.join(' | '));
    tables.forEach(async (table: string) => {
        await connectedDao.run(`DROP TABLE IF EXISTS ${table}`);
    });
}

export default migrate;