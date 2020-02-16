//  Post routes
//  server: Instantiated Restify server
//  dbConnection: Open connection to SQLite

const errs = require('restify-errors');

const PostController = require('../controllers/post');


const postRoutes = (server, dbConnection) => {

    // Instantiate a post model with the current connection.
    const controller = new PostController(dbConnection);

    //Get all posts
    server.get('/posts', async (req, res, next) => {
        try {
            const result = await controller.getAll();
            res.json(result);
        } catch(e) {
            const error = new errs.InternalServerError('Internal Server Error');
            next(error);
        }
        next();
    })

    //Get one post by id
    server.get('/posts/:id', async (req, res, next) => {
        try {
            const result = await controller.getById(req.params.id);
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
    })

    server.post('/posts', async (req, res, next) => {
        try {
            const result = await controller.create(req.body);
            res.json(result);
        } catch (e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    })

}

module.exports = postRoutes;