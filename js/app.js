/*-------------------------------- Constants --------------------------------*/

import pokedex from './data.js'


/*---------------------------- Variables (state) ----------------------------*/

let numOfGuesses
let playerGuess
let targetGuess

/*------------------------ Cached Element References ------------------------*/

const guessesEl = document.querySelectorAll('.guesses')
const submitGuessEl = document.querySelector('#submit-guess')

/*-------------------------------- Functions --------------------------------*/

const checkGuess = () => {
    pokedex.some((pokemon) => {
        return pokemon === playerGuess
    })
}

const showGuess = () => {

    if (playerGuess.toLocalLowerCase() !== targetGuess.name.english.toLocalLowerCase()) {
        if (checkGuess()) {

        }
    } else {
        //player wins
    }

}

const render = () => {
    
    showGuess()
}

const init = () => {
    numOfGuesses = 5
    playerGuess = ''
    targetGuess = pokedex[Math.floor(Math.random() * (pokedex.length - 1))]
    render()
}

const handleClick = () => {

}

/*----------------------------- Event Listeners -----------------------------*/

submitGuessEl.addEventListener('click', handleClick)

init()
console.log(targetGuess.name.english)