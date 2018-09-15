"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express = require("express");
var socketIo = require("socket.io");
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }
    ChatServer.prototype.createApp = function () {
        this.app = express();
    };
    ChatServer.prototype.createServer = function () {
        this.server = http_1.createServer(this.app);
    };
    ChatServer.prototype.config = function () {
        this.port = process.env.PORT || ChatServer.PORT;
    };
    ChatServer.prototype.sockets = function () {
        this.io = socketIo(this.server);
    };
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port, function () {
            console.log('Running server on port %s', _this.port);
        });
        this.io.on('connect', function (socket) {
            console.log('Connected client on port %s.', _this.port);
            socket.on('message', function (data) {
                console.log('[server](data): %s', JSON.stringify(data));
                _this.io.sockets.in(data.label).emit('message', data.message);
                // this.io.emit('message', data.message);
            });
            socket.on('messageLike', function (data) {
                console.log("message " + data.id + " was liked in " + data.topic_object.label);
                _this.io.sockets.in(data.topic_object.label).emit('messageLike', data);
            });
            socket.on('disconnect', function () {
                console.log('Client disconnected');
            });
            socket.on('joinRoom', function (data) {
                console.log("Joining a room, data: ", data);
                socket.join(data.label);
                // Report a user has joined a chatroom
            });
            socket.on('leaveRoom', function (data) {
                console.log("Leaving a room, data  ", data);
                socket.leave(data.label);
                // Report a user has left a chatroom  
            });
        });
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    ChatServer.PORT = 8080;
    return ChatServer;
}());
exports.ChatServer = ChatServer;
