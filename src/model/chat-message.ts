import { Message, User } from './';

export class ChatMessage extends Message{
    constructor(sender: User, text: string, user: number, timestamp: string, id: number, topic: string, likers_count: number) {
        super(sender, user, text, timestamp, id, topic, likers_count);
    }
}