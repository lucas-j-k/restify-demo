/* 
    -----------------------------------
    Generic Validation functions
    -----------------------------------
 */

import Joi from '@hapi/joi';

export const idValidator = (id: number) => {
    const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
    });
    return schema.validate(id);
}