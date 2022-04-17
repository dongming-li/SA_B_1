'use strict';

export class Room {
  playingUserNames: string[]; // users playing in this room
  hostUserName: string; // host user name
  roomName: string; // room name
  id: number; // ID of the room

  constructor(roomName, id, hostUserName) {
    this.roomName = roomName
    this.id = id;
    this.hostUserName = hostUserName;
    this.playingUserNames = [hostUserName];
  }

  // add user to the room
  addUser(userName: string){
    if(this.playingUserNames.length < 4){
      this.playingUserNames.push(userName);
      return true;
    }
    return false;
  }

  // change host user of the room
  changeHostUser(newHostUserName: string){
    this.hostUserName = newHostUserName;
  }

}

