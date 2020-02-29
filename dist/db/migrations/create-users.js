"use strict";
/*
*
*  Create users table and seed data
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const connect_1 = __importDefault(require("../connect"));
const createStatement = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY, 
        email VARCHAR NOT NULL, 
        firstName VARCHAR NOT NULL, 
        surname VARCHAR NOT NULL,
        username VARCHAR NOT NULL
    )
`;
const migrate = () => {
    //Serialize executes statements in sequence
    connect_1.default.serialize(() => {
        // Create Users Table
        connect_1.default.run(createStatement);
        // Insert Seed Data in a loop
        var insertStatement = connect_1.default.prepare("INSERT INTO users VALUES (?,?,?,?,?)");
        for (let i = 1; i <= 5; i++) {
            const email = faker_1.default.internet.email();
            const firstName = faker_1.default.name.firstName();
            const surname = faker_1.default.name.lastName();
            const username = faker_1.default.internet.userName();
            insertStatement.run(i, email, firstName, surname, username);
        }
        insertStatement.finalize();
    });
};
exports.default = migrate;
