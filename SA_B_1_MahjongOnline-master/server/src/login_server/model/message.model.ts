'use strict';

import {User} from './user.model';

export class Message {
    from: User;
    action: string;
    content: string;

    constructor(message: string) {
      let data = JSON.parse(message);
      this.action = data.action;
    }
}
