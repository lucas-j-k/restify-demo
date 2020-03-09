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



const postRoutes = (server: Server, version: string) => {

    // Instantiate a custom database access object
    const Dao = new DAO(dbConnection);

    // Instantiate a comment controller with the connected Database access object
    const controller = new PostController(Dao);

    server.get(`/${version}/posts`, controller.get);
    server.get(`/${version}/posts/:id`, controller.getById);
    server.post(`/${version}/posts`, controller.create);
    server.put(`/${version}/posts/:id`, controller.update);
    server.del(`/${version}/posts/:id`, controller.delete);

}

export default postRoutes;