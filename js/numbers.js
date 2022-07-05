class RandomNumber {
    constructor(min,max){
        this.min = min;
        this.max = max;
    }
    getRandomNumber(){
        return Math.floor(Math.random() * (this.max - this.min) + this.min);
    }
}