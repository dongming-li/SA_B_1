'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(hostUser, roomName) {
        this.users = [];
        this.hostUser = hostUser;
        this.users.push(hostUser);
    }
    // add user to the room
    addUser(newUser) {
        if (this.users.length < 4) {
            this.users.push(newUser);
        }
    }
    // change host user of the room
    changeHostUser(newHostUser) {
        this.hostUser = newHostUser;
    }
}
exports.Room = Room;
//# sourceMappingURL=room.model.js.map