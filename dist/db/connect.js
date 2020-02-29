"use strict";
/*
*
*  Connect to SQLite database file
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const db = new sqlite3_1.default.Database('../../database.sqlite', (err) => {
    if (err) {
        console.error("ERROR :: ", err.message);
    }
});
exports.default = db;
