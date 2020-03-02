/*
*
*  Promise wrapper around SQLite methods
*
*/

import { Database } from 'sqlite3';

import { DbResult, MessageResult } from '../interfaces/db';

class Dao {

    private dbConnection: Database;

    constructor(dbConnection: Database) {
        this.dbConnection = dbConnection;
    }

    public all(statement: string, args: Array<any> = []): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            this.dbConnection.all(statement, args, (err: Error, rows: Array<any>) => {
                if(err) {
                    reject(err);
                } else {
                    const result = {data: rows};
                    resolve(result);
                }
            });
        })
    }

    public get(statement: string, args: Array<any> = []): Promise<DbResult> {
        return new Promise((resolve, reject) => {
            this.dbConnection.get(statement, args, (err: Error, rows: Array<{}>) => {
                if(err){
                    reject(err);
                } else {
                    const result = {data: [rows]};
                    resolve(result);
                }
            })
        })
    }

    public run(statement: string, args: Array<any> = []): Promise<MessageResult>{
        return new Promise(async (resolve, reject) => {
            this.dbConnection.run(statement, args, (err: Error) => {
                if(err){
                    reject(err);
                } else {
                    resolve({message: 'Statement ran successfully'});
                }
            });
        })
    }

    
}

export default Dao;