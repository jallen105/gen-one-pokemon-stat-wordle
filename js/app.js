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
const guessTrackerEl = document.querySelector('.guess-tracker')
const playerGuessEl = document.querySelector('#player-guess')
const messageEl = document.querySelector('.message')
const dropDownList = document.createElement('datalist')

/*-------------------------------- Functions --------------------------------*/

const checkGuess = () => {
    return pokedex.some((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })


}

const checkPreviousGuesses = () => {
    return previousGuesses.some((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })
}

const addPreviousGuess = () => {
    const guess = pokedex.filter((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === playerGuess.toLocaleLowerCase()
    })
    
    previousGuesses = [...guess]
}

const updateMessage = () => {

    if (numOfGuesses === 0) {
        messageEl.textContent = `You ran out of guesses! ${targetGuess.name.english} was the Pokémon.`
        updateGuesses(targetGuess.name.english)
    } else if (playerGuess.toLocaleLowerCase() === targetGuess.name.english.toLocaleLowerCase()) {
        console.log('first')
        messageEl.textContent = `${targetGuess.name.english} was right!`
    }

}

const updateGuessTracker = () => {
    guessTrackerEl.textContent = `Remaining Guesses ${numOfGuesses}`
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

const updateGuesses = (guess) => {

    const currentGuess = pokedex.find((pokemon) => {
        return pokemon.name.english.toLocaleLowerCase() === guess.toLocaleLowerCase()
    })

    const newGuessEl = document.createElement('ul')
    newGuessEl.setAttribute('class', 'previous-guess')
    
    guessesEl.append(newGuessEl)

    const guessPokemonEl = document.createElement('li')
    newGuessEl.append(guessPokemonEl)
    const guessImageEl = document.createElement('img')
    guessPokemonEl.append(guessImageEl)
    guessImageEl.setAttribute('src', `${currentGuess.image.sprite}`)
    
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

const init = () => {
    numOfGuesses = 5
    previousGuesses = []
    playerGuess = playerGuessEl.value
    targetGuess = pokedex[Math.floor(Math.random() * (pokedex.length - 1))]
    messageEl.textContent = `Whose that Pokémon!`
    guessTrackerEl.textContent = `Remaining Guesses ${numOfGuesses}`
}

const handleClick = () => {
    
    // click submit check guess then num of guesses
    numOfGuesses--
    playerGuess = playerGuessEl.value
    console.log(playerGuess, targetGuess)
    if (numOfGuesses === 0) {
        updateGuesses(playerGuess)
        updateMessage()
        updateGuessTracker()
        return

    } else if (playerGuess.toLocaleLowerCase() === targetGuess.name.english.toLocaleLowerCase() && !checkPreviousGuesses() && numOfGuesses > 0) {
        updateGuesses(playerGuess)
        addPreviousGuess()
        updateMessage()
        updateGuessTracker()
        console.log('win')
    } else if (playerGuess.toLocaleLowerCase() !== targetGuess.name.english.toLocaleLowerCase() && numOfGuesses > 0) {
        
        if (checkGuess() && !checkPreviousGuesses()) {
            
            console.log('here')
            addPreviousGuess()
            updateGuessTracker()
            updateGuesses(playerGuess)
        } else {
            return
        }
    }
    playerGuessEl.value = ''

}

/*----------------------------- Event Listeners -----------------------------*/

submitGuessEl.addEventListener('click', handleClick)

playerGuessEl.setAttribute('list', 'pokedex')
dropDownList.setAttribute('id', 'pokedex')
document.body.append(dropDownList)

pokedex.forEach((pokemon) => {

    const dropDownOption = document.createElement('option')
    dropDownList.append(dropDownOption)
    dropDownOption.setAttribute('value', `${pokemon.name.english}`)


})

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