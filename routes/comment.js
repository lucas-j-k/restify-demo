//  Comment routes
//  server: Instantiated Restify server

const errs = require('restify-errors');

const CommentController = require('../controllers/comment');



const commentRoutes = (server) => {

    // Instantiate a comment controller with the current connection.
    const controller = CommentController();

    server.get('/comments', controller.get);
    server.get('/comments/:id', controller.getById);

}

module.exports = commentRoutes;