/*
*
* COMMENT RESOURCE - controller
*
*/

import { Request, Response, Next } from 'restify';
import service from './service';


const commentController = {

    /*
    *   Get all Comments based on user_id or post_id
    */
    getAll: async (req: Request, res: Response, next: Next) => {
        const result = await service.getAll(req);
        res.status(result.status);
        res.json(result);
        return next();
    },

    /*
    *   Get single comment by ID
    */
    getOne: async (req: Request, res: Response, next: Next) => {
        const result = await service.getOne(req);
        res.status(result.status);
        res.json(result);
        return next();
    },

    /*
    *   Create new comment record
    */
    create: async (req: Request, res: Response, next: Next) => {
        const result = await service.create(req);
        res.status(result.status);
        res.json(result);
        return next();
    },

    /*
    *   Update single comment by ID
    */
    update: async (req: Request, res: Response, next: Next) => {
        const result = await service.update(req);
        res.status(result.status);
        res.json(result);
        return next();
    },

    /*
    *   Delete single comment by ID
    */
    delete: async (req: Request, res: Response, next: Next) => {
        const result = await service.delete(req);
        res.status(result.status);
        res.json(result);
        return next();
    },

}

export default commentController;
