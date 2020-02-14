// Model for post resource. Holds the methods to interact with posts in the database.
// Takes a dbConnection, which it uses to run the queries

class PostModel {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.dbConnection.all('SELECT * FROM posts', [], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve({rows});
                }
            });
        })
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.dbConnection.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
                if(err){
                    reject(err);
                } else {
                    resolve({row})
                }
            })
        })
    }

    create(body){
        return new Promise(async (resolve, reject) => {
            const params = [
                body.user_id,
                body.title,
                body.content
        ];
            this.dbConnection.run("INSERT INTO posts (user_id, title, content) VALUES (?,?,?)", params, (err) => {
                if(err){
                    reject(err);
                } else {
                    resolve({message: 'Post created successfully'});
                }
            });
        })
    }

}

module.exports = PostModel;