'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
class UserManager {
    constructor() {
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
    addUserWithToken(userName, token) {
        if (!this.checkUserToken(userName, token)) {
            this.users.push(new model_1.LoggedInUser(userName, token));
            this.userNames.push(userName);
            return true;
        }
        return false;
    }
    // check if a user with the given token exists
    checkUserToken(userName, token) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name == userName && this.users[i].token == token) {
                return true;
            }
        }
        return false;
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=user-manager.js.map