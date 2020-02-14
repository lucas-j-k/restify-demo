//  Post routes

const PostModel = require('../models/post');


const postRoutes = (server, dbConnection) => {

    // Instantiate a post model with the current connection.
    const model = new PostModel(dbConnection);

    //Get all posts
    server.get('/posts', async (req, res, next) => {
        try {
            const result = await model.getAll();
            res.json(result);
        } catch(e) {
            console.log('ERROR  ', e);
            res.json({error: e.message})
        }
        next();
    })

    //Get one post by id
    server.get('/posts/:id', async (req, res, next) => {
        try {
            const result = await model.getById(req.params.id);
            console.log(result);
            res.json(result);
        } catch(e) {
            res.send({error: e.message})
        }
        next();
    })

    server.post('/posts', async (req, res, next) => {
        try {
            const result = await model.create(req.body);
            res.json({ result });
        } catch (e) {
            res.json({error: e.message});
        }
    })
    
}

module.exports = postRoutes;