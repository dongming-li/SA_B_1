'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const mysql = require('mysql');
const q = require('q'); // promise generator
class DbManager {
    constructor() {
        // mysql pooling to deal with connection
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Pa123sS!',
            database: 'mahjongdb'
        });
    }
    // get registered users from database
    getRegisteredUsers() {
        return this.query('SELECT * FROM registered_users');
    }
    // register user to database
    registerUser(name, password) {
        return this.query("INSERT INTO registered_users (name,password) VALUES ('" + name + "','" + password + "');");
    }
    // check if the user is registered
    checkRegisteredUser(name, password) {
        return this.query("SELECT EXISTS(SELECT 1 FROM registered_users WHERE name ='" + name + "' AND password='" + password + "');").then((result) => {
            // transform the result to true or false
            return result[0][Object.keys(result[0])[0]] == 1;
        });
    }
    // run mysql query and return promise
    query(sql) {
        var deferred = q.defer();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                deferred.reject("cannot connect to database");
            }
            connection.query(sql, (err, result) => {
                if (err) {
                    deferred.reject("invalid SQL statement");
                }
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    }
}
exports.DbManager = DbManager;
var dbManager = new DbManager();
// Manages users, works for login/signup
class UserManager {
    constructor() {
        this.loggedInUsers = [];
        this.forbiddenNameRegex = /\s/;
        this.forbiddenPassRegex = /\s/;
    }
    //signup new user
    signupUser(name, password) {
        var deferred = q.defer();
        // check invalid names
        if (name == '') {
            deferred.resolve({
                action: 'signup',
                status: 'error',
                reason: 'empty username'
            });
        }
        else if (password == '') {
            deferred.resolve({
                action: 'signup',
                status: 'error',
                reason: 'empty password'
            });
        }
        else if (this.forbiddenNameRegex.test(name)) {
            deferred.resolve({
                action: 'signup',
                status: 'error',
                reason: 'this username cannot be used'
            });
        }
        else if (this.forbiddenPassRegex.test(password)) {
            deferred.resolve({
                action: 'signup',
                status: 'error',
                reason: 'this password cannot be used'
            });
        }
        // register user to database
        dbManager.registerUser(name, password).then((result) => {
            deferred.resolve({
                action: 'signup',
                status: 'ok'
            });
        }).catch((err) => {
            deferred.resolve({
                action: 'signup',
                status: 'error',
                reason: 'user already registered'
            });
        });
        return deferred.promise;
    }
    // login user
    loginUser(name, password) {
        var deferred = q.defer();
        // check if the user already loggin in
        if (this.checkLoggedInUser(name)) {
            deferred.resolve({
                action: 'login',
                status: 'error',
                reason: 'user already logged in'
            });
        }
        // check if the user is registered
        dbManager.checkRegisteredUser(name, password).then((result) => {
            if (result) {
                let token = this.makeToken();
                let user = new model_1.LoggedInUser(token, name);
                this.loggedInUsers.push(user);
                deferred.resolve({
                    action: 'login',
                    status: 'ok',
                    user_name: name,
                    token: token
                });
            }
            else {
                deferred.resolve({
                    action: 'login',
                    status: 'error',
                    reason: 'wrong username/password'
                });
            }
        }).catch((err) => {
            deferred.resolve({
                action: 'login',
                status: 'error',
                reason: 'unknown error'
            });
        });
        return deferred.promise;
    }
    // check if a given user already logged in
    checkLoggedInUser(name) {
        for (let i = 0; i < this.loggedInUsers.length; i++) {
            if (this.loggedInUsers[i].name == name) {
                return true;
            }
        }
        return false;
    }
    // make random id
    makeToken() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.UserManager = UserManager;
//# sourceMappingURL=db-management.js.map