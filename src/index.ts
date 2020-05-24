/*
*
*  Main file
*  Instantiate Restify server, add middleware and setup routes
*
*/


import restify, {Request} from 'restify';

import dao from './db/dao';
import postRoutes from './routes/post';
import commentRoutes from './routes/comment';

// Initialise Restify server
const server = restify.createServer();

// Add middleware to parse request body and query string
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());


// Initialise resource routes
postRoutes(server, 'v1');
commentRoutes(server, 'v1');


// Add healthcheck route
server.get('/healthcheck', (req, res, next) => {
	res.json({
		message: 'OK',
	});
});


server.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});

module.exports = server;