"use strict";
/*
*
* Drop existing tables and run migrations to build the database
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resetDb_1 = __importDefault(require("./resetDb"));
const create_users_1 = __importDefault(require("./create-users"));
const create_posts_1 = __importDefault(require("./create-posts"));
const create_comments_1 = __importDefault(require("./create-comments"));
const runMigrations = () => {
    try {
        console.log('Resetting DB...');
        resetDb_1.default();
        console.log('Migrating Users Table...');
        create_users_1.default();
        console.log('Migrating Posts Table...');
        create_posts_1.default();
        console.log('Migrating Comments Table...');
        create_comments_1.default();
        console.log('Database ready');
    }
    catch (e) {
        console.log("Error running migrations: ", e);
    }
};
runMigrations();
