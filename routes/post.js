//  Post routes
//  server: Instantiated Restify server
//  dbConnection: Open connection to SQLite

const errs = require('restify-errors');

const PostController = require('../controllers/post');



const postRoutes = (server) => {

    // Instantiate a post controller with the current connection.
    const controller = PostController();

    server.get('/posts', controller.getAll);
    server.get('/posts/:id', controller.getById);
    server.post('/posts', controller.create);

}

module.exports = postRoutes;