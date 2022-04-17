'use strict';

export class User {
  id: string;
  name: string;

  constructor(id:string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class LoggedInUser {
  token: string;
  name: string;

  constructor(token:string, name: string) {
    this.token = token;
    this.name = name;
  }
}

export class RegisteredUser {
  name: string;
  password: string;

  constructor(name:string, password: string) {
    this.name = name;
    this.password = password;
  }
}