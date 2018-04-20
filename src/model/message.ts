import {User} from './user';

export class Message {
    constructor(private from: User, private content: string, public timestamp: string,
                private id: number, private topic: number, private likers_count: number) {}
}