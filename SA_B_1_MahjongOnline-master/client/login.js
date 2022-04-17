// make websocket connection to login server
var socket_ls = null;
var socket_ls_ok = false;
try {
	socket_ls = new WebSocket('ws://localhost:3002');
	socket_ls_ok = true;
	console.log('connected to login server (ls)');
} catch(e){
	console.log('login server (ls) is down');
}

if(socket_ls_ok){
	// event handler for message
	socket_ls.onmessage = function (message) {
		var data = JSON.parse(message.data);

		if(data.action == 'login'){
			if(data.status == 'ok'){
				user_name = data.user_name;
				token = data.token;
				onLogin = false;
				onLobby = true;
				hideDiv("mahjong-online-login");
				showDiv("mahjong-online-lobby");
				startGameClient();
				console.log('socket_ls: login successful');
			} else if (data.status == 'error') {
				console.log('socket_ls: login failed because ' + data.reason);
			}
		} else if(data.action == 'signup'){
			if(data.status == 'ok'){
				console.log('socket_ls: signup successful');
			} else if (data.status == 'error') {
				console.log('socket_ls: login failed because ' + data.reason);
			}
		}
	};
}

function loginToServer()
{
	// send data to server
	socket_ls.send(JSON.stringify({ 
		action: 'login', 
		name: document.login.username.value, 
		password: document.login.password.value
	}));

	console.log('trying to login');
}

function signupToServer()
{
	// send data to server
	socket_ls.send(JSON.stringify({ 
		action: 'signup', 
		name: document.signup.username.value, 
		password: document.signup.password.value
	}));
}
