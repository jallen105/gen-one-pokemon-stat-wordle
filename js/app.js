/*-------------------------------- Constants --------------------------------*/

import pokedex from './data.js'


/*---------------------------- Variables (state) ----------------------------*/

let numOfGuesses
let playerGuess
let targetGuess
let previousGuesses
let higherOrLower

/*------------------------ Cached Element References ------------------------*/

const guessesEl = document.querySelector('.guesses')
const submitGuessEl = document.querySelector('#submit-guess')
const guessTrackerEl = document.querySelector('.guess-tracker')
const playerGuessEl = document.querySelector('#player-guess')

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

const udpateGuessTracker = () => {
    
}

const compareBaseStatValue = (stat, guessValue, targetValue, element) => {
    if (guessValue === targetValue) {
            element.textContent = `${stat}: ${guessValue}`
            element.style.backgroundColor = 'green'
        } else if (guessValue > targetValue) {
            element.textContent = `${stat}: ${guessValue} \u2193`
        } else {
            element.textContent = `${stat}: ${guessValue} \u2191`
        }
}

const compareTypings = (playerGuess, element, idx) => {
   if (playerGuess.type[idx] !== targetGuess.type[idx]) {
        element.style.backgroundColor = 'red'
    } else {
        element.style.backgroundColor = 'green'
    }
    
}

const updateGuesses = () => {

    const currentGuess = pokedex.find((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })

    const newGuessEl = document.createElement('ul')
    newGuessEl.setAttribute('class', 'previous-guess')
    
    guessesEl.append(newGuessEl)

    const guessNameEl = document.createElement('li')
    newGuessEl.append(guessNameEl)
    guessNameEl.textContent = currentGuess.name.english
    
    const guessTypePrimaryEl = document.createElement('li')
    newGuessEl.append(guessTypePrimaryEl)
    compareTypings(currentGuess, guessTypePrimaryEl, 0)
    guessTypePrimaryEl.textContent = `Primary: ${currentGuess.type[0]}`

    if (currentGuess.type.length < 2) {
        currentGuess.type.push('None')
    }
    if (targetGuess.type.length < 2) {
        targetGuess.type.push('None')
    }

    const guessTypeSecondaryEl = document.createElement('li')
    newGuessEl.append(guessTypeSecondaryEl)
    compareTypings(currentGuess, guessTypeSecondaryEl, 1)
    guessTypeSecondaryEl.textContent = `Secondary: ${currentGuess.type[1]}` 


    Object.keys(currentGuess.base).forEach((stat) => {
        const guessStatField = document.createElement('li')
        newGuessEl.append(guessStatField)
        compareBaseStatValue(stat, currentGuess.base[stat], targetGuess.base[stat], guessStatField)
        
    })

    const guessBaseStatTotal = Object.values(currentGuess.base).reduce((acc, currentValue) => acc + currentValue, 0)
    const targeBaseStatTotal = Object.values(targetGuess.base).reduce((acc, currentValue) => acc + currentValue, 0)

    const guessBaseStatTotalEl = document.createElement('li')
    newGuessEl.append(guessBaseStatTotalEl)
    compareBaseStatValue('Base Stat Total', guessBaseStatTotal, targeBaseStatTotal, guessBaseStatTotalEl)
}

const render = () => {
    updateMessage()
}

const init = () => {
    numOfGuesses = 5
    higherOrLower = ''
    previousGuesses = []
    playerGuess = playerGuessEl.value
    targetGuess = pokedex[Math.floor(Math.random() * (pokedex.length - 1))]
    guessTrackerEl.textContent = `Remaining Guesses ${numOfGuesses}`
    render()
}

const handleClick = () => {
    console.log(targetGuess, numOfGuesses, checkGuess())
    playerGuess = playerGuessEl.value
    if (numOfGuesses === 0) {
        //player loses, reveal target pokemon
        return

    } else if (playerGuess.toLocaleLowerCase() !== targetGuess.name.english.toLocaleLowerCase()) {
        console.log('this works')
        if (checkGuess()) {
            targetGuess = pokedex[34]
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
        updateGuesses()
    }

}

/*----------------------------- Event Listeners -----------------------------*/

submitGuessEl.addEventListener('click', handleClick)

init()

    //   Clefairy
    //   "HP": 70,
    //   "Attack": 45,
    //   "Defense": 48,
    //   "Sp. Attack": 60,
    //   "Sp. Defense": 65,
    //   "Speed": 35

    //       "HP": 39,
    //   "Attack": 52,
    //   "Defense": 43,
    //   "Sp. Attack": 60,
    //   "Sp. Defense": 50,
    //   "Speed": 65