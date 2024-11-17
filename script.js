let score = 0;
let cross = true;

const backgroundMusic = new Audio("music.mp3");
const gameOverMusic = new Audio("gameOver.mp3");
const jumpSound = new Audio("jumpSound.mp3");

// Unlock audio elements on the first user interaction
document.addEventListener("keydown", initializeGameSounds, { once: true });

function initializeGameSounds() {
  backgroundMusic.play().catch((error) => {
    console.log("Background music couldn't play:", error);
  });
  gameOverMusic.play().then(() => gameOverMusic.pause()).catch((error) => {
    console.log("Game Over music initialized:", error);
  });
  jumpSound.play().then(() => jumpSound.pause()).catch((error) => {
    console.log("Jump sound initialized:", error);
  });
}

document.onkeydown = (event) => {
  if (event.key == "ArrowUp") {
    jumpSound.currentTime = 0; // Reset to ensure the sound plays fully
    jumpSound.play();
    let mario = document.querySelector(".mario");
    mario.classList.add("animateMario");
    setTimeout(() => {
      mario.classList.remove("animateMario");
    }, 700);
  } else if (event.key == "ArrowRight") {
    let mario = document.querySelector(".mario");
    let marioX = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario.style.left = marioX + 200 + "px";
  } else if (event.key == "ArrowLeft") {
    let mario = document.querySelector(".mario");
    let marioX = parseInt(
      window.getComputedStyle(mario, null).getPropertyValue("left")
    );
    mario.style.left = marioX - 200 + "px";
  }
};

setInterval(() => {
  let mario = document.querySelector(".mario");
  let gameOver = document.querySelector(".gameOver");
  let dragon = document.querySelector(".dragon");

  let marioX = parseInt(
    window.getComputedStyle(mario, null).getPropertyValue("left")
  );
  let marioY = parseInt(
    window.getComputedStyle(mario, null).getPropertyValue("top")
  );

  let dragonX = parseInt(
    window.getComputedStyle(dragon, null).getPropertyValue("left")
  );
  let dragonY = parseInt(
    window.getComputedStyle(dragon, null).getPropertyValue("top")
  );

  let diffX = Math.abs(marioX - dragonX);
  let diffY = Math.abs(marioY - dragonY);

  if (diffX < 70 && diffY < 100) {
    gameOver.innerHTML = "Game Over";
    gameOver.style.fontSize = "60px";
    gameOver.style.color = "red";
    dragon.classList.remove("animateDragon");
    backgroundMusic.pause();
    gameOverMusic.currentTime = 0; // Reset to play from the beginning
    gameOverMusic.play().catch((error) => {
      console.log("Game Over music couldn't play:", error);
    });
  } else if (diffX < 150 && cross) {
    score += 10;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 500);
    setTimeout(() => {
      reduceAnimationDuration();
    }, 800);
  }
}, 100);

function updateScore(score) {
  let userScore = document.querySelector(".scoreCont");
  userScore.innerHTML = "Your Score: " + score;
}

function reduceAnimationDuration() {
  let dragon = document.querySelector(".dragon");
  let animationDuration = parseFloat(
    window.getComputedStyle(dragon, null).getPropertyValue("animation-duration")
  );
  if (animationDuration > 2.5) {
    animationDuration -= 0.2;
    dragon.style.animationDuration = animationDuration + "s";
    console.log("New Animation Duration : " + animationDuration);
  }
}

