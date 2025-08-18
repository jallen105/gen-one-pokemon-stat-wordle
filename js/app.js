/*-------------------------------- Constants --------------------------------*/

import pokedex from './data.js'


/*---------------------------- Variables (state) ----------------------------*/

let numOfGuesses
let playerGuess
let targetGuess
let previousGuesses

/*------------------------ Cached Element References ------------------------*/

const guessesEl = document.querySelectorAll('.guesses')
const submitGuessEl = document.querySelector('#submit-guess')

/*-------------------------------- Functions --------------------------------*/

const checkGuess = () => {
    return pokedex.some((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })
}

const addPreviousGuess = () => {
    const guess = pokedex.filter((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })

    previousGuesses.push(guess)
}

const updateMessage = () => {

}

const updateGuesses = () => {
    
}

const render = () => {
    updateMessage()
}

const init = () => {
    numOfGuesses = 5
    previousGuesses = []
    playerGuess = 'bulbasaur'
    targetGuess = pokedex[Math.floor(Math.random() * (pokedex.length - 1))]
    render()
}

const handleClick = () => {
    console.log(targetGuess.name.english, numOfGuesses, checkGuess())
    if (numOfGuesses === 0) {
        //player loses
        return

    } else if (playerGuess.toLocaleLowerCase() !== targetGuess.name.english.toLocaleLowerCase()) {
        console.log('this works')
        if (checkGuess()) {
            console.log('here')
            addPreviousGuess()
            numOfGuesses--
            console.log(checkGuess(), numOfGuesses)
            console.log(previousGuesses)
        } else {
            return
        }
    } else {
        //player wins
    }

}

/*----------------------------- Event Listeners -----------------------------*/

submitGuessEl.addEventListener('click', handleClick)

init()
