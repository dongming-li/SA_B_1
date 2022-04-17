// global variables

var user_name = null;
var token = null;
var onLogin = true;
var onLobby = false;
var onGame = false;

// basic functions

function showDiv(id){
	var div = document.getElementById(id);
	div.style.display = "block";
}

function hideDiv(id){
	var div = document.getElementById(id);
	div.style.display = "none";
}

function addElemDiv(id, elem){
	var div = document.getElementById(id);
	div.innerHTML += elem;
}

function clearDiv(id){
	var div = document.getElementById(id);
	div.innerHTML = "";
}

function addTextUl(id, text){
	var ul = document.getElementById(id);
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(text));
	ul.appendChild(li);
}
function clearUl(id){
	var ul = document.getElementById(id);
	ul.innerHTML = "";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};