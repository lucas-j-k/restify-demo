/*
*
*  Main file
*  Instantiate Restify server, add middleware and setup routes
*
*/


import restify, {Request} from 'restify';

import dao from './db/dao';
import postRoutes from './resources/Post/routes';
import commentRoutes from './resources/Comment/routes';

// Initialise Restify server
const server = restify.createServer();

// Add middleware to parse request body and query string
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());


// Initialise resource routes
postRoutes(server);
commentRoutes(server);


// Register healthcheck route for testing
server.get('/healthcheck', (req, res, next) => {
	res.json({
		message: 'OK',
	});
});


server.listen(8000, () => {
    console.log(`Server listening on port 8000`);
});

module.exports = server;