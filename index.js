const upBtn = document.getElementById("upBtn")
const dnBtn = document.getElementById("dnBtn")
const ltBtn = document.getElementById("ltBtn")
const rtBtn = document.getElementById("rtBtn")

const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let points = 0
let snakeSpeed = 1000
let speedUp = 100
let speedLimit = 400
let timerId = 0

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
     //create element
    const square = document.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

    // add snake to the grid
currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    //reset array
    currentSnake = [2,1,0]
    //reset points 
    points = 0
    //re add new score to browser
    score.textContent = points
    //reset start direction to move right
    direction = 1
    //new apple
    generateApple()
    //re add the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    //clear timer interval
    clearInterval(timerId)
    //reset snakeSpeed
    snakeSpeed = 1000
    //start snake movement at snakespeed
    timerId = setInterval(move, snakeSpeed)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake') //snake runs into itself
    )
    return clearInterval(timerId) //then stop movement

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    
    //deal with when snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add("snake")
       //grow our snake array
        currentSnake.push(tail)
        //generate new apple
        generateApple()
        //add one to the score
        points++
        //display our score
        score.innerHTML = points
        //speed up our snake, but put a limit on maximum speed at 400ms
        clearInterval(timerId)
        if (snakeSpeed > speedLimit) {
            timerId = setInterval(move, snakeSpeed -= speedUp)
        } else {
            timerId = setInterval(move, speedLimit)
        }
    }
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

//directional control with keyboard arrows
// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {

        direction = 1
    } else if (e.keyCode === 38) {

        direction = -width
    } else if (e.keyCode === 37) {

        direction = -1
    } else if (e.keyCode === 40) {

        direction = +width
    }
}

document.addEventListener('keydown', control) //directional control with keyboard arrows

startButton.addEventListener('click', startGame) //Click the "Start/Restart" button

upBtn.addEventListener("click", function (){      //directional control using onscreen buttons (smartphone or tablet)
direction = -width
}) 
dnBtn.addEventListener("click", function(){
    direction = +width
})
ltBtn.addEventListener("click", function(){
    direction = -1
})
rtBtn.addEventListener("click", function(){
    direction = 1
})
