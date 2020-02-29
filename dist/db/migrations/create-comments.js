"use strict";
/*
*
*  Create comments table and seed data
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = __importDefault(require("faker"));
const connect_1 = __importDefault(require("../connect"));
const createStatement = `
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY, 
        user_id INT NOT NULL, 
        post_id INT NOT NULL,
        content TEXT NOT NULL
    )
`;
const migrate = () => {
    //Serialize executes statements in sequence
    connect_1.default.serialize(() => {
        // Create Comments Table
        connect_1.default.run(createStatement);
        // Insert Seed Data in a loop. Generate 5 posts for each user ID from 1 - 5
        var insertStatement = connect_1.default.prepare("INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)");
        for (let i = 1; i <= 40; i++) {
            const sentenceCount = faker_1.default.random.number({ min: 1, max: 15 });
            const user_id = faker_1.default.random.number({ min: 1, max: 5 });
            const post_id = faker_1.default.random.number({ min: 1, max: 25 });
            const content = faker_1.default.lorem.sentences(sentenceCount);
            insertStatement.run(user_id, post_id, content);
        }
        insertStatement.finalize();
    });
};
exports.default = migrate;
