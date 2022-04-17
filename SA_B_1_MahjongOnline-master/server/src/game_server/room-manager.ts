'use strict';

import { Room } from "./model";
import { LoggedInUser } from "./model";

export class RoomManager {

  rooms: Room[];
  playingUserNames: string[];
  currId: number;

  constructor(){
    this.rooms = [];
    this.playingUserNames = [];
    this.currId = 0;
  }

  // make new room
  makeRoom(roomName: string, hostName: string): boolean {
    // check if the user is playing
    if(this.checkUserPlaying(hostName)){
      return false;
    }
    // check if room already exists
    if(this.checkRoom(roomName)){
      return false;
    }

    let newRoom = new Room(roomName, this.currId, hostName);
    this.rooms.push(newRoom);
    this.playingUserNames.push(hostName);
    this.currId++;

    return true;
  }

  joinRoom(roomId: number, userName: string): boolean{
    // check if the user is already
    if(this.checkUserPlaying(userName)){
      return false;
    }
    // check if room already exists
    if(!this.checkRoomWithId(roomId)){
      return false;
    }

    this.rooms[this.getRoomIdxWithId(roomId)].addUser(userName);
    return true;
  }

  // delete room
  // should be called only by server
  delRoom(roomName: string): boolean {
    let idx = this.getRoomIdx(roomName);
    if(idx < 0){
      return false;
    }
    this.rooms.splice(idx, 1);
    return true;
  }

  // check if the room with the given name already exists
  checkRoom(roomName: string): boolean {
    for(let i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].roomName == roomName){
        return true;
      } 
    }
    return false;
  }

  // check if the room with the given id already exists
  checkRoomWithId(roomId: number): boolean {
    for(let i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].id == roomId){
        return true;
      } 
    }
    return false;
  }

  // return index of room
  // return -1 if there is no room with the given name
  private getRoomIdx(roomName: string): number {
    for(let i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].roomName == roomName){
        return i;
      } 
    }
    return -1;
  }

  // return index of room
  // return -1 if there is no room with the given name
  private getRoomIdxWithId(roomId: number): number {
    for(let i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].id == roomId){
        return i;
      } 
    }
    return -1;
  }

  checkUserPlaying(name: string): boolean{
    for(let i = 0; i < this.playingUserNames.length; i++){
      if(this.playingUserNames[i] == name){
        return true;
      }
    }
    return false;
  }

  getRooms(): Room[]{
    return this.rooms;
  }

  getRoomWithName(roomName: string): Room {
    for(let i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].roomName == roomName){
        return this.rooms[i];
      } 
    }
    return null;
  }
  getRoomWithId(roomId: number): Room {
    for(let i = 0; i < this.rooms.length; i++){
      if(this.rooms[i].id == roomId){
        return this.rooms[i];
      } 
    }
    return null;
  }
}
