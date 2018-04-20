import { Message, User } from './';

export class ChatMessage extends Message{
    constructor(from: User, content: string, timestamp: string, id: number, topic: number, likers_count: number) {
        super(from, content, timestamp, id, topic, likers_count);
    }
}