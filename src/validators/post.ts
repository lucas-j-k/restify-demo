/* 
    -----------------------------------
    Post - Validation functions
    Check the validity of Post properties passed in the request body
    -----------------------------------
 */

const Joi = require('@hapi/joi');

const newPostValidator = data => {
    const schema = Joi.object({
        user_id: Joi.number().required(),
        title: Joi.string().min(5).max(1024).required(),
        content: Joi.string().min(5).required(),
    });
    return schema.validate(data);
}

const updatePostValidator = data => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(1024).required(),
        content: Joi.string().min(5).required(),
    });
    return schema.validate(data);
}

module.exports = {
    newPostValidator,
    updatePostValidator,
}