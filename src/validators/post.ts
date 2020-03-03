/* 
    -----------------------------------
    Post - Validation functions
    Check the validity of Post properties passed in the request body
    -----------------------------------
 */

import Joi from '@hapi/joi';

import { Post } from '../interfaces/db';

export const newPostValidator = (data: Post) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        title: Joi.string().min(5).max(1024).required(),
        content: Joi.string().min(5).required(),
    });
    return schema.validate(data);
}

export const updatePostValidator = (data: Post) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(1024).required(),
        content: Joi.string().min(5).required(),
        id: Joi.number().integer().min(1).required(),
    });
    return schema.validate(data);
}
