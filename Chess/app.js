const gameBoard = document.querySelector('#gameBoard')
const playerDisplay = document.querySelector('#players')
const infoDisplay = document.querySelector('#info-display')
const Ldiscard = document.querySelector('#Ldiscard')

const dwidth = 2
const width = 8
let playerGo = 'black'
playerDisplay.textContent = "black's"
let x = document.getElementById("capture");
let y = document.getElementById("place");
let z = document.getElementById("fanfare");

/*
const queenconfirm = document.querySelector('#qb')
const bishopconfirm = document.querySelector('#bb')
const rookconfirm = document.querySelector('#rb')
const knightconfirm = document.querySelector('#kb')
*/
//const confirm = document.querySelector('.confirm')
const qclick = document.getElementById("qb")
qclick.addEventListener("click", qcFun)

const bclick = document.getElementById("bb")
bclick.addEventListener("click", bcFun)

const rclick = document.getElementById("rb")
rclick.addEventListener("click", rcFun)

const kclick = document.getElementById("kb")
kclick.addEventListener("click", kcFun)

//const cancel = document.querySelector('.cancel')
/*
const promise = new Promise((resolve) => {
    queenconfirm.addEventListener('click', resolve)
    bishopconfirm.addEventListener('click', resolve)
    rookconfirm.addEventListener('click', resolve)
    knightconfirm.addEventListener('click', resolve)
})
*/


const startPieces = [
    rook, knight, bishop, queen, king ,bishop ,knight ,rook,
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn,pawn,pawn,pawn,pawn,pawn,pawn,pawn,
    rook, knight, bishop, queen, king ,bishop ,knight ,rook
]

document.getElementById("promotion-display").innerHTML = "Queen Is Selected";
var next = 'queen';

function createBoard(){

    startPieces.forEach((startPieces, index) => {
        const square = document.createElement('div')
        square.classList.add('square')
        square.setAttribute('square-id', index)
        square.innerHTML = startPieces

        square.firstChild?.setAttribute('draggable', true)
        //square.classList.add('col1')
        const row = Math.floor((63-index)/width)+1
        if (row % 2 == 0) {
            square.classList.add(index % 2 == 0 ? "col1" : "col2")
        }else{
            square.classList.add(index % 2 == 0 ? "col2" : "col1")
        }

        if (index <= 15){
            square.firstChild.firstChild.classList.add('black')
        }

        if (index >= 48){
            square.firstChild.firstChild.classList.add('white')

        }
        square.setAttribute('row', row)
        gameBoard.append(square)

    })
}
createBoard()

const edge = [0,7,8,15,16,23,24,31,32,39,40,47,48,55,56,63]
const Ledge = [0,8,16,24,32,40,48,56]
const Redge = [7,15,23,31,39,47,55,63]
const endline = [56,57,58,59,60,61,62,63]

const allSquares = document.querySelectorAll("#gameBoard .square")
let startPositionRow
//function dragEvent




allSquares.forEach(square => {
    square.addEventListener('dragstart',dragStart)
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop',dragDrop)
})

let startPosId
let draggedElement

function dragStart (event) {
    startPosId = event.target.parentNode.getAttribute("square-id")
    startPositionRow = event.target.parentNode.getAttribute('row')
    draggedElement = event.target
}

function dragOver (e) {
   e.preventDefault()
    //console.log(event.currentTarget.dataset.square-id)
}

/*
function dragDrop (e) {
    e.stopPropagation()

    e.target.parentNode.append(draggedElement)
    e.target.remove()
}

square.firstChild.firstChild.classList.add('black')
*/
const sqaure2 = (event.target)

function changeCondition(){
    const startId = Number(startPosId)
    const targetId = Number((event.target).getAttribute("square-id"))|| Number((event.target).parentNode.getAttribute("square-id"))
    if ((endline).includes(targetId) && draggedElement.id === 'pawn'){
        return true

    }
    else{
        return false
    }
}



function playcapture() {
    x.play();
}
function playplace() {
    y.play();
}
function playfan() {
    z.play();
}

/*
document.querySelector('#qb').click(() => next = 'queen')
document.querySelector('#bb').click(() => next = 'bishop')
document.querySelector('#rb').click(() => next = 'rook')
document.querySelector('#kb').click(() => next = 'knight')*/



