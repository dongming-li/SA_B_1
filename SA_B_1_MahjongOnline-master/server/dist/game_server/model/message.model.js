'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(data) {
        this.action = data.action;
        this.content = data.content;
    }
}
exports.Message = Message;
class RecievedMessage {
    constructor(message) {
        let data = JSON.parse(message);
        this.action = data.action;
        this.content = data.content;
    }
}
exports.RecievedMessage = RecievedMessage;
//# sourceMappingURL=message.model.js.map