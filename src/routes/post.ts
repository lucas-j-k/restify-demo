/*
*
*  Controller for post resouce.
*  Takes an instantiated Restify server instance
*
*/


import PostController from '../controllers/post';



const postRoutes = (server) => {

    // Instantiate a post controller with the current connection.
    const controller = PostController();

    server.get('/posts', controller.getAll);
    server.get('/posts/:id', controller.getById);
    server.post('/posts', controller.create);
    server.put('/posts/:id', controller.update);

}

export default PostController;