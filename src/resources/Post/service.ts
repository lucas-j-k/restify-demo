/*
*
*	POST RESOURCE - service
*
*/
import { Request } from 'restify';

import connectedDao from '../../db/dao';
import { buildSuccessResponse, errorResponses } from '../../util/responses';
import validators from './validators'


const sql = {
	getAll: 'SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id',
	getOne: 'SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?',
	create: 'INSERT INTO posts (user_id, title, content) VALUES (?,?,?)',
	update: 'UPDATE posts SET title = ?, content = ? WHERE id = ?',
	delete: 'DELETE from posts WHERE id = ?',
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
	getOne: async (req: Request) => {
		const { error } = validators.getOne(req.params);
        if(error) { return errorResponses.badRequest };

		try {
			const result = await connectedDao.get(sql.getOne, [req.params.id]);
			if(result.length === 0){
				return errorResponses.notFound;
			};
			return buildSuccessResponse(result);
		} catch(e) {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Create new Post record
	*/
	create: async (req: Request) => {

		// Validate request
		const { error } = validators.create(req.body);
        if(error) {
        	return errorResponses.badRequest;
        }

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
	update: async (req: Request) => {

        const updatePostBody = {
            title: req.body.title,
            content: req.body.content,
            id: req.params.id,
        }; 

        // Validate request params
        const { error } = validators.update(updatePostBody);
        if(error) {
            return errorResponses.badRequest;
        }

        const updatePostParams = [
            updatePostBody.title,
            updatePostBody.content,
            updatePostBody.id,
        ];

		try {
			const existingRecord =  await connectedDao.get(sql.checkIfExists, [req.params.id]);
			if(existingRecord.length === 0) {
				return errorResponses.notFound;
			};
			const result = await connectedDao.run(sql.update, updatePostParams);
			return buildSuccessResponse();
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Delete Single Post by ID
	*/
	delete: async (req: Request) => {
        const { error } = validators.delete(req.params);
        if(error){
            return errorResponses.badRequest;
        }
        try {
            const existingRecord = await connectedDao.get(sql.checkIfExists, [req.params.id]);
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