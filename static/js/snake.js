let scoreBlock;
let score = 0;

const config = {
	step: 0,
	maxStep: 6,
	sizeCell: 16,
	sizeBerry: 16 / 4
}

const snake = {
	x: 160,
	y: 160,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3
}

let berry = {
	x: 0,
	y: 0
} 


let canvas = document.querySelector("#game-canvas");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".game-score .score-count");
drawScore();

function gameLoop() {

	requestAnimationFrame( gameLoop );
	if ( ++config.step < config.maxStep) {
		return;
	}
	config.step = 0;

	context.clearRect(0, 0, canvas.width, canvas.height);

	drawBerry();
	drawSnake();
}
requestAnimationFrame( gameLoop );

function drawSnake() {
	snake.x += snake.dx;
	snake.y += snake.dy;

	collisionBorder();

	// todo бордер
	snake.tails.unshift( { x: snake.x, y: snake.y } );

	if ( snake.tails.length > snake.maxTails ) {
		snake.tails.pop();
	}

	snake.tails.forEach( function(el, index){
		if (index == 0) {
			context.fillStyle = "#00FF00";
		} else {
			context.fillStyle = "#22AA00";
		}
		context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

		if ( el.x === berry.x && el.y === berry.y ) {
			snake.maxTails++;
			incScore();
			randomPositionBerry();
		}

		for( let i = index + 1; i < snake.tails.length; i++ ) {

			if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
				refreshGame();
			}

		}

	} );
}

function collisionBorder() {
	if (snake.x < 0) {
		snake.x = canvas.width - config.sizeCell;
	} else if ( snake.x >= canvas.width ) {
		snake.x = 0;
	}

	if (snake.y < 0) {
		snake.y = canvas.height - config.sizeCell;
	} else if ( snake.y >= canvas.height ) {
		snake.y = 0;
	}
}
function refreshGame() {
	score = 0;
	drawScore();

	snake.x = 160;
	snake.y = 160;
	snake.tails = [];
	snake.maxTails = 3;
	snake.dx = config.sizeCell;
	snake.dy = 0;

	randomPositionBerry();
}

function drawBerry() {
	context.beginPath();
	context.fillStyle = "#FF1100";
	context.arc( berry.x + (config.sizeCell / 2 ), berry.y + (config.sizeCell / 2 ), config.sizeBerry, 0, 2 * Math.PI );
	context.fill();
}

function randomPositionBerry() {
	berry.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
	berry.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}

function incScore() {
	score++;
	drawScore();
}

function drawScore() {
	scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
	if ( e.code == "KeyW" ) {
		snake.dy = -config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyA" ) {
		snake.dx = -config.sizeCell;
		snake.dy = 0;
	} else if ( e.code == "KeyS" ) {
		snake.dy = config.sizeCell;
		snake.dx = 0;
	} else if ( e.code == "KeyD" ) {
		snake.dx = config.sizeCell;
		snake.dy = 0;
	}
});

//Snake beta version 1
// const canvas = document.getElementById("game");
// const ctx = canvas.getContext("2d");

// const ground = new Image();
// ground.src = "../static/img/snake_ground.png";

// const foodImg = new Image();
// foodImg.src = "../static/img/snake_food.png";

// let box = 32;

// let score = 0;

// let food = {
//   x: Math.floor((Math.random() * 17 + 1)) * box,
//   y: Math.floor((Math.random() * 15 + 3)) * box,
// };

// let snake = [];
// snake[0] = {
//   x: 9 * box,
//   y: 10 * box
// };

// document.addEventListener("keydown", direction);

// let dir;

// function direction(event) {
//   if(event.keyCode == 37 && dir != "right")
//     dir = "left";
//   else if(event.keyCode == 38 && dir != "down")
//     dir = "up";
//   else if(event.keyCode == 39 && dir != "left")
//     dir = "right";
//   else if(event.keyCode == 40 && dir != "up")
//     dir = "down";
// }

// function eatTail(head, arr) {
//   for(let i = 0; i < arr.length; i++) {
//     if(head.x == arr[i].x && head.y == arr[i].y)
//       clearInterval(game);
//   }
// }

// function drawGame() {
//   ctx.drawImage(ground, 0, 0);

//   ctx.drawImage(foodImg, food.x, food.y);

//   for(let i = 0; i < snake.length; i++) {
//     ctx.fillStyle = i == 0 ? "green" : "red";
//     ctx.fillRect(snake[i].x, snake[i].y, box, box);
//   }

//   ctx.fillStyle = "white";
//   ctx.font = "50px Arial";
//   ctx.fillText(score, box * 2.5, box * 1.7);

//   let snakeX = snake[0].x;
//   let snakeY = snake[0].y;

//   if(snakeX == food.x && snakeY == food.y) {
//     score++;
//     food = {
//       x: Math.floor((Math.random() * 17 + 1)) * box,
//       y: Math.floor((Math.random() * 15 + 3)) * box,
//     };
//   } else {
//     snake.pop();
//   }

//   if(snakeX < box || snakeX > box * 17
//     || snakeY < 3 * box || snakeY > box * 17)
//     clearInterval(game);

//   if(dir == "left") snakeX -= box;
//   if(dir == "right") snakeX += box;
//   if(dir == "up") snakeY -= box;
//   if(dir == "down") snakeY += box;

//   let newHead = {
//     x: snakeX,
//     y: snakeY
//   };

//   eatTail(newHead, snake);

//   snake.unshift(newHead);
// }

// let game = setInterval(drawGame, 100);