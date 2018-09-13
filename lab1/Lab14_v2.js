function Calculator() {
    this.read = function() {
        this.firstOperand = Number(prompt('Enter fitst operand', 0));
        this.secondOperand = Number(prompt('Enter second operand', 0));
        //console.log(this.firstOperand);
    }

    this.sum = function() {
        if ((!isNaN(this.firstOperand)) && (!isNaN(this.secondOperand)))
            return this.firstOperand + this.secondOperand;
        else
            return undefined;
    }

    this.mul = function() {
        if ((!isNaN(this.firstOperand)) && (!isNaN(this.secondOperand)))
            return this.firstOperand * this.secondOperand;
        else
            return undefined;
    }
}

var calculator = new Calculator();
calculator.read();

alert((calculator.sum() != undefined) ? "Сумма = " + calculator.sum() : "одно или оба введенных значения не являются числом");
alert((calculator.mul() != undefined) ? "Произведение = " + calculator.mul() : "одно или оба введенных значения не являются числом");