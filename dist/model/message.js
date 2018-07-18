"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(sender, user, text, timestamp, id, topic, likers_count) {
        this.sender = sender;
        this.user = user;
        this.text = text;
        this.timestamp = timestamp;
        this.id = id;
        this.topic = topic;
        this.likers_count = likers_count;
    }
    return Message;
}());
exports.Message = Message;
