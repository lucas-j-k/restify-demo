// Model for post resource. Holds the methods to interact with posts in the database.
// Takes a dbConnection, which it uses to run the queries

const dao = require('../db/dao');

class PostModel {
    constructor(dbConnection) {
        this.dao = new dao(dbConnection);
    }

    async getAll() {
        try {
            const result = await this.dao.all('SELECT * FROM posts', []);
            return result;
        } catch (e) {
            console.log("Error in model -- getAll() -- ", e);
            throw new Error(e)
        }
    }

    async getById(id) {
        try {
            const result = await this.dao.get('SELECT * FROM posts WHERE id = ?', [id]);
            return result;
        } catch(e) {
            console.log("Error in model -- getById() -- ", e);
            throw new Error(e)
        }
    }

    async create(body){
        try {
            const params = [
                body.user_id,
                body.title,
                body.content
            ];
            await this.dao.run('INSERT INTO posts (user_id, title, content) VALUES (?,?,?)', params);
            return {message: 'Post created successfully'}
        } catch(e) {
            console.log("Error in model -- create() -- ", e);
            throw new Error(e)
        }
    }

}

module.exports = PostModel;