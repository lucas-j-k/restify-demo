/*
*
*  Controller for Comment resource
*  Define REST methods
*
*/


const errs = require('restify-errors');
const { newCommentValidator, updateCommentValidator } = require('../validators/comment');


const CommentController = () => ({

    get: async (req, res, next) => {

        // Pull filter values from the query params
        const { user_id, post_id } = req.query;
        
        //  If no filters are present, reject request
        if(!user_id && !post_id){
            return next(new errs.BadRequestError('Missing parameters'));
        }

        //  If user and post filters are both specified, reject the request
        if(user_id && post_id){
            return next(new errs.BadRequestError('Cannot filter on both user and post'))
        }

        let conditionColumn, conditionValue;

        if(user_id) {
            conditionColumn = 'user_id';
            conditionValue = user_id;
        }
        if(post_id) {
            conditionColumn = 'post_id';
            conditionValue = post_id;
        }

        const statement = `SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE ${conditionColumn} = ?`;

        try {
            const result = await req.DAO.all(statement, [conditionValue]);
            res.json(result);
            next();
        } catch(e){
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    },

    getById: async (req, res, next) => {
        try {
            const result = await req.DAO.get('SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE c.id = ?', [req.params.id]);
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
        const { error } = newCommentValidator(req.body);
        if(error) return next(new errs.BadRequestError(error.details[0].message))

        const params = [
            req.body.user_id,
            req.body.post_id,
            req.body.content,
        ];

        try {
            const result = await req.DAO.run('INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)', params);
            res.json(result);
        } catch (e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    },

    update: async (req, res, next) => {
        //Validate request body
        const { error } = updateCommentValidator(req.body);
        if(error) return next(new errs.BadRequestError(error.details[0].message));

        const params = [
            req.body.content,
            req.params.id
        ];
        try {
            const result = await req.DAO.run('UPDATE comments SET content = ? WHERE id = ?', params);
            res.json(result);
        } catch(e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }
})

module.exports = CommentController;