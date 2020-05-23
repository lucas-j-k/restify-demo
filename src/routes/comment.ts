/*
*
*  Routes for comment resouce.
*  Takes an instantiated Restify server instance
*
*/

import { Server } from 'restify';

import CommentController from '../controllers/comment';
import connectedDAO from '../db/dao';

const commentRoutes = (server: Server, version: string) => {

    // Instantiate a comment controller with the connected Database access object
    const controller = new CommentController(connectedDAO);

    server.get(`/${version}/comments`, controller.get);
    server.get(`/${version}/comments/:id`, controller.getById);
    server.post(`/${version}/comments`, controller.create);
    server.put(`/${version}/comments/:id`, controller.update);
    server.del(`/${version}/comments/:id`, controller.delete);
}

export default commentRoutes;