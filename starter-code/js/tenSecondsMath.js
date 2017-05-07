// Use this file to write the logic of your game, the needed attrs and functions

var timeLeft = 10;

var TenSecondsMathGame = function(operators, numberLimit) {
	this.operators = operators;
	this.numberLimit = numberLimit;
	this.answer = 0;
	this.correctAnswers = 0;

  // Returns a random integer between [1..numberLimit]
	this.generateRandom = function() {
		return Math.floor(Math.random() * (this.numberLimit - 1) + 1);
	};

  // Returns an object with {question, answer}
	this.newQuestion = function() {
		var operator = this.operators[Math.floor(Math.random() * this.operators.length)];

		if (operator === "/") { // Rules for division

      // First calculate the result and the divisor, that must be within the limits
			this.answer = this.generateRandom();
			var secondOperand = this.generateRandom();

      // Calculate the dividend
			var firstOperand = secondOperand * this.answer;

		} else { // Rules for addition, substraction and multiplication
			var secondOperand = this.generateRandom();
			var firstOperand = this.generateRandom();

      // Check rules about operands when the operator is not a division
			while (Math.abs(firstOperand - secondOperand) <= 3 ||
      firstOperand === secondOperand) {
				secondOperand = this.generateRandom();
				firstOperand = this.generateRandom();
			}

      // Change operands when substraction gives a negative result
			if (operator === "-" && firstOperand - secondOperand < 0) {
				var aux = firstOperand;
				firstOperand = secondOperand;
				secondOperand = aux;
			}
		}

		var question = firstOperand + " " + operator + " " + secondOperand;
		this.answer = eval(question);
		return question;
	};

  // Checks a user answer
	this.isCorrectAnswer = function(result) {
		var isOk = result === this.answer;

		// Checks if it is correct
		if (isOk) {

			// Add 1 to the number of correctAnswers
			this.correctAnswers++;

			// Add 1 second to the timeLeft
			timeLeft += 1;

			// For the first correct answer you start the countDown
			if (this.correctAnswers === 1) {
				_startTimer();
			}
		}
		return isOk;
	};
	function _startTimer() {
		if (_checkTimer() > 0) {
			setTimeout(function() {
				timeLeft -= 1;
				_startTimer();
			}, 1000);
		} else {
			return true;
		}
	};

	function _checkTimer() {
		return timeLeft;
	}
};
