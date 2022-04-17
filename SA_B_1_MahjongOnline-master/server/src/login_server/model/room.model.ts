'use strict';

import { LoggedInUser } from './user.model';

export class Room {
  users: LoggedInUser[];
  hostUser: LoggedInUser;
  roomName: string;

  constructor(hostUser, roomName) {
    this.users = [];
    this.hostUser = hostUser;
    this.users.push(hostUser);
  }

  // add user to the room
  addUser(newUser: LoggedInUser){
    if(this.users.length < 4){
      this.users.push(newUser);
    }
  }

  // change host user of the room
  changeHostUser(newHostUser: LoggedInUser){
    this.hostUser = newHostUser;
  }

}

