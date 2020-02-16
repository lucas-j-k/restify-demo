// Model for post resource. Holds the methods to interact with posts in the database.
// Takes a dbConnection, which it uses to run the queries

const dao = require('../db/dao');

class PostModel {
    constructor(dbConnection) {
        this.dao = new dao(dbConnection);
    }

    async getAll() {
        const result = await this.dao.all('SELECT * FROM posts', []);
        return result;
    }

    async getById(id) {
        const result = await this.dao.get('SELECT * FROM posts WHERE id = ?', [id]);
        return result;
    }

    async create(body){
        const params = [
            body.user_id,
            body.title,
            body.content
        ];
        await this.dao.run('INSERT INTO posts (user_id, title, content) VALUES (?,?,?)', params);
        return {message: 'Post created successfully'}
    }

}

module.exports = PostModel;