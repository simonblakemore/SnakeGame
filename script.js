let canvas;
let ctx;
let speed = 12;
let direction = 'down';
let gameState = 'start';

window.onload = function() {
  let info = document.getElementById('info');
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  document.addEventListener('keydown', keyPush);
  setInterval(game, 1000 / speed);
} // end window.onload


let playerX = playerY = 10;
let gridSize = 20;
let totalCells = 20;
let cherryX = cherryY = 15;
let velocityX = 0, velocityY = 1;
let trail = [];
let initialTail = 15;
let tail = initialTail;
let score = 0;
let highScore = 0;
let invulnerable = true;
let framesPlayed = 0;


function drawBackground() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);
} //end drawBackground()

function drawSnake() {
  //debugger;
  ctx.fillStyle = 'lime';
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
    //if (i = tail) playing = true;
    if (trail[i].x == playerX && trail[i].y == playerY) {
      score = 0;
      tail = initialTail;
      if (invulnerable === false) gameState = 'over';
    }
  }
} // end drawSnake

function drawCherry() {
  ctx.fillStyle = 'red';
  ctx.fillRect(cherryX * gridSize,cherryY * gridSize, gridSize - 2, gridSize - 2);
  info.innerHTML = `Score: ${score} High Score: ${highScore}`;
} //end drawCherry()

function startGame() {
  drawBackground();
} //end startGame()

function playGame() {


  // Set the direction of player movement
  playerX += velocityX;
  playerY += velocityY;

  //wrap player to oposite side of the canvas when going out of bounds
  if (playerX < 0) playerX = totalCells - 1;
  if (playerX > totalCells - 1) playerX = 0;
  if (playerY < 0) playerY = totalCells - 1;
  if (playerY > totalCells - 1) playerY = 0;

  //Draw background
  drawBackground();

  //Draw snake
  drawSnake();


  //Update snake position (trail array)
  trail.push({x:playerX, y:playerY});
  while(trail.length > tail) trail.shift();



  //Check for snake eating cherry
  if (cherryX == playerX && cherryY == playerY) {
    score++; //update score
    if (score > highScore) highScore = score;
    tail++; // increase snake
   cherryX = Math.floor(Math.random() * totalCells); //reset cherry position
   cherryY = Math.floor(Math.random() * totalCells); //
  }

  //Draw cherry
  drawCherry();



} //end playGame()

function gameOver() {
  drawBackground();
} //end gameOver()

function game() {



  if (gameState === 'start') startGame();
  if (gameState === 'play') {
    if (direction !== null) framesPlayed++;
    if (framesPlayed > initialTail) invulnerable = false;
    playGame();
  }
  if (gameState === 'over') gameOver();


} //end game()


//handle key presses
function keyPush(event) {
  if (gameState === 'play') {
    switch(event.keyCode) {
      case 37: //Left arrow
        if (direction !== 'right') {
          direction = 'left';
          velocityX = -1;
          velocityY = 0;
        }
        break;
      case 38: //Up arrow
        if (direction !== 'down') {
          direction = 'up'
          velocityX = 0;
          velocityY = -1;
        }
        break;
      case 39: //Right arrow
        if (direction !== 'left') {
          direction = 'right'
          velocityX = 1;
          velocityY = 0;
        }
        break;
      case 40: //Down arrow
        if (direction !== 'up') {
          direction = 'down';
          velocityX = 0;
          velocityY = 1;
        }
        break;
    } //end switch
  }

  if (gameState === 'start') {
    switch(event.keyCode) {
      case 13: //Enter
        gameState = 'play';
    }
  }

  if (gameState === 'over') {
    switch(event.keyCode) {
      case 32: //Space
        gameState = 'start';
    }
  }
} //end keyPush()
