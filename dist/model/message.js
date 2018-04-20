"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(from, content, timestamp, id, topic, likers_count) {
        this.from = from;
        this.content = content;
        this.timestamp = timestamp;
        this.id = id;
        this.topic = topic;
        this.likers_count = likers_count;
    }
    return Message;
}());
exports.Message = Message;
