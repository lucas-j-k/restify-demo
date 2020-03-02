/*
*
*  Create users table and seed data
*
*/

import faker from 'faker';

import dbConnection from '../connect';

const createStatement: string = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY, 
        email VARCHAR NOT NULL, 
        firstName VARCHAR NOT NULL, 
        surname VARCHAR NOT NULL,
        username VARCHAR NOT NULL
    )
`;

const migrate = (): void => {
    //Serialize executes statements in sequence
    dbConnection.serialize(()=>{

        // Create Users Table
        dbConnection.run(createStatement);

        // Insert Seed Data in a loop
        var insertStatement = dbConnection.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
        for(let i = 1; i <= 5; i++){
            const email: string  = faker.internet.email();
            const firstName: string = faker.name.firstName();
            const surname: string = faker.name.lastName();
            const username: string = faker.internet.userName();
            insertStatement.run(i, email, firstName, surname, username);
        }
        insertStatement.finalize();
})
}

export default migrate;