/*
*
*  Controller for Post resource
*  Define REST methods
*
*/

import errs from 'restify-errors';
import {Request, Response, Next} from 'restify';

import { DbResult } from '../interfaces/db';
import { newPostValidator, updatePostValidator } from '../validators/post';


const PostController = () => ({

        getAll: async (req: Request, res: Response, next: Next): Promise<void> => {
            try {
                const result: DbResult  = await req.DAO.all('SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id');
                console.log('Multiple RESULT :: ', result);
                res.json(result);
                next();
            } catch(e) {
                const error = new errs.InternalServerError(e.message);
                next(error);
            }
        }, 

        getById: async (req: Request, res: Response, next: Next): Promise<void> => {
            try {
                const result: DbResult = await req.DAO.get('SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?', [req.params.id]);
                console.log('Single RESULT :: ', result);
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
        },

        create: async (req: Request, res: Response, next: Next): Promise<void> => {
            
            // Validate request body
            const { error } = newPostValidator(req.body);
            if(error) return next(new errs.BadRequestError(error.details[0].message));

            const params: [number, string, string] = [
                req.body.user_id,
                req.body.title,
                req.body.content
            ];
            try {
                const result = await req.DAO.run('INSERT INTO posts (user_id, title, content) VALUES (?,?,?)', params)
                res.json(result);
            } catch (e) {
                const error = new errs.InternalServerError(e.message);
                next(error);
            }
        },

        update: async (req: Request, res: Response, next: Next): Promise<void> => {
            //Validate request body
            const { error } = updatePostValidator(req.body);
            if(error) return next(new errs.BadRequestError(error.details[0].message));

            const params: [string, string, number] = [
                req.body.title,
                req.body.content,
                req.params.id
            ];
            try {
                const result = await req.DAO.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', params);
                res.json(result);
            } catch(e) {
                const error = new errs.InternalServerError(e.message);
                next(error);
            }
        }
    });


export default PostController;