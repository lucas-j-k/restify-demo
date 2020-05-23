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
    buildServerErrorResponse 
} from '../util/responses';


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
			return buildServerErrorResponse();
		}
	},

	/*
	*	Get Single Post by ID
	*/
	getOne: async (id: number) => {
		try {
			const result = await connectedDao.get(sql.getOne, [id]);
			if(result.length === 0){
				return buildErrorResponse(new errs.NotFoundError('Resource not found'));
			}
			return buildSuccessResponse(result);
		} catch {
			return buildServerErrorResponse();
		}
	},

	/*
	*	Create new Post record
	*/
	create: async (post) => {
		try {
			const result = await connectedDao.run(sql.create, post);
			return buildSuccessResponse();
		} catch {
			return buildServerErrorResponse();
		}
	},

	/*
	*	Update single Post by ID
	*/
	update: async (id: number, updatedPost) => {
		try {
			const existingRecord = await connectedDao.get(sql.checkIfExists);
			if(existingRecord.length === 0) {
				return buildErrorResponse(new errs.NotFoundError('Resource not found'));
			};
			const result = await connectedDao.run(sql.create, updatedPost);
		} catch {
			return buildServerErrorResponse();
		}
	},

	/*
	*	Delete Single Post by ID
	*/
	delete: async (id: number) => {
		
	},

}

export default postService;