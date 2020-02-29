"use strict";
/*
*
*  Controller for comment resouce.
*  Takes an instantiated Restify server instance
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = __importDefault(require("../controllers/comment"));
const commentRoutes = (server) => {
    // Instantiate a comment controller with the current connection.
    const controller = comment_1.default();
    server.get('/comments', controller.get);
    server.get('/comments/:id', controller.getById);
    server.post('/comments', controller.create);
    server.put('/comments/:id', controller.update);
};
exports.default = commentRoutes;
