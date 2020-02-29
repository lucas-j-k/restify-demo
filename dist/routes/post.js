"use strict";
/*
*
*  Controller for post resouce.
*  Takes an instantiated Restify server instance
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_1 = __importDefault(require("../controllers/post"));
const postRoutes = (server) => {
    // Instantiate a post controller with the current connection.
    const controller = post_1.default();
    server.get('/posts', controller.getAll);
    server.get('/posts/:id', controller.getById);
    server.post('/posts', controller.create);
    server.put('/posts/:id', controller.update);
};
exports.default = post_1.default;
