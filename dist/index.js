"use strict";
/*
*
*  Main file
*  Instantiate Restify server, add middleware and setup routes
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_1 = __importDefault(require("restify"));
const connect_1 = __importDefault(require("./db/connect"));
const dao_1 = __importDefault(require("./db/dao"));
const post_1 = __importDefault(require("./routes/post"));
const comment_1 = __importDefault(require("./routes/comment"));
// Initialise Restify server
const server = restify_1.default.createServer();
// Add middleware to parse request body and query string
server.use(restify_1.default.plugins.bodyParser());
server.use(restify_1.default.plugins.queryParser());
// Add middleware to set up the database access object so it is available on all request objects in routes
server.use((req, res, next) => {
    req.DAO = new dao_1.default(connect_1.default);
    next();
});
// Initialise resource routes
post_1.default(server);
comment_1.default(server);
server.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});
