var board = document.querySelector(".grid-container");
var currentPlayer = "Red";
var currentPlayerSpan = document.getElementsByClassName("currentplayer");

// Also play again and restart buttons

// Array of arrays
var winningArray = [
	// Horizontal
	[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
	[4, 5, 6, 7], [8, 9, 10, 11], [9, 10, 11, 12],
	[10, 11, 12, 13], [11, 12, 13, 14], [15, 16, 17, 18],
	[16, 17, 18, 19], [17, 18, 19, 20], [18, 19, 20, 21],
	[22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
	[25, 26, 27, 28], [29, 30, 31, 32], [30, 31, 32, 33],
	[31, 32, 33, 34], [32, 33, 34, 35], [36, 37, 38, 39],
	[37, 38, 39, 40], [38, 39, 40, 41], [39, 40, 41, 42],
	
	// Vertical
	[1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
	[2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
	[3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
	[4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
	[5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
	[6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
	[7, 14, 21, 28], [14, 21, 28, 35], [21, 28, 35, 42],
	
	// Diagonal (top left to bottom right)
	[15, 23, 31, 39], [8, 16, 24, 32], [16, 24, 32, 40],
	[1, 9, 17, 25], [9, 17, 25, 33], [17, 25, 33, 41],
	[2, 10, 18, 26], [10, 18, 26, 34], [18, 26, 34, 42],
	[3, 11, 19, 27], [11, 19, 27, 35], [4, 12, 20, 28],
	
	// Diagonal (bottom left to top right)
	[4, 10, 16, 22], [5, 11, 17, 23], [11, 17, 23, 29],
	[6, 12, 18, 24], [12, 18, 24, 30], [18, 24, 30, 36],
	[7, 13, 19, 25], [13, 19, 25, 31], [19, 25, 31, 37],
	[14, 20, 26, 32], [20, 26, 32, 38], [21, 27, 33, 39]
];

var redTiles = [];
var yellowTiles = [];

// Create board state array (array of objects)
var gameState = [];
setGameState();




function setGameState()
{
	for (var i = 1; i <= 42; i++) {
		obj =
		{
			"number": i,
			"filled": false,
			"color": "none",
			"column": i%7 || 7
		};
		gameState.push(obj);
	}
	console.log(gameState);
}


function squareClick(col) {
	//Validation
	if(!(col >= 1 && col <= 7)) {
		return;
	}
	
	var droppedTile = false;
	console.log(gameState[41]);
	console.log(gameState[41].column);
	
	//Add a tile to the right column using the gamestate array
	for(var i = gameState.length-1; i >= 0; i--) {
		
		if(gameState[i].column === col) {
			// If the tile is not filled, then change the tile to be filled,
			// change the color, then break.
			if(gameState[i].filled === false) {
				document.getElementById("square"+i).style.backgroundColor = currentPlayer;
				gameState[i].filled = true;
				gameState[i].color = currentPlayer;
				droppedTile = true;
				
				if(currentPlayer === "Red"){
					redTiles.push(i);
				}
				if(currentPlayer === "Yellow"){
					yellowTiles.push(i);
				}
				break;
			}
		}
	}
	
	//If we didn't drop a tile because a column is full
	if(droppedTile === false) {
		return;
	}
	
	console.log(gameState);
	
	//Check if a player has won
	checkWon();
	
	//Make it the next player's turn
	nextTurn();
}


function checkWon()
{
	winningArray.forEach(element => {
		if(redTiles.includes(element[0]-1) &&
		   redTiles.includes(element[1]-1) &&
		   redTiles.includes(element[2]-1) &&
		   redTiles.includes(element[3]-1))
		{
			alert("Red won!!!!!!!!");
			location.reload();
		}
		if(yellowTiles.includes(element[0]-1) &&
		   yellowTiles.includes(element[1]-1) &&
		   yellowTiles.includes(element[2]-1) &&
		   yellowTiles.includes(element[3]-1))
		{
			alert("Yellow won!!!!!!!!");
			location.reload();
		}
	});
}


function nextTurn()
{
	if (currentPlayer === "Red") {
		currentPlayer = "Yellow";
		document.getElementById("currentplayer").innerHTML = "<span style=\"color:#CCCC00\">Yellow</span> to move";
	} else if (currentPlayer === "Yellow") {
		currentPlayer = "Red";
		document.getElementById("currentplayer").innerHTML = "<span style=\"color:red\">Red</span> to move";
	}
}











