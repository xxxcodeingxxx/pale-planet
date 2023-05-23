// Javascript lives here....
console.log('Connected!!!!')
const head = $('#Head')
const body = $('#Torso')
const armL = $('#LArm')
const armR = $('#RArm')
const legL = $('#LLeg')
const legR = $('#RLeg')

function hangIt() {
    let hangMan = [head, body, armL, armR, legL, legR]
    let usedParts = []
    let parts = hangMan[Math.floor(Math.random() * hangMan.length)]
    usedParts.join(parts)

    console.log(usedParts)
}

const words = [
    'HELLO',
    'WORLD',
    'JAVASCRIPT',
    'COMPUTER',
    'PROGRAMMING',
    'ELEPHANT',
    'BANANA',
    'TIGER',
    'LION',
    'PYTHON',
]
// Word to be guessed
let word = words[Math.floor(Math.random() * words.length)].toLowerCase()

// Array to store correct guesses
const correctGuesses = []

// Array to store incorrect guesses
const incorrectGuesses = []

// DOM elements
const wordElement = document.getElementById('word')
const guessesElement = document.getElementById('guesses')
const letterInput = document.getElementById('letter-input')
const guessButton = document.getElementById('guess-btn')

// Initialize game
function initializeGame() {
    // Display underscores for each letter in the word
    wordElement.textContent = '_'.repeat(word.length)

    // Add event listener to the guess button
    guessButton.addEventListener('click', makeGuess)

    // Add event listener to the letter input field
    letterInput.addEventListener('input', handleLetterInput)
}

// Handle letter input changes
function handleLetterInput() {
    const letter = letterInput.value.toLowerCase()
    letterInput.value = letter

    // Enable the guess button if a single letter is entered
    guessButton.disabled = letter.length !== 1
}

// Make a guess
function makeGuess() {
    const letter = letterInput.value.toLowerCase()
    letterInput.value = ''

    // Check if the letter has already been guessed
    if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
        alert('You already guessed that letter!')
        return
    }

    // Check if the letter is correct
    if (word.includes(letter)) {
        correctGuesses.push(letter)
        updateWord()
        checkGameStatus()
    } else {
        incorrectGuesses.push(letter)
        updateGuesses()
        checkGameStatus()
        hangIt()
    }
}

// Update the word display
function updateWord() {
    let displayedWord = ''

    for (let i = 0; i < word.length; i++) {
        const letter = word[i]

        if (correctGuesses.includes(letter)) {
            displayedWord += letter
        } else {
            displayedWord += '_'
        }
    }

    wordElement.textContent = displayedWord
}

// Update incorrect guesses

function updateGuesses() {
    guessesElement.textContent = incorrectGuesses.join(', ')
}

// Check game status
function checkGameStatus() {
    // Check if the player has won
    if (!wordElement.textContent.includes('_')) {
        endGame(true)
        return
    }

    // Check if the player has lost
    if (incorrectGuesses.length === 6) {
        endGame(false)
        return
    }
}

// End the game
function endGame(hasWon) {
    guessButton.disabled = true
    letterInput.disabled = true

    if (hasWon) {
        alert('Congratulations! You guessed the word correctly!')
    } else {
        alert('Game over! You ran out of guesses. The word was: ' + word)
    }
}

// Initialize the game
initializeGame()
