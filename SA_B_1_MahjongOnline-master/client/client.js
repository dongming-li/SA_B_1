var socket_gs = null;

function startGameClient(){
	var socket_gs_ok = false;

	try{ // try to connect to the game server
		socket_gs = new WebSocket('ws://localhost:3001');
		socket_gs_ok = true;
		console.log('Connected to game server (gs)');
	} catch(e){
		console.log('Game server (gs) is down');
	}

	if(socket_gs_ok){
		socket_gs.onmessage = function (message) {
			var data = JSON.parse(message.data);
			if(data.status == 'ok'){
				if(data.action == 'rooms updated' || data.action == 'get rooms'){		
					
					console.log('room list updated: ', data.rooms);
					updateRooms(data.rooms);
				}
				else if(data.action == 'users updated' || data.action == 'get users'){
					console.log('user list updated: ', data.user_names);
					updateUsers(data.user_names);
				} 
				
			} else {
				console.log('socket_gs: error in action \''+data.action+'\': '+data.reason);
			}
		};
		setTimeout(getRooms, 500);
		setTimeout(getUsers, 500);
	}
}

// callback function to make new room
function makeRoom_cb(){
	makeRoom(document.newRoom.newRoomName.value);
	onLobby = false;
	onGame = true;
	hideDiv("mahjong-online-lobby");
	showDiv("mahjong-online-game");
	startGame();
}
// callback function to join room
function joinRoom_cb(roomId){
	console.log(roomId)
	joinRoom(parseInt(roomId));
	onLobby = false;
	onGame = true;
	hideDiv("mahjong-online-lobby");
	showDiv("mahjong-online-game");
	startGame();
}

function getRooms(){
	socket_gs.send(JSON.stringify({ 
		action: 'get rooms', 
		user_name: user_name, 
		token: token
	}));
}
function getUsers(){
	socket_gs.send(JSON.stringify({ 
		action: 'get users', 
		user_name: user_name, 
		token: token
	}));
}
function makeRoom(roomName){
	socket_gs.send(JSON.stringify({ 
		action: 'make room', 
		user_name: user_name, 
		token: token,
		room_name: roomName
	}));
}
function joinRoom(roomId){
	socket_gs.send(JSON.stringify({ 
		action: 'join room', 
		user_name: user_name, 
		token: token,
		room_id: roomId
	}));
}
function addRoom(room){
	addElemDiv('room-list', '<button id=\"'+room.id+'\" onclick=\"joinRoom_cb(this.id)\">'+room.roomName+'  '+room.playingUserNames.length+'/4 players</button>');
}
function updateRooms(rooms){
	clearDiv('room-list');
	for(var i = 0; i < rooms.length; i++){
		addRoom(rooms[i]);
	}
}

function updateUsers(userNames){
	clearUl('user-list');
	for(var i = 0; i < userNames.length; i++){
		addTextUl('user-list', userNames[i]);
	}
}
