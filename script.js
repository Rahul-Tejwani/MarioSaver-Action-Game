let score = 0;
let cross = true;

const backgroundMusic = new Audio('music.mp3');
const gameOverMusic = new Audio('gameOver.mp3');
const jumpSound = new Audio('jumpSound.mp3');

setTimeout(() => {
    backgroundMusic.play();
}, 1500);

document.onkeydown = (event) => {
    if(event.key=="ArrowUp"){
        jumpSound.play();
        let mario = document.querySelector('.mario');
        mario.classList.add('animateMario');
        setTimeout(() => {
            mario.classList.remove('animateMario');
        }, 700);
    }
    else if(event.key=="ArrowRight"){
        let mario = document.querySelector('.mario');
        let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX + 200) + "px";
    }
    else if(event.key=="ArrowLeft"){
        let mario = document.querySelector('.mario');
        let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = (marioX - 200) + "px";
    }
}

setInterval(() => {
    let mario = document.querySelector('.mario');
    let gameOver = document.querySelector('.gameOver');
    let dragon = document.querySelector('.dragon');

    let marioX = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    let marioY = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    let dragonX = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    let dragonY = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    let diffX = Math.abs(marioX - dragonX);
    let diffY = Math.abs(marioY - dragonY);
    
    //console.log(diffX, diffY);
    if(diffX < 70 && diffY < 100){
        gameOver.innerHTML = "Game Over";
        gameOver.style.fontSize = '60px';
        gameOver.style.color = 'red';
        dragon.classList.remove('animateDragon');
        backgroundMusic.pause();
        gameOverMusic.play();
        // setTimeout(() => {
        //     gameOverMusic.pause();
        // }, 1000);
    }
    else if(diffX < 150 && cross){      
        score+=10;
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

function updateScore(score){
    let userScore = document.querySelector('.scoreCont');
    userScore.innerHTML = "Your Score: "+score;
}

function reduceAnimationDuration(){
    let dragon = document.querySelector('.dragon');
    let animationDuration = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
    if(animationDuration > 2.5){
        animationDuration -= 0.2;
        dragon.style.animationDuration = animationDuration+'s';
        console.log("New Animation Duration : "+animationDuration);
    }
}