function qcFun() {
    console.log("queen clicked");
    document.getElementById("promotion-display").innerHTML = "Queen Is Selected";
    next = 'queen'
}

function bcFun() {
    console.log("bishop clicked");
    document.getElementById("promotion-display").innerHTML = "Bishop Is Selected";
    next = 'bishop'
}


function rcFun() {
    console.log("rook clicked");
    document.getElementById("promotion-display").innerHTML = "Rook Is Selected";
    next = 'rook'
}


function kcFun() {
    console.log("knight clicked");
    document.getElementById("promotion-display").innerHTML = "Knight Is Selected";
    next = 'knight'
}


/*
const element = document.getElementById("qb");
element.addEventListener("click", function() {
    document.getElementById("promotion-display").innerHTML = "Queen Is Selected";
});
*/

function pawnqueen(){
    const startId = Number(startPosId)
    const targetId = Number((event.target).getAttribute("square-id"))//|| Number((event.target).parentNode.getAttribute("square-id"))
    const piece = draggedElement.id
    document.querySelector(`[square-id  = "${targetId}"]`).innerHTML=(queen)
    document.querySelector(`[square-id  = "${targetId}"]`).firstChild?.setAttribute('draggable', true)
    draggedElement.remove()
    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)

}


function pawnrook(){
    const startId = Number(startPosId)
    const targetId = Number((event.target).getAttribute("square-id"))|| Number((event.target).parentNode.getAttribute("square-id"))
    const piece = draggedElement.id
    event.target.innerHTML=(rook)
    event.target.firstChild?.setAttribute('draggable', true)
    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
    draggedElement.remove()
}


function pawnbishop(){
    const startId = Number(startPosId)
    const targetId = Number((event.target).getAttribute("square-id"))|| Number((event.target).parentNode.getAttribute("square-id"))
    const piece = draggedElement.id
    event.target.innerHTML=(bishop)
    event.target.firstChild?.setAttribute('draggable', true)
    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
    draggedElement.remove()
}


function pawnknight(){
    const startId = Number(startPosId)
    const targetId = Number((event.target).getAttribute("square-id"))|| Number((event.target).parentNode.getAttribute("square-id"))
    const piece = draggedElement.id
    event.target.innerHTML=(knight)
    event.target.firstChild?.setAttribute('draggable', true)
    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
    draggedElement.remove()
}


/*






function onConfirm () {
    console.log('confirmed')
}

function onCancel () {
    app.innerHTML = 'Cancel!'
}

async function waitClick () {
    return await promise
        .then((v) => {
            onConfirm()
            window.console.log(v)
        })
}
*/


