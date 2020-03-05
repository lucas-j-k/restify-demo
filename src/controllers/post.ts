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
import { idValidator } from '../validators/generic';


class PostController extends ConnectedController {

    constructor(dao: DAO){
        super(dao);
        this.get = this.get.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
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
        
        const { error } = idValidator(req.params);

        if(error){
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const { id } = req.params;

        const statement = 'SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?';
        
        try {

            const result = await this.DAO.get(statement, [req.params.id]);

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

    public async create (req: Request, res: Response, next: Next) {
            
        // Validate request body
        const { error } = newPostValidator(req.body);

        if(error) return next(new errs.BadRequestError(error.details[0].message));
        

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

        const requestParams = {
            title: req.body.title,
            content: req.body.content,
            id: req.params.id,
        };

        // Validate request params
        const { error } = updatePostValidator(requestParams);

        if(error) {
            return next(new errs.BadRequestError(error.details[0].message));
        }

        const statement = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';

        const params = Object.values(requestParams);

        try {
            const existingRecord = await this.DAO.get('SELECT id FROM posts WHERE id = ?', req.params.id);
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

        const statement = 'DELETE from posts WHERE id = ?';

        try {
            const existingRecord = await this.DAO.get('SELECT id FROM posts WHERE id = ?', id);
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

export default PostController;