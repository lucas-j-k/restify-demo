/*
*
*	POST RESOURCE - routes
*
*/


import { Server } from 'restify';

import PostController from './controller';


const postRoutes = (server: Server, version: string) => {

    // Instantiate a comment controller with the connected Database access object
    const controller = new PostController();

    server.get(`/${version}/posts`, controller.getAll);
    server.get(`/${version}/posts/:id`, controller.getById);
    server.post(`/${version}/posts`, controller.create);
    server.put(`/${version}/posts/:id`, controller.update);
    server.del(`/${version}/posts/:id`, controller.delete);

}

export default postRoutes;

