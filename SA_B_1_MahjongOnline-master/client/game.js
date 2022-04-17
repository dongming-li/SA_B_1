var game = null;

function startGame(){
	game = new Phaser.Game(800, 600, Phaser.AUTO, 'mahjong-online-game');
	game.state.add('option', optionState);
	game.state.add('play', playState);

	game.state.start('play');

	console.log("game started");
}
