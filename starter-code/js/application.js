// Use this file to write the interactions between your game and the user

//Initialize ion library

var game = {};
$("#start-button").on("click", function() {
	$("#game-options").hide();
	$("#game-board").show();

	// Create an array with the operators that have been checked
	var activeOperators = [];
	if (document.getElementById("check-add").checked) {
		activeOperators.push("+");
	}
	if (document.getElementById("check-substract").checked) {
		activeOperators.push("-");
	}
	if (document.getElementById("check-multiply").checked) {
		activeOperators.push("*");
	}
	if (document.getElementById("check-divide").checked) {
		activeOperators.push("/");
	}

	// Assign a new TenSecondsMathGame to the variable game. The variable game has been
	// created outside of the function in order to be accesible to other functions
	game = new TenSecondsMathGame(activeOperators, document.querySelector("#range-value").value);
	printQuestion();
});

function printQuestion() { // Prints the new question in the HTML
	document.querySelector("#question-value").innerHTML = game.newQuestion();
}

function rangeUpdate(inputValue) { // Updates the value printed for the range when moving the slider
	document.querySelector("#range-value").value = inputValue;
}

function checkAnswer(inputValue) { // Checks if the written answer is ok

	if (game.isCorrectAnswer(parseInt(document.querySelector("#answer-input").value))) {

		// Empty the input box
		document.querySelector("#answer-input").value = "";

		// Generate another question
		printQuestion();
	}
}

function printTime() {
	if (timeLeft <= 0) {
		$("#clock").hide();
		$("#game-over").show();
		$("#restart-button").show();
		document.querySelector("#answer-input").disabled = true;
		return;
	} else {
		setTimeout(function() {
			document.querySelector("#time-left").innerHTML = timeLeft;
			printTime();
		}, 1000);
	}
}

$("#restart-button").on("click", function() {
	$("#clock").show();
	$("#game-over").hide();
	$("#game-board").hide();
	$("#game-options").show();
	$("#restart-button").hide();
	document.querySelector("#answer-input").disabled = false;
	timeLeft = 10;
});

printTime();
