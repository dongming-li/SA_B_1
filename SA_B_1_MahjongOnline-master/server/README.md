# Mahjong Online Server

WebSocket server summary

## Dependency
install Node.js and MySQL

## Servers
1. login server (aka. ls) - takes care of login/signup
2. game server (aka. gs) - takes care of all game logic

## Before running server

### Setup MySQL
1. Create a database.
2. Create a user and grant all permission to the database.
3. Update the database info in index.ts

## How to run server
```shell
npm install # only one time
npm run build
npm start
```

## For development
```shell
npm install # only one time
npm run watch-tsc # This command compiles code
# open another terminal
npm run watch-start # This command runs the compiled code
```

## Login Server API
- signup (name, password)
	-> status: ok -> 'signup' is fired on the client
- login (name, password)
	-> status: ok -> 'login' is fired on client

## Login Server Use Cases
```javascript
// make a new websocket
var socket = new WebSocket('ws://localhost:3002');

// this is the function that will be excuted assynchronously
// when client recieves something
socket.onmessage = function (message) {
  console.log(message.data);
};

// send data to server
socket.send(JSON.stringify({ 
	action: 'signup', 
	name: 'afa', 
	password: 'baka' 
}));
socket.send(JSON.stringify({ 
	action: 'login', 
	name: 'afa', 
	password: 'baka' 
}));
```

## Game Server API
- make room (user_name, token, room_name)
	-> status: ok -> 'rooms updated' is fired on all clients
- join room (user_name, token, room_name)
	-> status: ok -> 'rooms updated' is fired on all clients
- get rooms (user_name, token)
	-> status: ok -> 'get rooms' is fired on the client

## Game Server Use Cases
```javascript
var socket = new WebSocket('ws://localhost:3001');

socket.onmessage = function (message) {
  console.log(message.data);
};

socket.send(JSON.stringify({ 
	action: 'make room', 
	user_name: 'afa', 
	token: 'DONZ46treqLmxaVKRrZy',
	room_name: 'room fuck'
}));

socket.send(JSON.stringify({ 
	action: 'get rooms', 
	user_name: 'afa', 
	token: 'DONZ46treqLmxaVKRrZy'
}));
```