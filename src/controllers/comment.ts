/*
*
* Comment Controller - define Resource methods
*
*/

import {Request, Response, Next} from 'restify';
import errs from 'restify-errors';
import DAO from '../db/dao';

import ConnectedController from './ConnectedController';
import { newCommentValidator, updateCommentValidator, filterValidator } from '../validators/comment';
import { idValidator } from '../validators/generic';

class CommentController extends ConnectedController {

    constructor(dao: DAO){
        super(dao);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async get(req: Request, res: Response, next: Next){
        
        const { error } = filterValidator(req.query);

        if(error){
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const { user_id, post_id } = req.query;

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
                
        const { error } = idValidator(req.params);

        if(error){
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const { id } = req.params;

        const statement = 'SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE c.id = ?';
        
        try {

            const result = await this.DAO.get(statement, [id]);

            if(result.data.length === 0) {
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

        const requestParams = {
            content: req.body.content,
            id: req.params.id,
        }

        // Validate id and content
        const { error } = updateCommentValidator(requestParams);

        if(error) {
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const params = Object.values(requestParams);
        
        const statement = 'UPDATE comments SET content = ? WHERE id = ?';
        
        try {
            const existingRecord = await this.DAO.get('SELECT * FROM comments WHERE id = ?', req.params.id);
            if(existingRecord.data.length === 0) {
                return next(new errs.NotFoundError('Resource not found'));
            }
            const result = await this.DAO.run(statement, params);
            res.json(result);
        } catch(e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: Next) {

        const { error } = idValidator(req.params);

        if(error){
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const { id } = req.params;

        const statement = 'DELETE from comments WHERE id = ?';
        

        try {
            const existingRecord = await this.DAO.get('SELECT * FROM comments WHERE id = ?', id);
            if(existingRecord.data.length === 0) {
                return next(new errs.NotFoundError('Resource not found'));
            }
            const result = await this.DAO.run(statement, [id]);
            res.json(result);
        } catch (e) {
            next(new errs.InternalError(e.message));
        }

    }


}

export default CommentController;
