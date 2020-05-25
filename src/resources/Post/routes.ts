/*
*
*	POST RESOURCE - routes
*
*/


import { Server } from 'restify';

import PostController from './controller';


const postRoutes = (server: Server) => {

    // Instantiate a comment controller with the connected Database access object
    const controller = new PostController();

    server.get(`/v1/posts`, controller.getAll);
    server.get(`/v1/posts/:id`, controller.getById);
    server.post(`/v1/posts`, controller.create);
    server.put(`/v1/posts/:id`, controller.update);
    server.del(`/v1/posts:id`, controller.delete);

}

export default postRoutes;

