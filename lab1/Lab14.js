function Calculator() {
    this.read = function() {
        this.firstOperand = +prompt('Enter fitst operand', 0);
        this.secondOperand = Number(prompt('Enter second operand', 0));
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

alert(isNaN(calculator.sum()) ? "одно или оба введенных значения не являются числом" : "Сумма = " + calculator.sum());
alert(isNaN(calculator.mul()) ? "одно или оба введенных значения не являются числом" : "Произведение = " + calculator.mul());