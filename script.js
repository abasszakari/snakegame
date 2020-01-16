const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit of measurement
box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files
const dead = new Audio();
dead.src = "audio/dead.mp3";
const down = new Audio();
down.src = "audio/down.mp3";
const eat = new Audio();
eat.src = "audio/eat.mp3";
const left = new Audio();
left.src = "audio/left.mp3";
const right = new Audio();
right.src = "audio/right.mp3"
const up = new Audio();
up.src = "audio/up.mp3";

//create the snake

let snake = [];
snake[0] = {
	x: 9 * box,
	y: 10 * box
}

// create the food

let food = {
	x: Math.floor(Math.random()*17+1) * box,
	y: Math.floor(Math.random()*15+3) * box
}

//create the score variable
let score = 0;

// control the snake

let d;

document.addEventListener("keydown", direction);

function direction(event){
	
	let key = event.keyCode;
	if((key == 37 || key == 52) && d != "RIGHT"){
		d = "LEFT";
		left.play();
	}else if((key == 38 || key == 56) && d != "DOWN"){
		d = "UP"; 
		up.play();
	}else if((key == 39 || key == 54) && d != "LEFT"){
		d = "RIGHT"; 
		right.play();
	}else if((key == 40 || key == 50) && d != "UP"){
		d = "DOWN"; 
		down.play();
	}

}

// check collision function
function collision(head, array){
	for(let i = 0; i < array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y){
			return true;
		}
	}
	return false;
}

//draw everything to the canvas
function draw(){

	ctx.drawImage(ground, 0, 0);

	for( let i = 0; i < snake.length; i++){
		ctx.fillStyle = (i == 0) ? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);

		ctx.strokeStyle = "red";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y);

	// old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// which direction
	if (d == "LEFT") snakeX -= box;
	if (d == "UP") snakeY -= box;
	if (d == "RIGHT") snakeX += box;
	if (d == "DOWN") snakeY += box;

	// if the snake eats the food
	if(snakeX == food.x && snakeY == food.y){
		score++;
		eat.play();
		food = {
			x: Math.floor(Math.random()*17+1) * box,
			y: Math.floor(Math.random()*15+3) * box
		}
	}else{
		// remove the tail
		snake.pop();
	}

	// add new head

	let newHead = {
		x: snakeX,
		y: snakeY
	}

	// game over rules

	if(snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box 
		|| collision(newHead, snake)) {
		clearInterval(game);
		dead.play();
		setTimeout(function(){
      		alert("You scored " + score + " point(s). \n Press OK to play again");
      		location.reload();
  		}, 800);
	}

	// add new head to snake head
	snake.unshift(newHead);

	ctx.fillStyle = "white";
	ctx.font = "45px Changa one";
	ctx.fillText(score, 2*box, 1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);