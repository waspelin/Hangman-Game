
// GLOBAL VARIABLES
// Array of Word Options (all lowercase)
var wordsList   = ["harold and kumar", "fast times at ridgemeont high", "pineapple express", "cheech and chong", "half baked", "the big lebowski", "dude wheres my car"];
var chosenWord  = ""; // the movie solution will be held here.
var lettersInChosenWord = []; // This will break the solution into individual letters to be stored in array
var numBlanks	= 0; // This will be the number of blanks in the incorrect bucket
var blanksAndSuccesses = []; // mix of blanks and successes
var wrongGuesses = []; //al wrong guesses

// Game counters
var winCounter  = 0;
var lossCounter = 0;
var numGuesses  = 9;

// FUNCTIONS

// startGame() - starting and restarting the game

function startGame() {
	// Reset the guesses back to 0
	numGuesses = 9;

	chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)]; // solution is chosen randomly from wordList
	lettersInChosenWord = chosenWord.split(""); // the word is broken into individual letters
	numBlanks = lettersInChosenWord.length; // we cound the number of letters in the word

	console.log(chosenWord); // debug check - sol'n

	blanksAndSuccesses = []; //reset the guess and success array each round. 
	wrongGuesses = []; // reset the wrong guesses from  previous round.

	// Fill up the blanksAndSuccesses list with number of blanks. 
	for (var i=0; i <numBlanks; i++){
		blanksAndSuccesses.push("_");
	}

	console.log(blanksAndSuccesses); // print the initial blanks in console.


	// Reprints the guessesLeft
	document.getElementById("guessesLeft").innerHTML = numGuesses;
	
	// Prints the blanks at the beginning of each round in the HTML
	document.getElementById("wordblanks").innerHTML= blanksAndSuccesses.join(" ");

	// Clears the wrong guesses from the previous round
	document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(" ");



}

// checkLettesr() function
// comparisons. 
function checkLetters(letter) {

	var letterInWord = false; 

	
	for (var i=0; i<numBlanks; i++) {
		if(chosenWord[i] == letter) {
			letterInWord = true; // if the letter exists then this boolean is true. 
 		}
	}

	
	if(letterInWord){
	
		
		for (var i=0; i<numBlanks; i++){

			// Populate the blanksAndSuccesses 
			if(chosenWord[i] == letter) {
				blanksAndSuccesses[i] = letter; 
			}
		}
		console.log(blanksAndSuccesses); // debugging
	}
	
	else {
		wrongGuesses.push(letter); 
		numGuesses--; // subtract one of the guesses
	}
}


function roundComplete(){

	
	console.log("WinCount: " + winCounter + " | LossCount: " + lossCounter + " | NumGuesses: " + numGuesses);

	// Update the HTML 
	document.getElementById("guessesLeft").innerHTML= numGuesses;
	document.getElementById("wordblanks").innerHTML = blanksAndSuccesses.join(" "); 
	document.getElementById("wrongGuesses").innerHTML = wrongGuesses.join(" ");

	// success!!!
	if (lettersInChosenWord.toString() == blanksAndSuccesses.toString()) {
		winCounter++; 
		alert("You win!"); 

		
		document.getElementById("winCounter").innerHTML= winCounter;
		startGame(); // restart the game 
	}

	// zero guesses - loser
	else if(numGuesses == 0) {
		lossCounter++; 	 // add to the loss counter 
		alert("You lose"); // give the user an alert

		// Update html
		document.getElementById("lossCounter").innerHTML= lossCounter; 
		startGame(); // restart the game
	}

}


// Starts the Game 
startGame();

document.onkeyup = function(event) {
	letterGuessed = String.fromCharCode(event.keyCode).toLowerCase(); // all lowercase lettesr
	
	checkLetters(letterGuessed); 
	roundComplete(); 
}