function dragDrop (event) {
    event.stopPropagation()
    console.log(playerGo)
    const targetId = Number((event.target).getAttribute("square-id"))|| Number((event.target).parentNode.getAttribute("square-id"))
    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = event.target.classList.contains('piece')
    const valid = ifValid(event.target )
    const opponentGo = playerGo === 'black' ? 'white' : 'black'
    const takenByOpponent = event.target.firstChild?.classList.contains(opponentGo)

    if (correctGo) {

        if (takenByOpponent && valid) {


            if (changeCondition() === true){
                event.target.remove()
                if (next === 'queen'){
                    console.log(event.target)

                    document.querySelector(`[square-id  = "${targetId}"]`).innerHTML=(queen)
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild?.setAttribute('draggable', true)
                    draggedElement.remove()
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
                }
                else if (next === 'bishop'){
                    document.querySelector(`[square-id  = "${targetId}"]`).innerHTML=(bishop)
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild?.setAttribute('draggable', true)
                    draggedElement.remove()
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
                }
                else if (next === 'rook'){
                    document.querySelector(`[square-id  = "${targetId}"]`).innerHTML=(rook)
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild?.setAttribute('draggable', true)
                    draggedElement.remove()
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
                }
                else if (next === 'knight'){
                    document.querySelector(`[square-id  = "${targetId}"]`).innerHTML=(knight)
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild?.setAttribute('draggable', true)
                    draggedElement.remove()
                    document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
                }
                console.log(`queen`)
                playcapture()
                changePlayer()

                return
            }
            else{

                playcapture()
                event.target.parentNode.append(draggedElement)
                event.target.remove()
                changePlayer()
                return
                }

        }

        //  event.target.parentNode.append(draggedElement)
        //  event.target.remove()
        if (taken && !takenByOpponent) {
            infoDisplay.textContent = 'You cannot move your piece there'
            setTimeout(() => infoDisplay.textContent = '', 2000)
            return

        }
        if (valid) {
            const startId = Number(startPosId)
            const targetId = Number((event.target).getAttribute("square-id"))|| Number((event.target).parentNode.getAttribute("square-id"))
            const piece = draggedElement.id
            console.log('start position',startId)
            console.log('target position',targetId)
            console.log('piece name',draggedElement.id)
            console.log('piece id',draggedElement)
            console.log(changeCondition())
            console.log ('next =',next)
            playplace()

            if (changeCondition() === true){
                //event.target.innerHTML=(queen)
                //event.target.firstChild?.setAttribute('draggable', true)
                //document.querySelector(`[square-id  = "${targetId}"]`).firstChild.firstChild.classList.add(playerGo)
                //draggedElement.remove()

                //here add await
                //document.querySelector('#qb').click(() => next = 'queen')
                //document.querySelector('#bb').click(() => next = 'bishop')
                //document.querySelector('#rb').click(() => next = 'rook')
                //document.querySelector('#kb').click(() => next = 'knight')
                /*
                                waitClick()
                                    .then(() => {
                                        next = 'queen'
                                    })
                */

                if (next === 'queen'){
                    pawnqueen()
                }
                else if (next === 'bishop'){
                    pawnbishop()
                }
                else if (next === 'rook'){
                    pawnrook()
                }
                else if (next === 'knight'){
                    pawnknight()
                }
                //document.getElementById("qb").addEventListener("click", pawnqueen);


                console.log(`queen`)
                changePlayer()

                return
            }

            else{
                event.target.append(draggedElement)
                changePlayer()
                return
            }


        }
        else{

            infoDisplay.textContent = `Invalid move`
            setTimeout(() => infoDisplay.textContent = '', 2000)

            return
            }


    }
}

function RoValid(startRow,targetRow){
    if (
    (startRow === targetRow)||(0 === targetRow)){
        return true
    }
    else{
        return false
    }

}



