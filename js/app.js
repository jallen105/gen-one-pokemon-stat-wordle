/*-------------------------------- Constants --------------------------------*/

import pokedex from './data.js'


/*---------------------------- Variables (state) ----------------------------*/

let numOfGuesses
let playerGuess
let targetGuess
let previousGuesses
let win
let light
let orange
let red
let green

/*------------------------ Cached Element References ------------------------*/

const guessesEl = document.querySelector('.guesses')
const submitGuessEl = document.querySelector('#submit-guess')
const guessTrackerEl = document.querySelector('.guess-tracker')
const playerGuessEl = document.querySelector('#player-guess')
const messageEl = document.querySelector('.message')
const dropDownList = document.createElement('datalist')
const resetBtnEl = document.querySelector('#reset')
const btnEls = document.querySelectorAll('button')
const lightBtnEl = document.querySelector('#light-mode')



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

const checkWin = () => {

    if (playerGuess.toLocaleLowerCase() === targetGuess.name.english.toLocaleLowerCase()) {
        messageEl.textContent = `It was ${targetGuess.name.english}!`
        win = true  
    } else if (numOfGuesses === 0) {
        messageEl.textContent = `You ran out of guesses! ${targetGuess.name.english} was the Pokémon.`
        updateGuesses(targetGuess.name.english)
    }

}

const updateGuessTracker = () => {

    guessTrackerEl.textContent = `Remaining Guesses ${numOfGuesses}`

}

const compareBaseStatValue = (guessValue, targetValue, element) => {

    if (guessValue === targetValue) {
        element.textContent = `${guessValue}`
        element.classList.add(green)
    } else if (guessValue > targetValue) {
        element.textContent = `${guessValue} \u2193`
    } else {
        element.textContent = `${guessValue} \u2191`
    }

}

const compareTypings = (playerGuess, element, idx) => {

   if (playerGuess.type[idx] === targetGuess.type[idx]) {
        element.classList.add(green)
    } else if (targetGuess.type.some((elementType) => elementType === playerGuess.type[idx])) {
        element.classList.add(orange)
    } else {
        element.classList.add(red)
    }
    
}

const updateGuesses = (guess) => {

    guessesEl.removeAttribute('hidden')
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
    guessImageEl.setAttribute('alt', `${currentGuess.name.english}`)
    
    if (currentGuess.type.length < 2) {
        currentGuess.type.push('None')
    }
    if (targetGuess.type.length < 2) {
        targetGuess.type.push('None')
    }

    const guessTypePrimaryEl = document.createElement('li')
    newGuessEl.append(guessTypePrimaryEl)
    compareTypings(currentGuess, guessTypePrimaryEl, 0)
    guessTypePrimaryEl.textContent = `${currentGuess.type[0]}`

    const guessTypeSecondaryEl = document.createElement('li')
    newGuessEl.append(guessTypeSecondaryEl)
    compareTypings(currentGuess, guessTypeSecondaryEl, 1)
    guessTypeSecondaryEl.textContent = `${currentGuess.type[1]}` 


    Object.keys(currentGuess.base).forEach((stat) => {
        const guessStatField = document.createElement('li')
        newGuessEl.append(guessStatField)
        compareBaseStatValue(currentGuess.base[stat], targetGuess.base[stat], guessStatField)
        
    })

    const guessBaseStatTotal = Object.values(currentGuess.base).reduce((acc, currentValue) => acc + currentValue, 0)
    const targeBaseStatTotal = Object.values(targetGuess.base).reduce((acc, currentValue) => acc + currentValue, 0)

    const guessBaseStatTotalEl = document.createElement('li')

    newGuessEl.append(guessBaseStatTotalEl)
    compareBaseStatValue(guessBaseStatTotal, targeBaseStatTotal, guessBaseStatTotalEl)

}

const init = () => {

    light = false

    green = 'green-dark'
    orange = 'orange-dark'
    red = 'red-dark'
    guessesEl.setAttribute('hidden', '')
    win = false
    numOfGuesses = 7
    previousGuesses = []
    playerGuess = playerGuessEl.value
    targetGuess = pokedex[Math.floor(Math.random() * (pokedex.length - 1))]

    messageEl.textContent = `Whose that Pokémon!`
    guessTrackerEl.textContent = `Remaining Guesses: ${numOfGuesses}`

}

const resetGame = () => {
    document.querySelectorAll('.previous-guess').forEach((guess) => {
        guess.remove()
    })
    init()
}

const handleClick = () => {
    
    playerGuess = playerGuessEl.value
     
    if (win) {
        
        return

    } else if (checkGuess() && !checkPreviousGuesses() && numOfGuesses > 0) {
        
        numOfGuesses--
        messageEl.textContent = `You guessed ${playerGuess}`
        render()


    } else if (checkPreviousGuesses() && numOfGuesses > 0) {

        messageEl.textContent = `${playerGuess} has already been guessed.`
        return

    } else {

        return

    }

    playerGuessEl.value = ''

}

const handleLightClick = () => {
    !light ? light = true : light = false
    const allColoredEls = document.querySelectorAll('span, li')
    
    if (light) {
        lightBtnEl.textContent = 'Dark'
        green = 'green-light'
        red = 'red-light'
        orange = 'orange-light'
        document.body.style.color = '#1E000E'
        document.body.style.backgroundColor = '#F4F7BE'
        btnEls.forEach((btn) => btn.classList.replace('btn-dark', 'btn-light'))
        allColoredEls.forEach((element) => {
            if (element.classList.contains('green-dark')) {
                element.classList.replace('green-dark', 'green-light')
            } else if (element.classList.contains('orange-dark')) {
                element.classList.replace('orange-dark', 'orange-light')
            } else if (element.classList.contains('red-dark')) {
                element.classList.replace('red-dark', 'red-light')
            }
        })
    } else {
        lightBtnEl.textContent = 'Light'
        green = 'green-dark'
        red = 'red-dark'
        orange = 'orange-dark'
        document.body.style.color = '#F4F7BE'
        document.body.style.backgroundColor = '#1E000E'
        btnEls.forEach((btn) => btn.classList.replace('btn-light', 'btn-dark'))
        allColoredEls.forEach((element) => {
            if (element.classList.contains('green-light')) {
                element.classList.replace('green-light', 'green-dark')
            } else if (element.classList.contains('orange-light')) {
                element.classList.replace('orange-light', 'orange-dark')
            } else if (element.classList.contains('red-light')) {
                element.classList.replace('red-light', 'red-dark')
            }
        })
}

}

const pokeList = () => {

playerGuessEl.setAttribute('list', 'pokedex')
dropDownList.setAttribute('id', 'pokedex')
document.body.append(dropDownList)

pokedex.forEach((pokemon) => {

    const dropDownOption = document.createElement('option')
    dropDownList.append(dropDownOption)
    dropDownOption.setAttribute('value', `${pokemon.name.english}`)

})

}

const render = () => {
    addPreviousGuess()
    updateGuessTracker()
    updateGuesses(playerGuess)
    checkWin()
}

/*----------------------------- Event Listeners -----------------------------*/

submitGuessEl.addEventListener('click', handleClick)
resetBtnEl.addEventListener('click', resetGame)
lightBtnEl.addEventListener('click', handleLightClick)

init()
pokeList()

