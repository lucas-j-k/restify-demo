/*
*
*	POST RESOURCE - validators
*
*/

import Joi from '@hapi/joi';

// Validate a request based on an ID param
const idValidator = (data: object) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });
    return schema.validate(data);
}

const validators = {

	getOne: idValidator,
	
	create: (data: object) => {
		const schema = Joi.object({
	        user_id: Joi.number().required(),
	        title: Joi.string().min(5).max(1024).required(),
	        content: Joi.string().min(5).required(),
	    });
	    return schema.validate(data);
	},

	update: (data: object) => {
		const schema = Joi.object({
	        title: Joi.string().min(5).max(1024).required(),
	        content: Joi.string().min(5).required(),
	        id: Joi.number().integer().min(1).required(),
	    });
	    return schema.validate(data);
	},

	delete: idValidator,

};

export default validators;