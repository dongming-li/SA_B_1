'use strict';

import { LoggedInUser } from "./model";

export class UserManager {

  users: LoggedInUser[];
  userNames: string[];

  constructor(){
    /*
    let testUsers: LoggedInUser[] = [
      new LoggedInUser('user1','token1'),
      new LoggedInUser('user2','token2'),
      new LoggedInUser('user3','token3'),
      new LoggedInUser('user4','token3'),
      new LoggedInUser('user5','token3'),
      new LoggedInUser('user6','token3'),
      new LoggedInUser('user7','token3'),
      new LoggedInUser('user8','token3'),
    ];
    */
    //this.users = testUsers;
    this.users = [];
    this.userNames = [];
  }

  // add new user
  addUserWithToken(userName: string, token: string): boolean {
    if(!this.checkUserToken(userName, token)){
      this.users.push(new LoggedInUser(userName, token));
      this.userNames.push(userName);
      return true;
    }
    return false;
  }

  // check if a user with the given token exists
  checkUserToken(userName:string, token: string): boolean {
    for(let i = 0; i < this.users.length; i++){
      if(this.users[i].name == userName && this.users[i].token == token){
        return true;
      }
    }
    return false;
  }
}
