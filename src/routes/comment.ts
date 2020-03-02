/*
*
*  Controller for comment resouce.
*  Takes an instantiated Restify server instance
*
*/

import { Server } from 'restify';

import CommentController from '../controllers/comment';
import DAO from '../db/dao';
import dbConnection from '../db/connect';


const commentRoutes = (server: Server) => {

    // Instantiate a custom database access object
    const Dao = new DAO(dbConnection);

    // Instantiate a comment controller with the connected Database access object
    const controller = new CommentController(Dao);

    server.get('/comments', controller.get);
    server.get('/comments/:id', controller.getById);
    server.post('/comments', controller.create);
    server.put('/comments/:id', controller.update);

}

export default commentRoutes;