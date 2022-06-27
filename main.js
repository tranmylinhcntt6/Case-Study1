// truy cap vao cac phan tu DOM
const StartGame = document.querySelector('#start-game');
const game = document.querySelector('#game');
const btnStartGame = document.querySelector('#btn-start-game');
const btnPlayAgain = document.querySelector('#btn-play-again');
const endGameEl = document.querySelector('#end-game');
const timeEl = document.querySelector('#time'); 
const memoryGame = document.querySelector('.math-game');
// khai bao bien
let score = 0;
let level = 1;
let time = 11; // thoi gian hien tai
let fullTime = 11; // thoi gian cho phep toan
let widthTime = 0; // chieu dai thanh hien thi thoi gian

class RandomOperator {
    constructor(add, sub, mul){
        this.add = "+";
        this.sub = "-";
        this.mul = "*";
    //    this.div = "/";
    }
    getAdd(){
        return this.add;
    }
    getSub(){
        return this.sub;
    }
    getMul(){
        return this.mul;
    }

}

class RandomNumber {
    constructor(min,max){
        this.min = min;
        this.max = max;
    }
    getRandomNumber(){
        return Math.floor(Math.random() * (this.max - this.min) + this.min);
    }
}

let randomOperator = new RandomOperator();

function getRandomOperator(){
    let operators = [randomOperator.getAdd(), randomOperator.getSub(), randomOperator.getMul()];
    let ran = Math.floor(Math.random() * operators.length);
    return operators[ran];
}

function generateCalculation(){
    let number1 = new RandomNumber(1 * level, 5 * level);
    let number2 = new RandomNumber(1 * level, 5 * level);
    let op = getRandomOperator();
    let cal = number1.getRandomNumber() + " " + op + " " + number2.getRandomNumber();
    if(level >= 5){
        cal = number1.getRandomNumber() + " " + op + " " + number2.getRandomNumber() + " " + getRandomOperator() + " " +  Math.floor(Math.random() * 100);
    }
    document.getElementById("calculation").innerHTML = cal;
    document.getElementById("result").innerHTML = getRandomResult();
}

function getRandomResult() {
    let randomResult = Math.random() >= 0.5; // ti le dung sai 50:50
    return randomResult ? getResult() : getFakedResult();
}

function getResult() {
    let cal = document.getElementById("calculation").innerHTML;
    return eval(cal);
}

function getFakedResult() {
    let fakeResult = new RandomNumber(getResult() - 10, getResult() + 10); // sai so la 10
    return (fakeResult.getRandomNumber() === getResult()) ? getFakedResult() : fakeResult.getRandomNumber();
}

// bat su kien cho button

function check(btn){
    let result = +document.getElementById('result').innerHTML;
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
    document.getElementById("score-game").innerHTML = "Score: " + score;
    document.getElementById("level-game").innerHTML = "Level: " + level;
    generateCalculation();
}

function gameOver(){
    document.getElementById("true").style.display = "none";
    document.getElementById("false").style.display = "none";
    alert("Game Over. Your score is "+ score + ". Replay?");
    location.reload();
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
    document.getElementById("score-game").innerHTML = "Score: "+score;
    document.getElementById("level-game").innerHTML = "Level: "+level;
    generateCalculation();
    countDown();
}


// hien thi giao dien
btnStartGame.addEventListener("click", function() {
    StartGame.style.display = "none";
    game.style.display = "flex";

    startGame();
});