/* 
    -----------------------------------
    Comment - Validation functions
    Check the validity of comment properties passed in the request body
    -----------------------------------
 */

const Joi = require('@hapi/joi');

const newCommentValidator = data => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        post_id: Joi.number().required(),,
        content: Joi.string().min(5).required(),
    });
    return schema.validate(data);
}

const updateCommentValidator = data => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        post_id: Joi.number().required(),
        content: Joi.string().min(5).required(),
    })
}

module.exports = {
    newCommentValidator,
    updateCommentValidator,
}