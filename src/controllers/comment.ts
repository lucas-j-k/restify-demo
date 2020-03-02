/*
*
* Comment Controller - define Resource methods
*
*/

import {Request, Response, Next} from 'restify';
import errs from 'restify-errors';
import DAO from '../db/dao';

import ConnectedController from './ConnectedController';
import { newCommentValidator, updateCommentValidator } from '../validators/comment';



class CommentController extends ConnectedController {

    constructor(dao: DAO){
        super(dao);
    }

    public async get(req: Request, res: Response, next: Next){
        
        // Verify we have at least one filter in the request query string
        const { user_id, post_id} = req.query;

        if(!user_id && !post_id) {
            return next(new errs.BadRequestError('Request URL must contain a filter parameter'));
        }
        
        // Can't filter by both user and post
        if(user_id && post_id){
            return next(new errs.BadRequestError('Cannot filter on both post and user'));
        }

        let conditionColumn: string|undefined, conditionValue: string|undefined;

        if(user_id){
            conditionColumn = 'user_id';
            conditionValue = user_id;
        }

        if(post_id){
            conditionColumn = 'post_id';
            conditionValue = post_id;
        }

        const statement = `SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE ${conditionColumn} = ?`;

        try {
            const result = await this.DAO.all(statement, [conditionValue]);
            res.json(result);
            next();
        } catch(e){
            const error = new errs.InternalServerError(e.message);
            next(error);
        }

    }

    public async getById(req: Request, res: Response, next: Next){
        
        const { id } = req.params;

        if(typeof id !== 'number'){
            return next(new errs.BadRequestError('ID must be an integer'));
        };

        const statement = 'SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE c.id = ?';
        
        try {

            const result = await this.DAO.get(statement, [id]);

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

    public async create(req: Request, res: Response, next: Next) {

        // Validate request body
        const { error } = newCommentValidator(req.body);
        if(error) return next(new errs.BadRequestError(error.details[0].message));
        
        const statement = 'INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)';

        const params = [
            req.body.user_id,
            req.body.post_id,
            req.body.content,
        ];

        try {
            const result = await this.DAO.run(statement, params);
            res.json(result);
        } catch (e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }


    public async update(req: Request, res: Response, next: Next) {

        // Validate ID param is an integer
        const { id } = req.params;

        if(typeof id !== 'number'){
            return next(new errs.BadRequestError('ID must be an integer'));
        };

        // Validate request body
        const { error } = updateCommentValidator(req.body);
        if(error) {
            return next(new errs.BadRequestError(error.details[0].message));
        }
        
        const statement = 'UPDATE comments SET content = ? WHERE id = ?';

        const params = [
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

export default CommentController;
