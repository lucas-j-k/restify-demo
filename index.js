const restify = require('restify');

const dbConnection = require('./db/connect');
const postRoutes = require('./routes/post');

// Initialise Rrestify server
const server = restify.createServer();

// Add middleware to parse request body
server.use(restify.plugins.bodyParser());


// Initialise resource routes
postRoutes(server, dbConnection);

server.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});