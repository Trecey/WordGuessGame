
const numberOfTries = 11;

var lettersGuessed = [];
var index;
var wordGuessed = [];
var optionsLeft = 0;
var hasFinished = false;
var totalWins = [];
var playAgain = "Press Any Key to Try Again!"
// Game sounds
var keyPressSound = new Audio("assets/sounds/Abule.mp3");
var winSound = new Audio("assets/sounds/cheering.wav")
var lossSound = new Audio("assets/sounds/empire.mp4")
// Events
document.onkeydown = function (event) {
    //
    if (hasFinished) {
        gameReset();
        hasFinished = false;
    } else {
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            keyPressSound.play();
            makeGuess(event.key.toUpperCase());
            updateDisplay();
            checkStatusWin();
            checkStatusLoss();
        }
    }
}
// 
function checkStatusWin() {
    if (wordGuessed.indexOf("_") === -1) {
        totalWins++;
        keyPressSound.pause();
        keyPressSound.currentTime = 0;
        winSound.play();
        document.getElementById("Image").src = "assets/images/win.jpg";
        document.getElementById("Image").innerText = playAgain;
        hasFinished = true;
    }
}
// Check Loss
function checkStatusLoss() {
    if (optionsLeft <= 0) {
        keyPressSound.pause();
        keyPressSound.currentTime = 0;
        lossSound.play();
        //document.getElementById("hangmanImage").src="assets/images/gameover.png";
        document.getElementById("Image").src = "assets/images/FAIL.jpg";
        document.getElementById("Image").innerText = playAgain;
        hasFinished = true;
    }
}
//  Updates the display on the HTML Page
function updateDisplay() {
    //***********************************************************************/
    // Let's start by grabbing a reference to the <span> below.
    var userText = document.getElementById("user-text");

    // Next, we give JavaScript a function to execute when onkeyup event fires.
    document.onkeyup = function (event) {
        userText.textContent = event.key;
    };
    //***********************************************************************/
    document.getElementById("totalWins").innerText = totalWins;

    // Display how much of the word we've already guessed on screen.
    // Printing the array would add commas (,) - so we concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }
    //
    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesRemain").innerText = optionsLeft;
    document.getElementById("lettersGuessed").innerText = lettersGuessed;

};



function updateImages() {

    document.getElementById("Image").src = "assets/images/" + ((numberOfTries - optionsLeft) + ".jpg");
};

function gameReset() {
    optionsLeft = numberOfTries;

    index = Math.floor(Math.random() * (proposedWords.length));


    lettersGuessed = [];
    wordGuessed = [];


    for (var i = 0; i < proposedWords[index].length; i++) {
        wordGuessed.push("_");
    }


    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameoverImage").style.cssText = "display: none";
    document.getElementById("winImage").style.cssText = "display: none";
}
function evaluateGuess(letter) {

    var positions = [];


    for (var i = 0; i < proposedWords[index].length; i++) {
        if (proposedWords[index][i] === letter) {
            positions.push(i);
        }
    }
    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        optionsLeft--;
        updateImages();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};
function makeGuess(letter) {
    if (optionsLeft > 0) {
        //
        if (lettersGuessed.indexOf(letter) === -1) {
            lettersGuessed.push(letter);
            evaluateGuess(letter);
        }
    }
};
var proposedWords =
    [
        "PRECIOUS",
        "JUSTICE",
        "TRECEY",
        "PROGRAMMER",
        "PROJECT",
        "OPTIMISTIC",
        "RELENTLESS",
        "ACHIEVER",
        "EMPOWERMENT",
        "EXCESSIVE",
        "UNCONDITIONAL",
        "CREATIVE",
        "SARCASTIC",
        "EQUALITY",
        "UNBELIEVABLE"
    ];