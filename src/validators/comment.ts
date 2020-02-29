/* 
    -----------------------------------
    Comment - Validation functions
    Check the validity of comment properties passed in the request body
    -----------------------------------
 */

import Joi from '@hapi/joi';

export const newCommentValidator = data => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        post_id: Joi.number().required(),
        content: Joi.string().min(5).required(),
    });
    return schema.validate(data);
}

export const updateCommentValidator = data => {
    const schema = Joi.object({
        content: Joi.string().min(5).required(),
    })
    return schema.validate(data);
}


