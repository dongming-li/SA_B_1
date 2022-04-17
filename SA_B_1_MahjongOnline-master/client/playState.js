class Pos {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
}
class Player {
	constructor(){
		this.name = "";
		this.points = 0;
		this.tiles = [];
		this.ponTiles = [];
		this.chowTiles = [];
		this.kongTiles = [];
	}
}

class GameManager {
	constructor() {
		this.players = [new Player(), new Player(), new Player(), new Player()];
		this.currTurn = 0;
		this.remainingTiles = [
			"1DOT","2DOT","3DOT","4DOT","5DOT","6DOT","7DOT","8DOT","9DOT",
			"1DOT","2DOT","3DOT","4DOT","5DOT","6DOT","7DOT","8DOT","9DOT",
			"1DOT","2DOT","3DOT","4DOT","5DOT","6DOT","7DOT","8DOT","9DOT",
			"1DOT","2DOT","3DOT","4DOT","5DOT","6DOT","7DOT","8DOT","9DOT",
			"1BAM","2BAM","3BAM","4BAM","5BAM","6BAM","7BAM","8BAM","9BAM",
			"1BAM","2BAM","3BAM","4BAM","5BAM","6BAM","7BAM","8BAM","9BAM",
			"1BAM","2BAM","3BAM","4BAM","5BAM","6BAM","7BAM","8BAM","9BAM",
			"1BAM","2BAM","3BAM","4BAM","5BAM","6BAM","7BAM","8BAM","9BAM",
			"1CHA","2CHA","3CHA","4CHA","5CHA","6CHA","7CHA","8CHA","9CHA",
			"EAST","SOUTH","WEST","NORTH","RED","GREEN","WHITE",
			"EAST","SOUTH","WEST","NORTH","RED","GREEN","WHITE",
			"EAST","SOUTH","WEST","NORTH","RED","GREEN","WHITE",
			"EAST","SOUTH","WEST","NORTH","RED","GREEN","WHITE"
		];
		this.thrownTiles = [];
	}
	decideTurn(){
		this.currTurn = getRandomInt(0, 4);
	}
	throw(playerName, tile){
		this.nextTurn();
	}
	chow(playerName, tile){
		// only from the tile the last player threw away
	}
	pon(playerName, tile){

	}
	nextTurn(){
		currTurn += 1;
		currTurn %= 4;
	}
	updateCurrState(state){
		// update the current state
	}
	initGame(){
		// give random tiles to
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 14; j++){
				this.players[i].tiles.push(this.giveRandomTile());
		  	}
		}
	}
	renderState(){

	}
	// give random tile from remaining tiles
	giveRandomTile(){
		var remainingTileNum = this.remainingTiles.length;
		if(remainingTileNum > 0){
			var idx = getRandomInt(0, remainingTileNum);
		  	var tile = this.remainingTiles[idx];
		  	this.remainingTiles.remove(idx);
		  	return tile; 
		}
		return null; // no remaining tile
	}
}

class RenderManager{
	constructor(){
		this.gameSize = new Pos(800, 600);
		this.ssTileSize = new Pos(113.7, 142.5); // actual spritesheet tile size
		this.tileSize = new Pos(50, 63); // tile size
		this.ssTilesNum = 34; // number of tiles in the spritesheet
		this.ssTileOrder = {
	    	"1DOT":0,"2DOT":1,"3DOT":2,"4DOT":3,"5DOT":4,"6DOT":5,"7DOT":6,"8DOT":7,"9DOT":8,
			"1BAM":9,"2BAM":10,"3BAM":11,"4BAM":12,"5BAM":13,"6BAM":14,"7BAM":15,"8BAM":16,"9BAM":17,
			"1CHA":18,"2CHA":19,"3CHA":20,"4CHA":21,"5CHA":22,"6CHA":23,"7CHA":24,"8CHA":25,"9CHA":26,
			"EAST":27,"SOUTH":28,"WEST":29,"NORTH":30,"RED":31,"GREEN":32,"WHITE":33
		};
		this.player1TileSprites = [];
	}
	addTile(pos, tileName){
		var s = game.add.sprite(50+pos*this.tileSize.x, 500, 'tiles');
		// choose the given tile
		s.frame = this.ssTileOrder[tileName];
		//s.angle = 180
		// change the size to tileSize
		s.scale.setTo(this.tileSize.x/this.ssTileSize.x, this.tileSize.y/this.ssTileSize.y);
		s.inputEnabled = true; // check input for this sprite
		return s;
	}
	// make the initial game screen
	initGame(){
		var playerTiles = gameManager.players[0].tiles;
		console.log(playerTiles)
		for(var i = 0; i < 14; i++){
			this.player1TileSprites.push(this.addTile(i, playerTiles[i]));
		}
	}
	// call this function to load the tiles from picture
	loadSsTile(){
		game.load.spritesheet('tiles', 'tiles.jpg', this.ssTileSize.x, this.ssTileSize.y, this.ssTilesNum);
	}
	// check if the cursor is on the tile
	checkPointerForTiles(){
		for(var i = 0; i < this.player1TileSprites.length; i++){
			if (this.player1TileSprites[i].input.pointerOver()) {
		        this.player1TileSprites[i].alpha = 1;
		    } else {
		        this.player1TileSprites[i].alpha = 0.5;
		    }
		}
	}
}

var gameManager = new GameManager();
var renderManager = new RenderManager();

var playState = {
	preload: function() {
		renderManager.loadSsTile();
	},

	create: function() {
		// change background color to green
		game.stage.backgroundColor = "#007018"; 

		gameManager.initGame();
		renderManager.initGame();
	},

	update: function() {
		renderManager.checkPointerForTiles();
	}
};


