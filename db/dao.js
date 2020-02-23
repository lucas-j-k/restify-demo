/*
*
*  Promise wrapper around SQLite methods
*
*/

class Dao {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }

    all(statement, args = []) {
        return new Promise((resolve, reject) => {
            this.dbConnection.all(statement, args, (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve({rows});
                }
            });
        })
    }

    get(statement, args = []) {
        return new Promise((resolve, reject) => {
            this.dbConnection.get(statement, args, (err, row) => {
                if(err){
                    reject(err);
                } else {
                    resolve({row})
                }
            })
        })
    }

    run(statement, args = []){
        return new Promise(async (resolve, reject) => {
            this.dbConnection.run(statement, args, (err) => {
                if(err){
                    reject(err);
                } else {
                    resolve({message: 'Statement ran successfully'});
                }
            });
        })
    }

    
}

module.exports = Dao;