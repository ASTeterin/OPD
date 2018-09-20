function Calculator() {
    this.read = function() {
        this.firstOperand = Number(prompt('Enter fitst operand', 0)) || 0;
        this.secondOperand = Number(prompt('Enter second operand', 0)) || 0;
    }

    console.log(this.firstOperand);

    this.sum = function() {
        return this.firstOperand + this.secondOperand;
    }

    this.mul = function() {
        return this.firstOperand * this.secondOperand;
    }
}

var calculator = new Calculator();
calculator.read();

alert("Сумма = " + calculator.sum());
alert("Произведение = " + calculator.mul());