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
const errs = require('restify-errors');
const { newPostValidator, updatePostValidator } = require('../validators/post');
const PostController = () => ({
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield req.DAO.all('SELECT p.content, p.title, p.id, u.username, u.id AS user_id FROM posts p INNER JOIN users u ON p.user_id = u.id');
            res.json(result);
            next();
        }
        catch (e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }),
    getById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield req.DAO.get('SELECT p.title, p.content, p.id, u.id AS user_id, u.username FROM posts p INNER JOIN users u ON p.user_id = u.id WHERE p.id = ?', [req.params.id]);
            if (!result.row) {
                next(new errs.NotFoundError('Resource not found'));
            }
            else {
                res.json(result);
                next();
            }
        }
        catch (e) {
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Validate request body
        const { error } = newPostValidator(req.body);
        if (error)
            return next(new errs.BadRequestError(error.details[0].message));
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
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //Validate request body
        const { error } = updatePostValidator(req.body);
        if (error)
            return next(new errs.BadRequestError(error.details[0].message));
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
            const error = new errs.InternalServerError(e.message);
            next(error);
        }
    })
});
module.exports = PostController;
