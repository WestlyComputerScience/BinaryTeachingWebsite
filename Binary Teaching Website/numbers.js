//--------------------------------------Variables and Constants--------------------------------------

//Constants from DOM
//Note: some constants are interchangable between games!
const practiceNumberGameDisplay = document.getElementById("practiceNumberGameDisplay"); //Grabs the random number display.
const practiceNumberGameOutput = document.getElementById("practiceNumberGameOutput"); //grabs the output for it's text content.
const scoreP = document.getElementById("scoreP"); //grabs the score for it's text content.
const scoreBinaryP = document.getElementById("scoreBinaryP"); //grabs the score for the binary game for it's text content.
const playerInput = document.getElementById("playerRandomBitGuess"); //grabs the input from the players guess for game 1.
const playerInputBinary = document.getElementById("playerRandomBitGuessBinary"); //grabs the input from the players guess for game 2.

//Updating variables
let solution = 0; //stored value used when checking score.
let randomBitSequence = ""; //stored value when generating random value for game 1
let randomNumber = 0; //stored value when generating random value for game 2
let score = 0; //stored value to keep track of score
let whichBitDidYouChoose = 0; //Helps the program calculate the score (1 for 4bit, 2 for 6bit, and 5 for 8bit).
let whichRandomDidYouChoose = 0; //Helps the program calculate the score (1 for 1-15, 2 for 16-63, and 5 for 64-127).

unlockSubmit(); //initial functions when page opens
openTab1(); //opens game 1 when page opens
unlockSubmitBinary(); //unlocks the submit button when game opens

//--------------------------------------Binary to Number Practice Game (game 1)--------------------------------------

/**
 * Generates and outputs a random binary string composed of 4 bits.
 */
function random4Bit()
{
    let str = "";
    for(let i = 0; i < 4; i++) //generates a 4 bit binary number with a for loop
    {
        str += Math.floor(Math.random() * 2); //gets values between 0 and 1
    }
    randomBitSequence = str;
    practiceNumberGameDisplay.style.fontSize = "5rem"; //changes font size for better readability
    practiceNumberGameDisplay.textContent = str + ""; //displays it to the output div
    whichBitDidYouChoose = 4;
    playerInput.value = ""; //resets text field
    unlockSubmit(); //allows user to submit solution
}

/**
 * Generates and outputs a random binary string composed of 6 bits.
 */
function random6Bit()
{
    let str = "";
    for(let i = 0; i < 6; i++) //generates a 6 bit binary number with a for loop
    {
        str += Math.floor(Math.random() * 2); //gets values between 0 and 1
    }
    randomBitSequence = str;
    practiceNumberGameDisplay.style.fontSize = "5rem"; //changes font size for better readability
    practiceNumberGameDisplay.textContent = str + ""; //displays it to the output div
    whichBitDidYouChoose = 6;
    playerInput.value = ""; //resets text field
    unlockSubmit(); //allows user to submit solution
}

/**
 * Generates and outputs a random binary string composed of 8 bits.
 */
function random8Bit()
{
    let str = "";
    for(let i = 0; i < 8; i++) //generates a 8 bit binary number with a for loop
    {
        str += Math.floor(Math.random() * 2); //gets values between 0 and 1
    }
    randomBitSequence = str;
    practiceNumberGameDisplay.style.fontSize = "5rem"; //changes font size for better readability
    practiceNumberGameDisplay.textContent = str + ""; //displays it to the output div
    whichBitDidYouChoose = 8;
    playerInput.value = ""; //resets text field
    unlockSubmit(); //allows user to submit solution
}

/**
 * Calculates the solution from the randomly generated binary string.
 */
function calculateSolution() //used to calculate a solution from randomly generated bit sequence
{
    let k = 1;
    solution = 0;
    for(let i = randomBitSequence.length - 1; i >= 0; i--) //iterates the bit sequence right to left
    {
         if(randomBitSequence.charAt(i) === '1')
         {
            solution += k; //adds powers of 2 for each on switch
         }
         k = k * 2;
    }
}

/**
 * Check's if the solution from the randomly generated bit sequence is the same as the player's answer.
 */
