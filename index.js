const restify = require('restify');

const dbConnection = require('./db/connect');
const dao = require('./db/dao');
const postRoutes = require('./routes/post');

// Initialise Rrestify server
const server = restify.createServer();

// Add middleware to parse request body
server.use(restify.plugins.bodyParser());

// Add middleware to set up the database access object so it is available on all request objects in routes
server.use((req, res, next) => {
    req.DAO = new dao(dbConnection);
    next();
})

// Initialise resource routes
postRoutes(server);

server.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});