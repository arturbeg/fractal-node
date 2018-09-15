import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';

import { Message } from './model';

export class ChatServer {
    public static readonly PORT:number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || ChatServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            
            socket.on('message', (data) => {
                console.log('[server](data): %s', JSON.stringify(data))

                this.io.sockets.in(data.label).emit('message', data.message)

                // this.io.emit('message', data.message);
            });

            socket.on('messageLike', (data) => {
                console.log(`message ${data.id} was liked in ${data.topic_object.label}`);

                this.io.sockets.in(data.topic_object.label).emit('messageLike', data);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });


            socket.on('joinRoom', (data) => {
                console.log("Joining a room, data: ", data)
                socket.join(data.label);
                // this.io.sockets.in(data.label).emit('joinRoom', data);

                socket.broadcast.in(data.label).emit('joinRoom', data);
            });


            socket.on('leaveRoom', (data) => {
                console.log("Leaving a room, data  ", data)
                socket.leave(data.label);
                // this.io.sockets.in(data.label).emit('leaveRoom', data);

                // socket.broadcast.emit('message', "this is a test");

                socket.broadcast.in(data.label).emit('leaveRoom', data);
            });


        });
    }

    public getApp(): express.Application {
        return this.app;
    }
}