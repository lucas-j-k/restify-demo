"use strict";
/*
*
*  Delete existing tables in DB
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../connect"));
const tables = [
    'users',
    'posts',
    'comments',
];
const migrate = () => {
    //Serialize executes statements in sequence
    connect_1.default.serialize(() => {
        console.log('Dropping tables: ', tables.join(' | '));
        tables.forEach(table => {
            connect_1.default.run(`DROP TABLE IF EXISTS ${table}`);
        });
    });
};
exports.default = migrate;
