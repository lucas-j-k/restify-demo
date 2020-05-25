/*
*
*	POST RESOURCE - routes
*
*/


import { Server } from 'restify';

import controller from './controller';


const postRoutes = (server: Server) => {

    server.get(`/v1/posts`, controller.getAll);
    server.get(`/v1/posts/:id`, controller.getById);
    server.post(`/v1/posts`, controller.create);
    server.put(`/v1/posts/:id`, controller.update);
    server.del(`/v1/posts:id`, controller.delete);

}

export default postRoutes;

