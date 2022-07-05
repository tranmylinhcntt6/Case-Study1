class RandomOperator {
    constructor(){
        this.add = "+";
        this.sub = "-";
        this.mul = "*";
 
    }
    
    getRandomOperator(){
        let operators = [this.add, this.sub, this.mul];
        let ran = Math.floor(Math.random() * operators.length);
        return operators[ran];
    }
}