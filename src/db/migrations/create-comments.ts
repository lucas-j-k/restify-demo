/*
*
*  Create comments table and seed data
*
*/

import faker from 'faker';

import connectedDao from '../dao';

const createStatement: string = `
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY, 
        user_id INT NOT NULL, 
        post_id INT NOT NULL,
        content TEXT NOT NULL
    )
`;

const migrate = async (users: number, postsPerUser: number, comments: number) => {

    // Calculate total number of posts, so we can limit the post_id generation
    const totalNumberOfPosts = users * postsPerUser;

    // Create Comments Table
    await connectedDao.run(createStatement);

    // Insert Seed Data in a loop. Generate 5 posts for each user ID from 1 - 5
    const insertStatement = 'INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)';

    for(let i = 1; i <= comments; i++){
        const sentenceCount: number = faker.random.number({min:1, max:15});
        const user_id: number = faker.random.number({min:1, max: users});
        const post_id: number = faker.random.number({min:1, max: totalNumberOfPosts});
        const content: string = faker.lorem.sentences(sentenceCount);
        await connectedDao.run(insertStatement, [user_id, post_id, content]);
    }
}

export default migrate;