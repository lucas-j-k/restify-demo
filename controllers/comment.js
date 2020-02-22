/*
*
*  Controller for Comment resource
*  Define REST methods
*
*/


const errs = require('restify-errors');


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

        const statement = `SELECT * FROM comments WHERE ${conditionColumn} = ?`;

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
            const result = await req.DAO.get('SELECT * FROM comments WHERE id = ?', [req.params.id]);
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
    }
})

module.exports = CommentController;