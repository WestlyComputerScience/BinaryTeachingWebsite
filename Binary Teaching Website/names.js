//----------------------------------Binary to Name Game!----------------------------------

const howManyCharactersInput = document.getElementById("howManyCharactersInput"); //Grabs data from input from user.
const answerDisplay = document.getElementById("answerDisplay"); //grabs the document's answer dsiplay div.

resetGame(); //Resets the game when you reload the browser. 

/**
 * Taking input from how many characters the user wants. It creates a range from 1-24 inputs.
 */
function createInputs()
{
    let value = parseInt(howManyCharactersInput.value, 10); //10 is the radix, standard decimal system we use today

    const inputsContainer = document.getElementById("inputsForName");
    inputsContainer.innerHTML = ""; // Clears previous inputs
    if(value < 25 && value > 0) //Stops user from inputing incorrect inputs
    {
        for(let i = 0; i < value; i++)
        {
            const newInput = document.createElement("input"); //creates new input
            newInput.classList.add("inputsForName"); //adds css styling to new input
            document.getElementById("inputsForName").appendChild(newInput); //adds input to the div element
        }
    }
}

/**
 * Outputs the solution the user entered after checking they inserted binary values. 
 */
function checkSolution()
{
    if(checkValidity())
    {
        answerDisplay.textContent = "" + getStringAnswer();
    }
}

/**
 * Checks the binary strings the user inputs into the game and returns the result.
 * 
 * @returns the character from the binary code the user inserted.
 */
function getStringAnswer()
{
    let inputs = document.querySelectorAll("#inputsForName input");
    let result = "";
    for (let input of inputs) //Can't do for each, return values on callback affect it!
    {
        let guess = input.value + "";
        let binaryNum = parseInt(guess, 2); //radix 2 for binary number (method is turning guess string into binary number string)
        let guessCharacter = String.fromCharCode(binaryNum); //converts the binary code into a character
        result += guessCharacter; //adds it to final result string
    }
    console.log(result);
    return result; //returns combination of characters
}

/**
 * Checks the validity of the user inputs. Makes sure they only inputted binary values that reference the ASCII table.
 * 
 * @returns true or false if the user entered the correct input.
 */
function checkValidity() //checks if there's inputs
{
    let value = parseInt(howManyCharactersInput.value, 10); 
    if(value == 0 || isNaN(value))
    {
        answerDisplay.textContent = "Please enter how long your name/word is! 😡";
        return false;
    }
    else
    {
        let inputs = document.querySelectorAll("#inputsForName input");
        for (let input of inputs) //Can't do for each, return values on callback affect it!
        {
            let guess = input.value + "";
            if(guess.length == 0)
            {
                answerDisplay.textContent = "Please fill out all fields with binary numbers! 🥺";
                return false;
            }
            else if(guess.length > 8)
            {
                answerDisplay.textContent = "Please fill out all fields with binary numbers less than 9 characters! 🥺";
                return false;
            }
            else
            {
                for (let i = 0; i < guess.length; i++)
                {
                    if (guess.charAt(i) != '0' && guess.charAt(i) != '1')
                    {
                        answerDisplay.textContent = "Please enter a binary number! DO NOT include: spaces, characters other than 0 or 1, and symbols! 😡";
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

/**
 * Resets the game. Clears all input elements that had been added and resets all display fields.
 */
function resetGame() //resets elements for the game
{
    const inputsContainer = document.getElementById("inputsForName");
    inputsContainer.innerHTML = ""; // Clears previous inputs

    howManyCharactersInput.value = "";
    answerDisplay.textContent = "";
}
