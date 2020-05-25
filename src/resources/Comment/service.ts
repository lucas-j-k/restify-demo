/*
*
*	COMMENT RESOURCE - service
*
*/

import connectedDao from '../../db/dao';
import { buildSuccessResponse, errorResponses } from '../../util/responses';
import validators from './validators';

const sql = {
	getAll: conditionColumn => `SELECT c.content, c.post_id, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE ${conditionColumn} = ?`,
	getOne: 'SELECT c.content, c.id, c.post_id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE c.id = ?',
	create: 'INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)',
	update: 'UPDATE comments SET content = ? WHERE id = ?',
	delete: 'DELETE from comments WHERE id = ?',
	checkIfExists: 'SELECT id FROM comments WHERE id = ?',
};



const commentService = {
	/*
	*	Get All Comments associated with a user_id or post_id
	*/
	getAll: async (req) => {
		const { error } = validators.getAll(req.query);
		if(error) {
			return errorResponses.badRequest;
		};

		const { user_id, post_id } = req.query;
        let conditionColumn, conditionValue;

        if(user_id){
            conditionColumn = 'user_id';
            conditionValue = user_id;
        }
        if(post_id){
            conditionColumn = 'post_id';
            conditionValue = post_id;
        }

		const statement = sql.getAll(conditionColumn);

		try {
			const result = await connectedDao.all(statement, [conditionValue]);
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}


	},

	/*
	*	Get single comment by ID
	*/
	getOne: async (req) => {
		const { error } = validators.getOne(req.query);
		if(error) {
			return errorResponses.badRequest;
		};
		try {
			const result = await connectedDao.all(sql.getOne, [req.params.id]);
			if(result.length === 0){
				return errorResponses.notFound;
			};
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Create new comment record	
	*/
	create: async (req) => {
		const { error } = validators.create(req.body);
		if(error) {
			return errorResponses.badRequest;
		};

		const params = [
            req.body.user_id,
            req.body.post_id,
            req.body.content,
        ];

		try {
			const result = await connectedDao.run(sql.create, params);
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Update existing comment record by ID	
	*/
	update: async (req) => {
		const updateData = {
            content: req.body.content,
            id: req.params.id,
        };
		
		const { error } = validators.update(updateData);
		if(error) {
			return errorResponses.badRequest;
		};

		const updateParams = [req.body.content, req.params.id];
		try {
			const existingRecord = await connectedDao.get(sql.checkIfExists);
			if(existingRecord.length === 0) {
				return errorResponses.notFound;
			}
			const result = await connectedDao.run(sql.update, updateParams);
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}
	},

	/*
	*	Delete single comment by ID	
	*/
	delete: async (req) => {
		const { error } = validators.delete(req);
		if(error) {
			return errorResponses.badRequest;
		};

		try {
			const existingRecord = await connectedDao.get(sql.checkIfExists);
			if(existingRecord.length === 0) {
				return errorResponses.notFound;
			}
			const result = await connectedDao.get(sql.delete, [req.params.id]);
			return buildSuccessResponse(result);
		} catch {
			return errorResponses.internalServer;
		}

	}

}

export default commentService;