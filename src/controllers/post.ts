/*
*
* Post Controller - define Resource methods
*
*/

import {Request, Response, Next} from 'restify';
import errs from 'restify-errors';

import ConnectedController from './connectedController';
import { newPostValidator, updatePostValidator } from '../validators/post';
import { idValidator } from '../validators/generic';
import service from '../services/post';
import { 
    buildSuccessResponse, 
    buildErrorResponse, 
    buildServerErrorResponse 
} from '../util/responses';


class PostController extends ConnectedController {

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
        const { error } = idValidator(req.params);
        if(error){
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const { id } = req.params;
        const result = await service.getOne(id);
        console.log('RESULT --> ', result);
        res.json(result);
        return next();
    }

    /*
    *   Create new Post record
    */
    public async create (req: Request, res: Response, next: Next) {   
        // Validate request body
        const { error } = newPostValidator(req.body);
        if(error) return next(new errs.BadRequestError(error.details[0].message));

        const postParams = [
            req.body.user_id,
            req.body.title,
            req.body.content
        ];
        
        const result = await service.create(postParams);
        res.json(result);
        return next();        
    }

    public async update (req: Request, res: Response, next: Next) {

        const id = req.params.id;
        const updatePostBody = {
            title: req.body.title,
            content: req.body.content,
            id: req.params.id,
        }; 

        // Validate request params
        const { error } = updatePostValidator(updatePostBody);
        if(error) {
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const updatePostParams = [
            updatePostBody.title,
            updatePostBody.content,
            updatePostBody.id,
        ];

        const result = await service.update(id, updatePostParams);
        res.json(result);
        next();
    }


    public async delete(req: Request, res: Response, next: Next) {
        const { error } = idValidator(req.params);
        if(error){
            return next(new errs.BadRequestError(error.details[0].message));
        }
        const { id } = req.params;
        const statement = 'DELETE from posts WHERE id = ?';
        try {
            const existingRecord = await this.DAO.get('SELECT id FROM posts WHERE id = ?', id);
            if(existingRecord.length === 0) {
                const errorResponse = buildErrorResponse(new errs.NotFoundError('Resource not found'));
                res.json(errorResponse);
                next();
            }
            const result = await this.DAO.run(statement, [id]);
            const successResponse = buildSuccessResponse();
            res.json(successResponse);
            next();
        } catch {
            res.json(buildServerErrorResponse());
            next();
        }
    }

}

export default PostController;