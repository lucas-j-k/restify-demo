/*
*
*  Create users table and seed data
*
*/

import faker from 'faker';

import connectedDao from '../dao';

const createStatement: string = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY, 
        email VARCHAR NOT NULL, 
        firstName VARCHAR NOT NULL, 
        surname VARCHAR NOT NULL,
        username VARCHAR NOT NULL
    )
`;

const migrate = async () => {

    try {

        // Create Users Table
        await connectedDao.run(createStatement);

        // Insert Seed Data in a loop
        const insertStatement = 'INSERT INTO users VALUES (?,?,?,?,?)';
        for(let i = 1; i <= 5; i++){
            const email: string  = faker.internet.email();
            const firstName: string = faker.name.firstName();
            const surname: string = faker.name.lastName();
            const username: string = faker.internet.userName();
            await connectedDao.run(insertStatement, [i, email, firstName, surname, username]);
        }
    } catch (e) {
        console.log('Caught error - ', e);
    }
};

export default migrate;