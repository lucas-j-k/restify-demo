/* 
    -----------------------------------
    Comment - Validation functions
    Check the validity of comment properties passed in the request body
    -----------------------------------
 */

import Joi from '@hapi/joi';
import { Comment, CommentQuery } from '../interfaces/db';

export const newCommentValidator = (data: Comment) => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        post_id: Joi.number().required(),
        content: Joi.string().min(5).required(),
    });
    return schema.validate(data);
}

export const updateCommentValidator = (data: Comment) => {
    const schema = Joi.object({
        content: Joi.string().min(5).required(),
        id: Joi.number().integer().required().min(1),
    })
    return schema.validate(data);
}

export const filterValidator = (data: CommentQuery) => {
    const schema = Joi.object({
        user_id: Joi.number().min(1),
        post_id: Joi.number().min(1),
    })
        .or('user_id', 'post_id')
        .nand('user_id', 'post_id');
    return schema.validate(data);
}







