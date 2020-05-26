/*
*
*  Create posts table and seed data
*
*/

import faker from 'faker';

import connectedDao from '../dao';

const createStatement: string = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        user_id INT NOT NULL, 
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )
`;

const migrate = async (users: number, postsPerUser: number) => {

    // Create Posts Table 
    await connectedDao.run(createStatement);

    // Insert 5 posts for every user in the table
    const insertStatement = "INSERT INTO posts (user_id, title, content) VALUES (?,?,?)";
    for(let i = 1; i <= users; i++){
        // Cycle through 5 users
        for(let j = 1; j <= postsPerUser; j++){
            // Create 5 posts for current user in the loop
            const sentenceCount: number = Math.floor(Math.random() * 16) + 5;
            const user_id: number = i;
            const title: string = faker.lorem.sentence();
            const content: string = faker.lorem.sentences(sentenceCount);
            await connectedDao.run(insertStatement, [user_id, title, content]);
        }
    }

}

export default migrate;