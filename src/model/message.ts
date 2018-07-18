import {User} from './user';

export class Message {
    constructor(private sender: User, private user: number, private text: string, public timestamp: string,
                private id: number, public topic: string, private likers_count: number) {}
}

