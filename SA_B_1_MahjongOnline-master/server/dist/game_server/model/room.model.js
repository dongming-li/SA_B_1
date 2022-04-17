'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class Room {
    constructor(roomName, id, hostUserName) {
        this.roomName = roomName;
        this.id = id;
        this.hostUserName = hostUserName;
        this.playingUserNames = [hostUserName];
    }
    // add user to the room
    addUser(userName) {
        if (this.playingUserNames.length < 4) {
            this.playingUserNames.push(userName);
            return true;
        }
        return false;
    }
    // change host user of the room
    changeHostUser(newHostUserName) {
        this.hostUserName = newHostUserName;
    }
}
exports.Room = Room;
//# sourceMappingURL=room.model.js.map