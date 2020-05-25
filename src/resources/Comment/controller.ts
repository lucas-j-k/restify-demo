/*
*
* COMMENT RESOURCE - controller
*
*/

import { Request, Response, Next } from 'restify';
import service from './service';


class CommentController {

    /*
    *   Get all Comments based on user_id or post_id
    */
    public async getAll(req: Request, res: Response, next: Next){
        const result = await service.getAll(req);
        res.status(result.status);
        res.json(result);
        return next();
    }

    /*
    *   Get single comment by ID
    */
    public async getOne(req: Request, res: Response, next: Next){
        const result = await service.getOne(req);
        res.status(result.status);
        res.json(result);
        return next();
    }

    /*
    *   Create new comment record
    */
    public async create(req: Request, res: Response, next: Next){
        const result = await service.create(req);
        res.status(result.status);
        res.json(result);
        return next();
    }

    /*
    *   Update single comment by ID
    */
    public async update(req: Request, res: Response, next: Next){
        const result = await service.update(req);
        res.status(result.status);
        res.json(result);
        return next();
    }

    /*
    *   Delete single comment by ID
    */
    public async delete(req: Request, res: Response, next: Next){
        const result = await service.delete(req);
        res.status(result.status);
        res.json(result);
        return next();
    }

}

export default CommentController;
