"use strict";
/*
*
*  Create posts table and seed data
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const connect_1 = __importDefault(require("../connect"));
const createStatement = `
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY, 
        user_id INT NOT NULL, 
        title TEXT NOT NULL,
        content TEXT NOT NULL
    )
`;
const migrate = () => {
    //Serialize executes statements in sequence
    connect_1.default.serialize(() => {
        // Create Posts Table
        connect_1.default.run(createStatement);
        // Insert Seed Data in a loop. Generate 5 posts for each user ID from 1 - 5
        var insertStatement = connect_1.default.prepare("INSERT INTO posts (user_id, title, content) VALUES (?,?,?)");
        for (let i = 1; i <= 5; i++) {
            // Cycle through 5 users
            for (let j = 1; j <= 5; j++) {
                // Create 5 posts for current user
                const sentenceCount = Math.floor(Math.random() * 16) + 5;
                // const id = userCounter;
                const user_id = i;
                const title = faker_1.default.lorem.sentence();
                const content = faker_1.default.lorem.sentences(sentenceCount);
                insertStatement.run(user_id, title, content);
            }
        }
        insertStatement.finalize();
    });
};
exports.default = migrate;
