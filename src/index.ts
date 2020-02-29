/*
*
*  Main file
*  Instantiate Restify server, add middleware and setup routes
*
*/


import restify from 'restify';

import dbConnection from './db/connect';
import dao from './db/dao';
import postRoutes from './routes/post';
import commentRoutes from './routes/comment';

// Initialise Restify server
const server = restify.createServer();

// Add middleware to parse request body and query string
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Add middleware to set up the database access object so it is available on all request objects in routes
server.use((req, res, next) => {
    req.DAO = new dao(dbConnection);
    next();
})

// Initialise resource routes
postRoutes(server);
commentRoutes(server);

server.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});