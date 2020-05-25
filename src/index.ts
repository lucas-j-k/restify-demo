/*
*
*  Main file
*  Instantiate Restify server, add middleware and setup routes
*
*/

// Load ENV variables
const dotenv = require("dotenv").config();

import restify, {Request} from 'restify';

import config from './config';
import dao from './db/dao';
import postRoutes from './resources/Post/routes';
import commentRoutes from './resources/Comment/routes';

// Read port from config based on environment
const environment = process.env.ENVIRONMENT || 'development';
const port = config[environment].port;


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


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = server;