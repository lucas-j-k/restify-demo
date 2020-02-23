//  Comment routes
//  server: Instantiated Restify server

const CommentController = require('../controllers/comment');



const commentRoutes = (server) => {

    // Instantiate a comment controller with the current connection.
    const controller = CommentController();

    server.get('/comments', controller.get);
    server.get('/comments/:id', controller.getById);
    server.post('/comments', controller.create);
    server.put('/comments/:id', controller.update);

}

module.exports = commentRoutes;