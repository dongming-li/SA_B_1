'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
exports.User = User;
class LoggedInUser {
    constructor(token, name) {
        this.token = token;
        this.name = name;
    }
}
exports.LoggedInUser = LoggedInUser;
class RegisteredUser {
    constructor(name, password) {
        this.name = name;
        this.password = password;
    }
}
exports.RegisteredUser = RegisteredUser;
//# sourceMappingURL=user.model.js.map