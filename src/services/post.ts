/*
*
*	Post Service
*
*/

import errs from 'restify-errors';

import connectedDao from '../db/dao';
import { 
    buildSuccessResponse, 
    buildErrorResponse, 
    buildServerErrorResponse ,
    errorResponses,
} from '../util/responses';
import { newPostValidator, updatePostValidator } from '../validators/post';
import { idValidator } from '../validators/generic';


const sql = {
	getAll: 'SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id',
	getOne: 'SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?',
	create: 'INSERT INTO posts (user_id, title, content) VALUES (?,?,?)',
	update: 'UPDATE posts SET title = ?, content = ? WHERE id = ?',
	delete: '',
	checkIfExists: 'SELECT id FROM posts WHERE id = ?',
}


const postService = {
	
	/*
	*	Get All Posts
	*/
	getAll: async () => {
		try {
			const result = await connectedDao.all(sql.getAll);
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Get Single Post by ID
	*/
	getOne: async (req) => {
		const { error } = idValidator(req.params);
        if(error) { return errorResponses.badRequest };

		try {
			const result = await connectedDao.get(sql.getOne, [req.params.id]);
			console.log('Result -- ', result);
			if(result.length === 0){
				return errorResponses.notFound;
			};
			connectedDao.close();
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Create new Post record
	*/
	create: async (req) => {
		// Validate request
		const { error } = newPostValidator(req.body);
        if(error) return errorResponses.badRequest;

		try {
	        const postParams = [
	            req.body.user_id,
	            req.body.title,
	            req.body.content
	        ];
			const result = await connectedDao.run(sql.create, postParams);
			return buildSuccessResponse();
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Update single Post by ID
	*/
	update: async (req) => {

        const updatePostBody = {
            title: req.body.title,
            content: req.body.content,
            id: req.params.id,
        }; 

        // Validate request params
        const { error } = updatePostValidator(updatePostBody);
        if(error) {
            return errorResponses.badRequest;
        }

        const updatePostParams = [
            updatePostBody.title,
            updatePostBody.content,
            updatePostBody.id,
        ];

		try {
			const existingRecord =  await connectedDao.get(sql.checkIfExists);
			if(existingRecord.length === 0) {
				return errorResponses.notFound;
			};
			const result = await connectedDao.run(sql.create, updatePostParams);
			return buildSuccessResponse();
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Delete Single Post by ID
	*/
	delete: async (req) => {
        const { error } = idValidator(req.params);
        if(error){
            return errorResponses.badRequest;
        }
        try {
            const existingRecord = await connectedDao.get(sql.checkIfExists);
            if(existingRecord.length === 0) {
                return errorResponses.notFound;
            };
            const result = await connectedDao.run(sql.delete, [req.params.id]);
            return buildSuccessResponse();
        } catch {
        	return errorResponses.internalServer;
        }
	},

}

export default postService;