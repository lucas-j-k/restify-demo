/*
*
*  Controller for post resouce.
*  Takes an instantiated Restify server instance
*
*/

import { Server } from 'restify';

import PostController from '../controllers/Post';
import DAO from '../db/dao';
import dbConnection from '../db/connect';



const postRoutes = (server: Server) => {

    // Instantiate a custom database access object
    const Dao = new DAO(dbConnection);

    // Instantiate a comment controller with the connected Database access object
    const controller = new PostController(Dao);

    server.get('/posts', controller.get);
    server.get('/posts/:id', controller.getById);
    server.post('/posts', controller.create);
    server.put('/posts/:id', controller.update);

}

export default postRoutes;