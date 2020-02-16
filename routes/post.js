//  Post routes
//  server: Instantiated Restify server
//  dbConnection: Open connection to SQLite

const errs = require('restify-errors');

const PostController = require('../controllers/post');

const dao = require('../db/dao');


const postRoutes = (server, dbConnection) => {

    // Instantiate a post controller with the current connection.
    const controller = PostController(dbConnection);

    server.get('/posts/v2', controller.getAll);
    server.get('/posts/v2/:id', controller.getById);
    server.post('/posts/v2', controller.create);

}

module.exports = postRoutes;