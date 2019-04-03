let canvas;
let ctx;
let speed = 12;
let direction = null;

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
let velocityX = velocityY = 0;
let trail = [];
let tail = 5;
let score = 0;
let highScore = 0;

function game() {
  // Set the direction of player movement
  playerX += velocityX;
  playerY += velocityY;

  //wrap player to oposite side of the canvas when going out of bounds
  if (playerX < 0) playerX = totalCells - 1;
  if (playerX > totalCells - 1) playerX = 0;
  if (playerY < 0) playerY = totalCells - 1;
  if (playerY > totalCells - 1) playerY = 0;

  //Draw background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  //Draw snake
  ctx.fillStyle = 'lime';
  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
    if (trail[i].x == playerX && trail[i].y == playerY) {
      score = 0;
      tail = 5;
    }
  }

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
  ctx.fillStyle = 'red';
  ctx.fillRect(cherryX * gridSize,cherryY * gridSize, gridSize - 2, gridSize - 2);
  info.innerHTML = `Score: ${score} High Score: ${highScore}`;
} //end game()


//handle key presses
function keyPush(event) {
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
} //end keyPush()
