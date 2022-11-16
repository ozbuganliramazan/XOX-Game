const X_CLASS = 'cross';
const O_CLASS = 'circle';
const COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [0,3,6],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    
]
const board = document.getElementById('board')
const cells = document.querySelectorAll('.cell')
const result = document.getElementById('result')
const resultText = document.querySelector('.result-text')
const resultButtom = document.getElementById('restartButton')


let turn 


const swapTurn = () => {turn = !turn }
const placeMark = (cell,currentClass) => { cell.classList.add(currentClass)}
const placeHover = () => {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if(turn) board.classList.add(O_CLASS)
    else board.classList.add(X_CLASS)
}

const endGame = (draw) => {
    if(draw) resultText.innerText = 'Beraberlik!'
    else resultText.innerText = `${turn ? 'O' : 'X' } Kazandin!!`


    result.classList.add('show')
}
const isDraw = () => {
    return [...cells].every(cell =>{
        return cell.classList.contains(X_CLASS) ||cell.classList.contains(O_CLASS) 
    })
}

const checkWin = (currentClass) => {
    return COMBINATIONS.some(combination => {
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass)
        })
    })
}

const handeClick = (e) => {
    const cell = e.target
    const currentClass = turn ? O_CLASS : X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
  endGame(false)
    }else if(isDraw()){
        endGame(true)
    } else{
        swapTurn()
        placeHover()
    }
}

const resetGame = () =>{
    cells.forEach(cell =>{
     cell.classList.remove(X_CLASS)
     cell.classList.remove(O_CLASS)   
     cell.removeEventListener('click', handeClick)
     cell.addEventListener('click', handeClick, { once: true})
    })
}



const startGame = () =>{
    turn = false
    resetGame()
    placeHover()
    result.classList.remove('show')
}

startGame()
resultButtom.addEventListener('click', startGame)




