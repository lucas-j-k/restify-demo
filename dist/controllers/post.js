"use strict";
/*
*
*  Controller for Post resource
*  Define REST methods
*
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restify_errors_1 = __importDefault(require("restify-errors"));
const post_1 = require("../validators/post");
const PostController = () => ({
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield req.DAO.all('SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id');
            res.json(result);
            next();
        }
        catch (e) {
            const error = new restify_errors_1.default.InternalServerError(e.message);
            next(error);
        }
    }),
    getById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield req.DAO.get('SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?', [req.params.id]);
            if (!result.row) {
                next(new restify_errors_1.default.NotFoundError('Resource not found'));
            }
            else {
                res.json(result);
                next();
            }
        }
        catch (e) {
            const error = new restify_errors_1.default.InternalServerError(e.message);
            next(error);
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Validate request body
        const { error } = post_1.newPostValidator(req.body);
        if (error)
            return next(new restify_errors_1.default.BadRequestError(error.details[0].message));
        const params = [
            req.body.user_id,
            req.body.title,
            req.body.content
        ];
        try {
            const result = yield req.DAO.run('INSERT INTO posts (user_id, title, content) VALUES (?,?,?)', params);
            res.json(result);
        }
        catch (e) {
            const error = new restify_errors_1.default.InternalServerError(e.message);
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Validate request body
        const { error } = post_1.updatePostValidator(req.body);
        if (error)
            return next(new restify_errors_1.default.BadRequestError(error.details[0].message));
        const params = [
            req.body.title,
            req.body.content,
            req.params.id
        ];
        try {
            const result = yield req.DAO.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', params);
            res.json(result);
        }
        catch (e) {
            const error = new restify_errors_1.default.InternalServerError(e.message);
            next(error);
        }
    })
});
exports.default = PostController;
