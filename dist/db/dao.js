"use strict";
/*
*
*  Promise wrapper around SQLite methods
*
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Dao {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    all(statement, args = []) {
        return new Promise((resolve, reject) => {
            this.dbConnection.all(statement, args, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ rows });
                }
            });
        });
    }
    get(statement, args = []) {
        return new Promise((resolve, reject) => {
            this.dbConnection.get(statement, args, (err, row) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ row });
                }
            });
        });
    }
    run(statement, args = []) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            this.dbConnection.run(statement, args, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({ message: 'Statement ran successfully' });
                }
            });
        }));
    }
}
module.exports = Dao;
