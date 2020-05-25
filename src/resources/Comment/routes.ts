/*
*
*  COMMENT RESOURCE - routes
*
*/

import { Server } from 'restify';

import CommentController from './controller';

const commentRoutes = (server: Server, version: string) => {

    // Instantiate a comment controller with the connected Database access object
    const controller = new CommentController();

    server.get(`/${version}/comments`, controller.getAll);
    server.get(`/${version}/comments/:id`, controller.getOne);
    server.post(`/${version}/comments`, controller.create);
    server.put(`/${version}/comments/:id`, controller.update);
    server.del(`/${version}/comments/:id`, controller.delete);
}

export default commentRoutes;