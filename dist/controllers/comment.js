"use strict";
/*
*
*  Controller for Comment resource
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
const comment_1 = require("../validators/comment");
const CommentController = () => ({
    get: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Pull filter values from the query params
        const { user_id, post_id } = req.query;
        //  If no filters are present, reject request
        if (!user_id && !post_id) {
            return next(new restify_errors_1.default.BadRequestError('Missing parameters'));
        }
        //  If user and post filters are both specified, reject the request
        if (user_id && post_id) {
            return next(new restify_errors_1.default.BadRequestError('Cannot filter on both user and post'));
        }
        let conditionColumn, conditionValue;
        if (user_id) {
            conditionColumn = 'user_id';
            conditionValue = user_id;
        }
        if (post_id) {
            conditionColumn = 'post_id';
            conditionValue = post_id;
        }
        const statement = `SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE ${conditionColumn} = ?`;
        try {
            const result = yield req.DAO.all(statement, [conditionValue]);
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
            const result = yield req.DAO.get('SELECT c.content, c.id, c.user_id, u.username FROM comments c INNER JOIN users u ON c.user_id = u.id WHERE c.id = ?', [req.params.id]);
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
        const { error } = comment_1.newCommentValidator(req.body);
        if (error)
            return next(new restify_errors_1.default.BadRequestError(error.details[0].message));
        const params = [
            req.body.user_id,
            req.body.post_id,
            req.body.content,
        ];
        try {
            const result = yield req.DAO.run('INSERT INTO comments (user_id, post_id, content) VALUES (?,?,?)', params);
            res.json(result);
        }
        catch (e) {
            const error = new restify_errors_1.default.InternalServerError(e.message);
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Validate request body
        const { error } = comment_1.updateCommentValidator(req.body);
        if (error)
            return next(new restify_errors_1.default.BadRequestError(error.details[0].message));
        const params = [
            req.body.content,
            req.params.id
        ];
        try {
            const result = yield req.DAO.run('UPDATE comments SET content = ? WHERE id = ?', params);
            res.json(result);
        }
        catch (e) {
            const error = new restify_errors_1.default.InternalServerError(e.message);
            next(error);
        }
    })
});
exports.default = CommentController;
