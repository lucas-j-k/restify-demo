/*
*
*	COMMENT RESOURCE - validators
*
*/

import Joi from '@hapi/joi';
import { Post } from '../../interfaces/db';


// Validate a request based on an ID param
const idValidator = (data: object) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });
    return schema.validate(data);
}

const validators = {

	getAll: (data: object) => {
		const schema = Joi.object({
	        user_id: Joi.number().min(1),
	        post_id: Joi.number().min(1),
	    })
        .or('user_id', 'post_id')
        .nand('user_id', 'post_id');
	    return schema.validate(data);
	},

	getOne: idValidator,

	create: (data: object) => {
		const schema = Joi.object({
	        user_id: Joi.number().required(),
	        post_id: Joi.number().required(),
	        content: Joi.string().min(5).required(),
	    });
	    return schema.validate(data);
	},

	update: (data: object) => {
		const schema = Joi.object({
	        content: Joi.string().min(5).required(),
	        id: Joi.number().integer().required().min(1),
	    })
	    return schema.validate(data);
	},

	delete: idValidator,

}

export default validators;