function ifValid(target){
    const targetId = Number(target.getAttribute("square-id"))|| Number(target.parentNode.getAttribute("square-id"))
    console.log (targetId)
    const startId = Number(startPosId)
    const targetRow = Number(target.getAttribute('row'))
    const startRow = Number(startPositionRow)
    const piece = draggedElement.id
    console.log (startId)
    console.log(piece, 'is the piece ')
    console.log(draggedElement.firstChild.classList)


    switch (piece){
        case 'pawn':
            const PstartRow = [8,9,10,11,12,13,14,15]
            if (
                startId + width  === targetId && document.querySelector(`[square-id  = "${startId + width}"]`).firstChild
            ){
                return false
            }
            else if (
                PstartRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width  === targetId ||
                startId + width -1 === targetId && document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild ||
                startId + width +1 === targetId && document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild
            ) {
                return true
            }
            break;
            case 'knight':
                if(
                    startId + width *2 - 1 === targetId && Ledge.includes(startId) === false||
                    startId + width *2 + 1 === targetId && Redge.includes(startId) === false||
                    startId + width - 2 === targetId && Ledge.includes(startId) === false||
                    startId + width + 2 === targetId && Redge.includes(startId) === false||
                    startId - width *2 - 1 === targetId && Ledge.includes(startId) === false||
                    startId - width *2 + 1 === targetId && Redge.includes(startId) === false||
                    startId - width - 2 === targetId && Ledge.includes(startId) === false||
                    startId - width + 2 === targetId && Redge.includes(startId) === false
                ) {
                    return true
                }
                break;
            case 'bishop':
                if (
                    startId + width + 1 === targetId && Redge.includes(startId) === false||
                    startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && Redge.includes(startId) === false||
                    startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && Redge.includes(startId) === false||
                    startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && Redge.includes(startId) === false||
                    startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *4+ 4}"]`).firstChild && Redge.includes(startId) === false||
                    startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && Redge.includes(startId) === false||
                    startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *6+ 6}"]`).firstChild && Redge.includes(startId) === false||
                   //---
                    startId - width - 1 === targetId && Ledge.includes(startId) === false||
                    startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && Ledge.includes(startId) === false||
                    startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && Ledge.includes(startId) === false||
                    startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && Ledge.includes(startId) === false||
                    startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4- 4}"]`).firstChild && Ledge.includes(startId) === false||
                    startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4- 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *5- 5}"]`).firstChild && Ledge.includes(startId) === false||
                    startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4- 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *5- 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *6- 6}"]`).firstChild && Ledge.includes(startId) === false||

                    startId - width + 1 === targetId && Redge.includes(startId) === false||
                    startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && Redge.includes(startId) === false||
                    startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2+ 2}"]`).firstChild && Redge.includes(startId) === false||
                    startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && Redge.includes(startId) === false||
                    startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4+ 4}"]`).firstChild && Redge.includes(startId) === false||
                    startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && Redge.includes(startId) === false||
                    startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *6+ 6}"]`).firstChild && Redge.includes(startId) === false||

                    startId + width - 1 === targetId && Ledge.includes(startId) === false||
                    startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && Ledge.includes(startId) === false||
                    startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && Ledge.includes(startId) === false||
                    startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && Ledge.includes(startId) === false||
                    startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4 - 4}"]`).firstChild && Ledge.includes(startId) === false||
                    startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5 - 5}"]`).firstChild && Ledge.includes(startId) === false||
                    startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5  - 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 6 - 6}"]`).firstChild && Ledge.includes(startId) === false

                ) {
                    return true
                }
                break;
            case 'rook':
                if (
                    startId + width === targetId ||
                    startId + width * 2 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild ||
                    startId + width * 3 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild||
                    startId + width * 4 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild||
                    startId + width * 5 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4}"]`).firstChild||
                    startId + width * 6 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5}"]`).firstChild||
                    startId + width * 7 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 6}"]`).firstChild||


                    startId - width === targetId ||
                    startId - width * 2 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild ||
                    startId - width * 3 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild||
                    startId - width * 4 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild||
                    startId - width * 5 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 4}"]`).firstChild||
                    startId - width * 6 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 5}"]`).firstChild||
                    startId - width * 7 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 6}"]`).firstChild||

                    startId + 1 === targetId && RoValid(startRow,targetRow) === true||
                    startId + 2  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild  && RoValid(startRow,targetRow) === true||
                    startId + 3  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId + 4  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId + 5  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 4 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId + 6  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 5 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId + 7  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 5 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 5 }"]`).firstChild && RoValid(startRow,targetRow) === true||

                    startId - 1 === targetId && RoValid(startRow,targetRow) === true ||
                    startId - 2  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && RoValid(startRow,targetRow) === true ||
                    startId - 3  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId - 4  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId - 5  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 4 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId - 6  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 5 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                    startId - 7  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 5 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 5 }"]`).firstChild && RoValid(startRow,targetRow) === true


            ) {
                    return true
                }
                break;
        case 'queen':
            if(
                startId + width + 1 === targetId && Redge.includes(startId) === false||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && Redge.includes(startId) === false||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && Redge.includes(startId) === false||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && Redge.includes(startId) === false||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *4+ 4}"]`).firstChild && Redge.includes(startId) === false||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && Redge.includes(startId) === false||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id  = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *6+ 6}"]`).firstChild && Redge.includes(startId) === false||
                //---
                startId - width - 1 === targetId && Ledge.includes(startId) === false||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && Ledge.includes(startId) === false||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && Ledge.includes(startId) === false||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && Ledge.includes(startId) === false||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4- 4}"]`).firstChild && Ledge.includes(startId) === false||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4- 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *5- 5}"]`).firstChild && Ledge.includes(startId) === false||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id  = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2- 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3- 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4- 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *5- 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *6- 6}"]`).firstChild && Ledge.includes(startId) === false||

                startId - width + 1 === targetId && Redge.includes(startId) === false||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && Redge.includes(startId) === false||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2+ 2}"]`).firstChild && Redge.includes(startId) === false||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && Redge.includes(startId) === false||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *2+ 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4+ 4}"]`).firstChild && Redge.includes(startId) === false||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && Redge.includes(startId) === false||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id  = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *3+ 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *4+ 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width *5+ 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width *6+ 6}"]`).firstChild && Redge.includes(startId) === false||

                startId + width - 1 === targetId && Ledge.includes(startId) === false||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && Ledge.includes(startId) === false||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && Ledge.includes(startId) === false||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && Ledge.includes(startId) === false||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4 - 4}"]`).firstChild && Ledge.includes(startId) === false||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5 - 5}"]`).firstChild && Ledge.includes(startId) === false||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id  = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5  - 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 6 - 6}"]`).firstChild && Ledge.includes(startId) === false||

                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild||
                startId + width * 4 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild||
                startId + width * 5 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4}"]`).firstChild||
                startId + width * 6 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5}"]`).firstChild||
                startId + width * 7 === targetId && !document.querySelector(`[square-id  = "${startId + width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + width * 6}"]`).firstChild||


                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild||
                startId - width * 4 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild||
                startId - width * 5 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 4}"]`).firstChild||
                startId - width * 6 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 5}"]`).firstChild||
                startId - width * 7 === targetId && !document.querySelector(`[square-id  = "${startId - width}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - width * 6}"]`).firstChild||

                startId + 1 === targetId && RoValid(startRow,targetRow) === true||
                startId + 2  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild  && RoValid(startRow,targetRow) === true||
                startId + 3  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId + 4  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId + 5  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 4 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId + 6  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 5 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId + 7  === targetId && !document.querySelector(`[square-id  = "${startId + 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 5 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId + 5 }"]`).firstChild && RoValid(startRow,targetRow) === true||

                startId - 1 === targetId && RoValid(startRow,targetRow) === true ||
                startId - 2  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && RoValid(startRow,targetRow) === true ||
                startId - 3  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId - 4  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId - 5  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 4 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId - 6  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 5 }"]`).firstChild && RoValid(startRow,targetRow) === true||
                startId - 7  === targetId && !document.querySelector(`[square-id  = "${startId - 1}"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 2 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 3 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 4 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 5 }"]`).firstChild && !document.querySelector(`[square-id  = "${startId - 5 }"]`).firstChild && RoValid(startRow,targetRow) === true

            ){
                return true
            }
        case 'king':
            if(
                startId + 1=== targetId && RoValid(startRow,targetRow) === true ||
                startId - 1=== targetId && RoValid(startRow,targetRow) === true ||
                startId + width === targetId||
                startId + width + 1=== targetId && Redge.includes(startId) === false||
                startId + width - 1=== targetId && Ledge.includes(startId) === false||
                startId - width + 1=== targetId && Redge.includes(startId) === false||
                startId - width - 1=== targetId && Ledge.includes(startId) === false||
                startId - width === targetId
            ){
                console.log('on the same row = ',(targetRow === startRow))
                console.log('rovalid is',RoValid(startRow,targetRow))
                console.log(startRow,targetRow)
                return true

            }

    }
}




function changePlayer() {
    if (playerGo === "black"){
        reverseIds()
        checkForWin()
        playerGo = 'white'
        playerDisplay.textContent = "white's"
    } else {
        revertIds()
        checkForWin()
        playerGo = 'black'
        playerDisplay.textContent = "black's"
    }
}
function reverseIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, index) =>
        square.setAttribute('square-id', (width * width - 1)- index))
}

function revertIds(){
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, index) => square.setAttribute('square-id', index))
}

function checkForWin(){
    const both_kings = Array.from(document.querySelectorAll("#king"));
    console.log(both_kings)


    if(both_kings.length === 1)
    {
        playfan()
        let winner = both_kings[0].firstChild.className;
        console.log("winner ",winner.baseVal);
        infoDisplay.textContent = `${winner.baseVal} wins`
        window.setTimeout(again,10000)
    }

}

function again(){
    location.reload()
}


console.log(event)
