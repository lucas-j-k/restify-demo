/*
*
*	POST RESOURCE - controller
*
*/


import { Request, Response, Next } from 'restify';
import service from './service';


const postController = {

    /*
    *   Get all Posts
    */
    getAll: async (req: Request, res: Response, next: Next) => {
        const result = await service.getAll();
        res.status(result.status);
        res.json(result);
        return next();
    },


    /*
    *   Get single Post by ID
    */
    getById: async (req: Request, res: Response, next: Next) => {
        const result = await service.getOne(req);
        res.status(result.status);
        res.json(result);
        return next();
    },

    /*
    *   Create new Post record
    */
    create: async (req: Request, res: Response, next: Next) => {   
        const result = await service.create(req);
        res.json(result);
        return next();        
    },

    /*
    *   Update an existing Post record
    */
    update: async (req: Request, res: Response, next: Next) => {
        const result = await service.update(req);
        res.status(result.status);
        res.json(result);
        next();
    },

    /*
    *   Delete an existing Post record
    */
    delete: async (req: Request, res: Response, next: Next) => {
            const result = await service.delete(req);
            res.status(result.status);
            res.json(result);
            next();
    },

}
export default postController;