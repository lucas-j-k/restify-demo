"use strict";
/*
*
*  Create comments table and seed data
*
*/
const faker = require('faker');
const dbConnection = require('../connect');
const createStatement = `
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY, 
        user_id INT NOT NULL, 
        post_id INT NOT NULL,
        content TEXT NOT NULL
    )
`;
const migrate = () => {
    //Serialize executes statements in sequence
    dbConnection.serialize(() => {
        // Create Comments Table
        dbConnection.run(createStatement);
        // Insert Seed Data in a loop. Generate 5 posts for each user ID from 1 - 5
        var insertStatement = dbConnection.prepare("INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)");
        for (let i = 1; i <= 40; i++) {
            const sentenceCount = faker.random.number({ min: 1, max: 15 });
            const user_id = faker.random.number({ min: 1, max: 5 });
            const post_id = faker.random.number({ min: 1, max: 25 });
            const content = faker.lorem.sentences(sentenceCount);
            insertStatement.run(user_id, post_id, content);
        }
        insertStatement.finalize();
    });
};
module.exports = migrate;
