/*
*
* Post Controller - define Resource methods
*
*/

import {Request, Response, Next} from 'restify';
import service from '../services/post';


class PostController {

    /*
    *   Get all Posts
    */
    public async get (req: Request, res: Response, next: Next) {
        const result = await service.getAll();
        res.json(result);
        return next();
    }


    /*
    *   Get single Post by ID
    */
    public async getById (req: Request, res: Response, next: Next) {
        const result = await service.getOne(req);
        res.status(result.status);
        res.json(result);
        return next();
    }

    /*
    *   Create new Post record
    */
    public async create (req: Request, res: Response, next: Next) {   
        const result = await service.create(req);
        res.json(result);
        return next();        
    }

    /*
    *   Update an existing Post record
    */
    public async update (req: Request, res: Response, next: Next) {
        const result = await service.update(req);
        res.status(result.status);
        res.json(result);
        next();
    }

    /*
    *   Delete an existing Post record
    */
    public async delete (req: Request, res: Response, next: Next) {
            const result = await service.delete(req);
            res.status(result.status);
            res.json(result);
            next();
    }

}

export default PostController;