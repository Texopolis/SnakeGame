
const grid= document.querySelector(".grid")
const startButton= document.querySelector("#start")
const scoreDisplay= document.querySelector("#score")
//const appleObject= document.querySelector(".apple")
let squares= []
let currentSnake = [3,2,1,0]
let direction = 1
const width=16
let appleIndex=0
let score=0
let intervalTime=500
let speed = .66
let timerID=0


function createGrid(){
    for(let i=0; i<width*width; i++){
        const square= document.createElement("div")
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add("snake"))

function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove("snake"))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerID)
    currentSnake = [3,2,1,0]
    score=0
    scoreDisplay.textContent = score
    direction=1
    intervalTime=500
    currentSnake.forEach(index => squares[index].classList.add("snake"))
    generateApples()
    document.querySelector("body").classList.remove("crash")
    timerID= setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width)||
        (currentSnake[0] - width <=0 && direction === -width)||
        ((currentSnake[0] % width) === 0 && direction === -1)||
        ((currentSnake[0] % width) === width-1 && direction ===1)||
        squares[currentSnake[0] + direction].classList.contains("snake")
        )         
        {
        crashFlash()
        return clearInterval(timerID)
        }
     else{    
    const tail= currentSnake.pop()
    squares[tail].classList.remove("snake")
    currentSnake.unshift(currentSnake[0]+direction)
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[appleIndex].classList.remove("apple")
        currentSnake.push(currentSnake.length + 1)
        console.log(currentSnake)
        generateApples()
        score ++
        scoreDisplay.textContent=score
        clearInterval(timerID)
        intervalTime=intervalTime * speed 
        timerID = setInterval(move, intervalTime)
    }

    squares[currentSnake[0]].classList.add("snake")
}
}



function generateApples(){
     do{ appleIndex= Math.floor(Math.random()*squares.length)
     }while (squares[appleIndex].classList.contains("snake"))
     squares[appleIndex].classList.add("apple")
     console.log(appleIndex)
 }


function control(e){
    if( e.keyCode === 39){
        console.log("right")
        direction=1
    }else if (e.keyCode === 38){
        console.log("up")
        direction = -width
    }else if (e.keyCode === 37){
        console.log("left")
        direction=-1
    }else if (e.keyCode ===40){
        console.log("down")
        direction = +width
    }
}

function crashFlash(){
    currentSnake.forEach(index => squares[index].classList.add("crash"))
    document.querySelector("body").classList.add("crash")

}

startButton.addEventListener("click", startGame)
document.addEventListener("keydown", control)

