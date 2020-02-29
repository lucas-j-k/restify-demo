"use strict";
/*
    -----------------------------------
    Post - Validation functions
    Check the validity of Post properties passed in the request body
    -----------------------------------
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.newPostValidator = data => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.number().required(),
        title: joi_1.default.string().min(5).max(1024).required(),
        content: joi_1.default.string().min(5).required(),
    });
    return schema.validate(data);
};
exports.updatePostValidator = data => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().min(5).max(1024).required(),
        content: joi_1.default.string().min(5).required(),
    });
    return schema.validate(data);
};