function checkSolution() //used to check if the player got it correct;
{
    let guess = Number(playerInput.value);
    calculateSolution(); //updates the solution
    if(guess == solution)
    {
        calculateScore(); //adds up your score
        practiceNumberGameOutput.textContent = `😎 Correct!`;
        scoreP.textContent = `${score}`;
        lockSubmit();
    }
    else
    {
        practiceNumberGameOutput.textContent = `😭 Incorrect! Solution:${solution}`;
        scoreP.textContent = `${score}`;
        lockSubmit();
    }
}

/**
 * Locks the submit button after submitting an answer.
 */
function lockSubmit() //makes the user choose the random option after hitting submit (no multiple answers)
{
    const submitButton = document.getElementById("practiceNumberGameSubmitButton");
    submitButton.disabled = true;

    submitButton.classList.add("no-hover"); //disables effects for button
    submitButton.classList.add("no-active");
}

/**
 * Unlocks the submit button after generating a new question.
 */
function unlockSubmit() //re-activates the button for the user
{
    const submitButton = document.getElementById("practiceNumberGameSubmitButton");
    submitButton.disabled = false;

    submitButton.classList.remove("no-hover"); //enables effects for button
    submitButton.classList.remove("no-active");
}

/**
 * Calculates the score using a boolean system from the randomBit methods.
 */
function calculateScore() //calculates the score (1 for 4bit, 2 for 6bit, 5 for 8bit)
{
    if(whichBitDidYouChoose == 4)
    {
        score += 1;
    }
    else if(whichBitDidYouChoose == 6)
    {
        score += 2;
    }
    else //you chose 8
    {
        score += 5;
    }
}

/**
 * Checks if the user is entering a valid answer. Is it a binary number? Did they enter something?
 * 
 * @returns nothing. Just short circuts if the user entered something invalid.
 */
function checkAnswer()
{
    let guess = playerInput.value; //Use .value for getting input elements
    let binaryNum = practiceNumberGameDisplay.textContent;
    if(binaryNum === "Pick a random number!")
    {
        practiceNumberGameOutput.textContent = "Please select a random bit number before guessing! 😡";
    }
    else
    {
        let guess1 = Number(guess);
        if(isNaN(guess1))
        {
            practiceNumberGameOutput.textContent = "Please enter a number! No spaces, letters, or other special characters allowed! 😡";
            return;
        }
        else
        {
            checkSolution();
        }
    }
}

//----------------------------------Used to tab between different games----------------------------------

/**
 * Opens game 1 for the user to play.
 */
function openTab1()
{
    const tab1 = document.getElementsByClassName("practiceGame");
    const tab2 = document.getElementsByClassName("practiceGame2");

    practiceNumberGameDisplay.textContent = "Pick a random number!"; //resets the text and font
    practiceNumberGameDisplay.style.fontSize = "3rem";

    for(let i = 0; i < tab2.length; i++) //hides the previous game
    {
        tab2[i].style.display = "none";
    }

    for(let i = 0; i < tab1.length; i++) //sets current game visible
    {
        tab1[i].style.display = "block";
    }

    score = 0; //used when switching games
}

/**
 * Opens game 2 for the user to play.
 */
function openTab2()
{
    const tab1 = document.getElementsByClassName("practiceGame");
    const tab2 = document.getElementsByClassName("practiceGame2");

    practiceNumberGameDisplayBinary.textContent = "Pick a random number!"; //resets the text and font
    practiceNumberGameDisplayBinary.style.fontSize = "3rem";

    for(let i = 0; i < tab1.length; i++) //hides the previous game
    {
        tab1[i].style.display = "none";
    }

    for(let i = 0; i < tab2.length; i++) //sets current game visible
    {
        tab2[i].style.display = "block";
    }

    score = 0; //used when switching games
}

//----------------------------------Number to Binary Practice Game (game 2)----------------------------------

/**
 * Generates and outputs a random number from 1-15.
 */
function random1to15()
{
    let randNum = Math.floor(Math.random() * 16); //gets values between 0 to 15
    randomNumber = randNum; //updates global

    practiceNumberGameDisplayBinary.style.fontSize = "5rem"; //changes font size for better readability
    practiceNumberGameDisplayBinary.textContent = randNum + ""; //displays it to the output div
    whichRandomDidYouChoose = 1;
    playerInputBinary.value = ""; //resets text field
    unlockSubmitBinary(); //allows user to submit solution
}

