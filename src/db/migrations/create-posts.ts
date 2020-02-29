/*
*
*  Create posts table and seed data
*
*/

import faker from 'faker';

import dbConnection from '../connect';

const createStatement = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        user_id INT NOT NULL, 
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )
`;

const migrate = () => {
    //Serialize executes statements in sequence
    dbConnection.serialize(()=>{

        // Create Posts Table
        dbConnection.run(createStatement);

        // Insert Seed Data in a loop. Generate 5 posts for each user ID from 1 - 5
        var insertStatement = dbConnection.prepare("INSERT INTO posts (user_id, title, content) VALUES (?,?,?)");

        for(let i = 1; i <= 5; i++){

            // Cycle through 5 users
            for(let j = 1; j <= 5; j++){
                // Create 5 posts for current user
                const sentenceCount = Math.floor(Math.random() * 16) + 5;
                // const id = userCounter;
                const user_id = i;
                const title = faker.lorem.sentence();
                const content = faker.lorem.sentences(sentenceCount);
                insertStatement.run(user_id, title, content);
            }
        }
        insertStatement.finalize();
})
}

export default migrate;