/*-------------------------------- Constants --------------------------------*/

import pokedex from './data.js'


/*---------------------------- Variables (state) ----------------------------*/

let numOfGuesses
let playerGuess
let targetGuess
let previousGuesses

/*------------------------ Cached Element References ------------------------*/

const guessesEl = document.querySelector('.guesses')
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

    const currentGuess = pokedex.filter((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })

    const newGuessEl = document.createElement('ul')
    
    guessesEl.append(newGuessEl)
    
    const guessTypePrimaryField = document.createElement('li')
    newGuessEl.append(guessTypePrimaryField)
    guessTypePrimaryField.textContent = `Primary: ${currentGuess[0].type[0]}`

    if (currentGuess[0].type.length < 2) {
        currentGuess[0].type.push('None')
    }

    const guessTypeSecondaryField = document.createElement('li')
    newGuessEl.append(guessTypeSecondaryField)
    guessTypeSecondaryField.textContent = `Secondary: ${currentGuess[0].type[1]}` 


    Object.keys(currentGuess[0].base).forEach((stat) => {
        const guessStatField = document.createElement('li')
        newGuessEl.append(guessStatField)
        guessStatField.textContent = `${stat}: ${currentGuess[0].base[stat]}`
    })

    const baseStatTotal = Object.values(currentGuess[0].base).reduce((acc, currentValue) => acc + currentValue, 0)
    
    const guessBaseStatTotal = document.createElement('li')
    newGuessEl.append(guessBaseStatTotal)
    guessBaseStatTotal.textContent = `Base Stat Total: ${baseStatTotal}`
}

const render = () => {
    updateMessage()
}

const init = () => {
    numOfGuesses = 5
    previousGuesses = []
    playerGuess = 'charmander'
    targetGuess = pokedex[Math.floor(Math.random() * (pokedex.length - 1))]
    render()
}

const handleClick = () => {
    console.log(targetGuess.type, numOfGuesses, checkGuess())
    if (numOfGuesses === 0) {
        //player loses, reveal target pokemon
        return

    } else if (playerGuess.toLocaleLowerCase() !== targetGuess.name.english.toLocaleLowerCase()) {
        console.log('this works')
        if (checkGuess()) {
            console.log('here')
            addPreviousGuess()
            numOfGuesses--
            updateGuesses()
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
