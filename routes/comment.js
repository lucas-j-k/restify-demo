/*
*
*  Controller for comment resouce.
*  Takes an instantiated Restify server instance
*
*/

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