/**
 * Generates and outputs a random number from 16-63.
 */
function random16to63()
{
    let randNum = Math.floor((Math.random() * 48) + 16); //gets values between 16 to 63
    randomNumber = randNum; //updates global

    practiceNumberGameDisplayBinary.style.fontSize = "5rem"; //changes font size for better readability
    practiceNumberGameDisplayBinary.textContent = randNum + ""; //displays it to the output div
    whichRandomDidYouChoose = 2;
    playerInputBinary.value = ""; //resets text field
    unlockSubmitBinary(); //allows user to submit solution
}

/**
 * Generates and outputs a random number from 64-127.
 */
function random64to127()
{
    let randNum = Math.floor((Math.random() * 64) + 64); //gets values between 64 to 127
    randomNumber = randNum; //updates global

    practiceNumberGameDisplayBinary.style.fontSize = "5rem"; //changes font size for better readability
    practiceNumberGameDisplayBinary.textContent = randNum + ""; //displays it to the output div
    whichRandomDidYouChoose = 3;
    playerInputBinary.value = ""; //resets text field
    unlockSubmitBinary(); //allows user to submit solution
}

/**
 * Calculates the score with boolean values from random number methods.
 */
function calculateScoreBinary() //calculates the score (1 for 1-15, 2 for 16-63, and 5 for 64-127)
{
    if(whichRandomDidYouChoose == 1)
    {
        score += 1;
    }
    else if(whichRandomDidYouChoose == 2)
    {
        score += 2;
    }
    else //you chose 64 to 127
    {
        score += 5;
    }
}

/**
 * Checks to see if your solution matches the answer. It then adds up your score, outputs it, and locks the submit button.
 * 
 * @param {string} guess - the binary string represent the user's solution to the problem.
 */
function checkSolutionBinary(guess) //used to calculate a solution from randomly generated number
{
    let binaryString = randomNumber.toString(2); //converts random number into a binary number
    solution = binaryString;
    if(guess == solution)
    {
        calculateScoreBinary(); //adds up your score
        practiceNumberGameOutputBinary.textContent = `😎 Correct!`;
        scoreBinaryP.textContent = `${score}`;
        lockSubmitBinary();
    }
    else
    {
        practiceNumberGameOutputBinary.textContent = `😭 Incorrect! Solution:${solution}`;
        scoreBinaryP.textContent = `${score}`;
        lockSubmitBinary();
    }
}

/**
 * Locks the submit button.
 */
function lockSubmitBinary() //makes the user choose the random option after hitting submit (no multiple answers)
{
    const submitButton = document.getElementById("practiceNumberGameSubmitButtonBinary");
    submitButton.disabled = true;

    submitButton.classList.add("no-hover"); //disables effects for button
    submitButton.classList.add("no-active");
}

/**
 * Unlocks the submit button.
 */
function unlockSubmitBinary() //re-activates the button for the user
{
    const submitButton = document.getElementById("practiceNumberGameSubmitButtonBinary");
    submitButton.disabled = false;

    submitButton.classList.remove("no-hover"); //enables effects for button
    submitButton.classList.remove("no-active");
}

/**
 * Checks to make sure that the answer put into the input is valid (binary solution).
 * 
 * @returns nothing. Just short circuts the method if solution is invalid.
 */
function checkAnswerBinary()
{
    let guess = playerRandomBitGuessBinary.value; //Use .value for getting input elements
    let binaryNum = practiceNumberGameDisplayBinary.textContent;
    if(binaryNum === "Pick a random number!")
    {
        practiceNumberGameOutputBinary.textContent = "Please select a random number range before guessing! 😡";
    }
    else
    {
        for(let i = 0; i < guess.length; i++) //checks if the guess is valid
        {
            if(guess.charAt(i) != '0' && guess.charAt(i) != '1')
            {
                practiceNumberGameOutputBinary.textContent = "Please enter a binary number! DO NOT include: spaces, characters other than 0 or 1, and symbols! 😡";
                return;
            }
        }
        checkSolutionBinary(guess);
    }
}
