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

    server.get(`/v1/comments`, controller.getAll);
    server.get(`/v1/comments/:id`, controller.getOne);
    server.post(`/v1/comments`, controller.create);
    server.put(`/v1/comments/:id`, controller.update);
    server.del(`/v1/comments/:id`, controller.delete);
}

export default commentRoutes;