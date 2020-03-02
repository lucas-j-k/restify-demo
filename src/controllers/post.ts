/*
*
* Post Controller - define Resource methods
*
*/

import {Request, Response, Next} from 'restify';
import errs from 'restify-errors';
import DAO from '../db/dao';

import ConnectedController from './ConnectedController';
import { newPostValidator, updatePostValidator } from '../validators/post';


class PostController extends ConnectedController {

    constructor(dao: DAO){
        super(dao);
    }

    public async get (req: Request, res: Response, next: Next) {
        
        const statement = 'SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id';
        
        try {
            const result = await this.DAO.all(statement);
            res.json(result);
            next();
        } catch(e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }

    public async getById (req: Request, res: Response, next: Next) {
        
        const { id } = req.params;

        if(typeof id !== 'number'){
            return next(new errs.BadRequestError('ID must be an integer'));
        };

        const statement = 'SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?';
        
        try {

            const result = await this.DAO.get(statement, [req.params.id]);

            if(!result) {
                next(new errs.NotFoundError('Resource not found'));
            } else {
                res.json(result);
                next();
            }
        } catch(e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }

    public async create (req: Request, res: Response, next: Next) {
            
        // Validate request body
        const { error } = newPostValidator(req.body);

        if(error) {
            return next(new errs.BadRequestError(error.details[0].message));
        };

        const statement = 'INSERT INTO posts (user_id, title, content) VALUES (?,?,?)';

        const params = [
            req.body.user_id,
            req.body.title,
            req.body.content
        ];

        try {
            const result = await this.DAO.run(statement, params);
            res.json(result);
        } catch (e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }

    public async update (req: Request, res: Response, next: Next) {

        // Validate ID param is an integer
        const { id } = req.params;

        if(typeof id !== 'number'){
            return next(new errs.BadRequestError('ID must be an integer'));
        };

        // Validate request body
        const { error } = updatePostValidator(req.body);

        if(error) {
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const statement = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';

        const params: [string, string, number] = [
            req.body.title,
            req.body.content,
            req.params.id
        ];

        try {
            const result = await this.DAO.run(statement, params);
            res.json(result);
        } catch(e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }

}

export default PostController;