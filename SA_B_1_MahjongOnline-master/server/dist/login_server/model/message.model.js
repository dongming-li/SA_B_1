'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(message) {
        let data = JSON.parse(message);
        this.action = data.action;
    }
}
exports.Message = Message;
//# sourceMappingURL=message.model.js.map