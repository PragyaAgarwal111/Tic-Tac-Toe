//html elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
console.log(statusDiv);
console.log(resetDiv);
console.log(cellDivs);
//game constants
const xSymbol='x'; /*here we can add any symbol that we are using from external sorces and want that as output*/
const oSymbol='o';

//game variables
let gameIsLive = true;
let xIsNext = true;
//let winner=null;

//functions

const letterToSymbol=(letter) => letter=='x'? xSymbol : oSymbol;
const handleWin=(letter)=>{
    gameIsLive=false;
    //winner=letter;
    if(letter=='x'){
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won! `; }
        else{
            statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won! </span> `;
        }

};

const checkGamesStatus = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];
    //is there a winner
    if (topLeft && topLeft == topMiddle && topLeft == topRight) {
       handleWin(topLeft);
        /*gameIsLive=false;
        winner=topLeft;
        if(topLeft=='x'){
        statusDiv.innerHTML = `${letterToSymbol(topLeft)} has won! `}
        else{
            statusDiv.innerHTML = `<span>${letterToSymbol(topLeft)} has won! </span> `
        }*/
        //console.log(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    }
    else if(middleLeft && middleLeft==middleMiddle && middleLeft==middleRight)
    {
        handleWin(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
        
    }
    else if(bottomLeft && bottomLeft==bottomMiddle && bottomLeft==bottomRight)
    {
        handleWin(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
       
    }
    else if(topLeft && topLeft==middleLeft && topLeft==bottomLeft)
    {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
       
    }
    else if(topMiddle && topMiddle==middleMiddle && topMiddle==bottomMiddle)
    {
        handleWin(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
     
    }
    else if(topRight && topRight==middleRight  && topRight==bottomRight)
    {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
        
    }
    else if(topLeft && topLeft==middleMiddle && topLeft==bottomRight)
    {
        handleWin(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if(topRight && topRight==middleMiddle && topRight==bottomLeft)
    {
        handleWin(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if(topLeft&&topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle&& bottomRight){
        gameIsLive=false;
        statusDiv.innerHTML='Game is tied!';
    }
    else{
        xIsNext=!xIsNext;
        if(xIsNext){
            statusDiv.innerHTML=`${xSymbol} is next`;
        }
        else{
            statusDiv.innerHTML=`<span>${oSymbol} is next</span>`;

        }
    }
    

};

    //event handlers
    const handleReset = (e) => {
        xIsNext=true;
        
        statusDiv.innerHTML=`${xSymbol} is next`;
        //winner=null;
        for(const cellDiv of cellDivs)
        {
            cellDiv.classList.remove('x');
            cellDiv.classList.remove('o');
            cellDiv.classList.remove('won');
        }
        gameIsLive=true;
    };
    const handleCellClick = (e) => {
        //console.log(e)
        //console.log(e.target.classList);
        //let location=e.target.classList[1];
        //console.log("location",location);
        const classList = e.target.classList;
       // const location = classList[1];


        //console.log("location",location);
        if (!gameIsLive||classList[1] == 'x' || classList[1] == 'o') {
            return;
        }
        if (xIsNext) {
            classList.add('x');
            checkGamesStatus();
            //xIsNext = !xIsNext;
        }
        else {
            classList.add('o');
            checkGamesStatus();
            //xIsNext = !xIsNext;
        }
    };





    //event listeners
    resetDiv.addEventListener(`click`, handleReset);
    for (const cellDiv of cellDivs) {
        cellDiv.addEventListener(`click`, handleCellClick);
    }
