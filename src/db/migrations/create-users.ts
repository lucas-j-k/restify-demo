/*
*
*  Create users table and seed data
*
*/

const faker = require('faker');

const dbConnection = require('../connect');

const createStatement = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY, 
        email VARCHAR NOT NULL, 
        firstName VARCHAR NOT NULL, 
        surname VARCHAR NOT NULL,
        username VARCHAR NOT NULL
    )
`

const migrate = () => {
    //Serialize executes statements in sequence
    dbConnection.serialize(()=>{

        // Create Users Table
        dbConnection.run(createStatement);

        // Insert Seed Data in a loop
        var insertStatement = dbConnection.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
        for(let i = 1; i <= 5; i++){
            const email = faker.internet.email();
            const firstName = faker.name.firstName();
            const surname = faker.name.lastName();
            const username = faker.internet.userName();
            insertStatement.run(i, email, firstName, surname, username);
        }
        insertStatement.finalize();
})
}

module.exports = migrate;
