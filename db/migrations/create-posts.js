const faker = require('faker');

const dbConnection = require('../connect');

const createStatement = `
    CREATE TABLE IF NOT EXISTS posts (
        id INT PRIMARY KEY, 
        user_id INT NOT NULL, 
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )
`

const migrate = () => {
    //Serialize executes statements in sequence
    dbConnection.serialize(()=>{

        // Create Posts Table
        dbConnection.run(createStatement);

        // Insert Seed Data in a loop. Generate 5 posts for each user ID from 1 - 5
        var insertStatement = dbConnection.prepare("INSERT INTO posts VALUES (?,?,?,?)");
        let userCounter = 1;

        for(let i = 1; i <= 5; i++){

            // Cycle through 5 users
            for(let j = 1; j <= 5; j++){
                // Create 5 posts for current user
                const sentenceCount = Math.floor(Math.random() * 16) + 5;
                const id = userCounter;
                const user_id = i;
                const title = faker.lorem.sentence();
                const content = faker.lorem.sentences(sentenceCount);
                insertStatement.run(id, user_id, title, content);

                // Increment counter, to create posts for the next user
                userCounter += 1;
            }
        }
        insertStatement.finalize();
})
}

module.exports = migrate;
