/*
*
*  Routes for comment resouce.
*  Takes an instantiated Restify server instance
*
*/

import { Server } from 'restify';

import CommentController from '../controllers/comment';
import DAO from '../db/dao';
import dbConnection from '../db/connect';


const commentRoutes = (server: Server, version: string) => {

    // Instantiate a custom database access object
    const Dao = new DAO(dbConnection);

    // Instantiate a comment controller with the connected Database access object
    const controller = new CommentController(Dao);

    server.get(`/${version}/comments`, controller.get);
    server.get(`/${version}/comments/:id`, controller.getById);
    server.post(`/${version}/comments`, controller.create);
    server.put(`/${version}/comments/:id`, controller.update);
    server.del(`/${version}/comments/:id`, controller.delete);
}

export default commentRoutes;