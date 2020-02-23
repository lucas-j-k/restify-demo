// Controller for post resource. Holds the methods to interact with posts in the database.

const errs = require('restify-errors');

const { newPostValidator, updatePostValidator } = require('../validators/post');

const PostController = () => ({

        getAll: async (req, res, next) => {
            try {
                const result = await req.DAO.all('SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id');
                res.json(result);
                next();
            } catch(e) {
                const error = new errs.InternalServerError(e.message);
                next(error);
            }
        }, 

        getById: async (req, res, next) => {
            try {
                const result = await req.DAO.get('SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?', [req.params.id]);
                if(!result.row) {
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

        create: async (req, res, next) => {
            // Validate request body
            const { error } = newPostValidator(req.body);
            if(error) return next(new errs.BadRequestError(error.details[0].message));

            const params = [
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

        update: async (req, res, next) => {
            //Validate request body
            const { error } = updatePostValidator(req.body);
            if(error) return next(new errs.BadRequestError(error.details[0].message));

            const params = [
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


module.exports = PostController;