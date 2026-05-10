const game = document.getElementById("game");

let score = 0;
let lives = 3;
let combo = 0;
let best = localStorage.getItem("best") || 0;

let playerX = 120;
let ballX = Math.random() * 260;
let ballY = 0;

let speed = 4;
let paused = false;

/* PLAYER */
const player = document.createElement("div");
player.className = "player";
game.appendChild(player);

/* BALL */
const ball = document.createElement("div");
ball.className = "ball";
game.appendChild(ball);

/* UPDATE UI */
function ui() {
  document.getElementById("score").innerText = score;
  document.getElementById("lives").innerText = lives;
  document.getElementById("combo").innerText = combo;

  document.getElementById("scoreL").innerText = score;
  document.getElementById("comboL").innerText = combo;
  document.getElementById("livesL").innerText = lives;
  document.getElementById("best").innerText = best;
}

/* RESET BALL */
function resetBall() {
  ballY = 0;
  ballX = Math.random() * 260;
}

/* MOVE */
function left() {
  playerX -= 25;
  if (playerX < 0) playerX = 0;
}

function right() {
  playerX += 25;
  if (playerX > 260) playerX = 260;
}

/* PAUSE */
function togglePause() {
  paused = !paused;
}

/* RESTART */
function restart() {
  location.reload();
}

/* COLLISION FIX (ANTI TEMBUS) */
function collision() {
  let hit =
    ballY >= 430 &&
    ballX > playerX - 20 &&
    ballX < playerX + 90;

  if (hit) {
    score += 10 + combo;
    combo++;
    resetBall();
  }

  if (ballY > 520) {
    lives--;
    combo = 0;
    resetBall();

    if (lives <= 0) {
      if (score > best) {
        localStorage.setItem("best", score);
      }
      alert("GAME OVER");
      location.reload();
    }
  }
}

/* LOOP */
function loop() {
  if (paused) return;

  ballY += speed;

  collision();

  speed += 0.0015;

  player.style.left = playerX + "px";
  ball.style.left = ballX + "px";
  ball.style.top = ballY + "px";

  ui();

  requestAnimationFrame(loop);
}

loop();

/* KEYBOARD */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") left();
  if (e.key === "ArrowRight") right();
});