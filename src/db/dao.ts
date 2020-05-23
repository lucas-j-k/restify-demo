/*
*
*  Promise wrapper around SQLite methods
*
*/

import { Database } from 'sqlite3';
import dbConnection from './connect';

import { MessageResult } from '../interfaces/db';

class Dao {

    private dbConnection: Database;

    constructor(dbConnection: Database) {
        this.dbConnection = dbConnection;
    }

    public all(statement: string, args: Array<any> = []): Promise<[]> {
        return new Promise((resolve, reject) => {
            this.dbConnection.all(statement, args, (err: Error, rows: []) => {
                if(err) {
                    reject(err);
                } else {
                    const data:[] = rows || [];
                     resolve(data);
                }
            });
        })
    }

    public get(statement: string, args: Array<any> = []): Promise<[]> {
        return new Promise((resolve, reject) => {
            this.dbConnection.get(statement, args, (err: Error, rows:[]) => {
                if(err){
                    reject(err);
                } else {
                    const data:[] = rows || [];
                    resolve(data);
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

const connectedDAO = new Dao(dbConnection);

export default connectedDAO;