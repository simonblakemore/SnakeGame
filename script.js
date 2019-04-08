let canvas;
let ctx;
let speed = 10;
let direction = 'null';
let gameState = 'start';

window.onload = function() {
  let info = document.getElementById('info');
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  document.addEventListener('keydown', keyPush);
  game = setInterval(gameControler, 1000 / 60);
} // end window.onload


let playerX = playerY = 10;
let gridSize = 20;
let totalCells = 20;
let cherryX = cherryY = 15;
let velocityX = 0, velocityY = 0;
let trail = [];
let initialTail = 4;
let tail = initialTail;
let score = 0;
let highScore = (localStorage.HighScore === null) ? 0 : localStorage.HighScore;
let invulnerable = true;
let framesPlayed = 0;


function drawBackground(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0,0, canvas.width, canvas.height);
} //end drawBackground()

function drawSnake() {
  //debugger;
  ctx.fillStyle = 'lime';
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
    //if (i = tail) playing = true;
    if (trail[i].x == playerX && trail[i].y == playerY) {
      if (invulnerable === false) {
        gameState = 'over';
      }
    }
  }
} // end drawSnake

function drawCherry() {
  ctx.fillStyle = 'red';
  ctx.fillRect(cherryX * gridSize,cherryY * gridSize, gridSize - 2, gridSize - 2);
} //end drawCherry()

function playGame() {
  info.innerHTML = `Score: ${score} High Score: ${highScore}`;
  // Set the direction of player movement
  playerX += velocityX;
  playerY += velocityY;

  //wrap player to oposite side of the canvas when going out of bounds
  if (playerX < 0) playerX = totalCells - 1;
  if (playerX > totalCells - 1) playerX = 0;
  if (playerY < 0) playerY = totalCells - 1;
  if (playerY > totalCells - 1) playerY = 0;

  //Draw background
  drawBackground('black');

  //Draw snake
  drawSnake();

  if (gameState === 'over') {
    clearInterval(game);
    game = setInterval(gameControler, 1000 / 60);
  }

  //Update snake position (trail array)
  trail.push({x:playerX, y:playerY});
  while(trail.length > tail) trail.shift();

  //Check for snake eating cherry
  if (cherryX == playerX && cherryY == playerY) {
    score++; //update score
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("HighScore", highScore);
    }

    tail++; // increase snake
   cherryX = Math.floor(Math.random() * totalCells); //reset cherry position
   cherryY = Math.floor(Math.random() * totalCells); //
   speed++;
   clearInterval(game);
   game = setInterval(playGame, 1000 / speed);
  }

  //Draw cherry
  drawCherry();

  if (direction !== 'null') framesPlayed++;
  if (framesPlayed === initialTail) invulnerable = false;

} //end playGame()

function startGame() {
  drawBackground('blue');
} //end startGame()

function gameOver() {
  score = 0;
  tail = initialTail;
  playerX = 10;
  playerY = 10;
  velocityX = 0;
  velocityY = 0;
  direction = 'null';
  invulnerable = true;
  trail = [];
  framesPlayed = 0;
  speed = 12;
  drawBackground('red');
} //end gameOver()

function gameControler() {

  switch(gameState) {
    case 'start':
      startGame();
      break;
    case 'over':
      gameOver();
      break;
    case 'play':
      clearInterval(game);
      game = setInterval(playGame, 1000 / speed);
      break;
  }

} //end gameControler()

//handle key presses
function keyPush(event) {
  if (true) {
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
