"use strict";
/*
    -----------------------------------
    Comment - Validation functions
    Check the validity of comment properties passed in the request body
    -----------------------------------
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.newCommentValidator = data => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.number().required(),
        post_id: joi_1.default.number().required(),
        content: joi_1.default.string().min(5).required(),
    });
    return schema.validate(data);
};
exports.updateCommentValidator = data => {
    const schema = joi_1.default.object({
        content: joi_1.default.string().min(5).required(),
    });
    return schema.validate(data);
};
