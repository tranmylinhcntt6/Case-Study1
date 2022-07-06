
// truy cap vao cac phan tu DOM
const StartGame = document.querySelector('#start-game');
const game = document.querySelector('#game');
const btnStartGame = document.querySelector('#btn-start-game');
const btnPlayAgain = document.querySelector('#btn-play-again');
const endGameEl = document.querySelector('#end-game');
const timeEl = document.querySelector('#time');
const Calculation = document.querySelector('#calculation');
const Result = document.querySelector('#result');
const scoreGame = document.querySelector('#score-game');
const levelGame = document.querySelector('#level-game');
const writeGame = document.querySelector('#write-score');
// khai bao bien
let score = 0;
let level = 1;
let time = 11; 
let fullTime = 11; 

let randomOperator = new RandomOperator();
let number1 = new RandomNumber(1 * level, 5 * level);
let number2 = new RandomNumber(1 * level, 5 * level);


function generateCalculation(){
    let op = randomOperator.getRandomOperator();
    let cal = number1.getRandomNumber() + " " + op + " " + number2.getRandomNumber();
    if(level >= 5){
        cal = number1.getRandomNumber() + " " + op + " " + number2.getRandomNumber()
         + " " + randomOperator.getRandomOperator() + " " +  Math.floor(Math.random() * 100);
    }
  
    Calculation.innerHTML = cal;
    Result.innerHTML = getRandomResult();
}

function getRandomResult() {
    let randomResult = Math.random() >= 0.5; // ti le dung sai 50:50
    return randomResult ? getResult() : getFakedResult();
}

function getResult() {
    let cal = Calculation.innerHTML;
    return eval(cal);
}

function getFakedResult() {
    let fakeResult = new RandomNumber(getResult() - 10, getResult() + 10); // sai so la 10
    return (fakeResult.getRandomNumber() === getResult()) ? getFakedResult() : fakeResult.getRandomNumber();
}

// bat su kien cho button

function check(btn){
    let result = +Result.innerHTML;
    let check = false;
    switch (btn){
        case "true":
            if(result == getResult()) {
                check = true;
            }
        break;
        case "false":
            if(result !== getResult()) {
                check = true;
            }
        break;
    }
    check ? nextLevel() : gameOver();
}

function nextLevel(){
    score++;
    level++;
    time = fullTime;
    scoreGame.innerHTML = "Score: " + score;
    levelGame.innerHTML = "Level: " + level;
    generateCalculation();
}

function gameOver(){
   
    game.style.display = "none";
    endGameEl.style.display = "flex";
    writeGame.innerHTML = "Your score is "+ score;

}

function countDown() {
    let run = setInterval(function () {
        time--;
        updateTime();
        if(time < 0){
            clearInterval(run);
            gameOver();
        }
    },1000);
}

function updateTime(){
    timeEl.innerText = convertTime(time);
}

function convertTime(time){
    let minute = `0${Math.floor(time / 60)}`.slice(-2);
    let second = `0${time % 60}`.slice(-2);
    return `${minute}:${second}s`;
}

function startGame() {
    time = fullTime;
    score = 0;
    level = 1;
    scoreGame.innerHTML = "Score: "+score;
    levelGame.innerHTML = "Level: "+level;
    generateCalculation();
    countDown();
}


// hien thi giao dien
btnStartGame.addEventListener("click", function() {
    StartGame.style.display = "none";
    game.style.display = "flex";

    startGame();
});

endGameEl.addEventListener("click", function() {
    endGameEl.style.display = "none";
    game.style.display = "flex";
    startGame();
});
