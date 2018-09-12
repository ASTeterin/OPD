function Calculator() {
    this.read = function() {
        this.firstOperand = prompt('Enter fitst operand', 0);
        this.secondOperand = prompt('Enter second operand', 0);
    } 
    this.sum = function() {
        return Number(this.firstOperand) + Number(this.secondOperand);
    }

    this.mul = function() {
        return Number(this.firstOperand) * Number(this.secondOperand);
    }
}

var calculator = new Calculator();
calculator.read();

alert("Сумма=" +  calculator.sum());
alert("Произведение=" +  calculator.mul());