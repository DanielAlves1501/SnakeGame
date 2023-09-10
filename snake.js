const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

class SnakePart {
    constructor (x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLenght = 2

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("./assets/gulp.mp3");

//Game Loop
function drawGame(){
    
    changeSnakePosition();
    let result = isGameOver();

    if(result){
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple()
    drawSnake();
    drawScore();

    if(score > 2){
        speed = 11    
    }

    if(score > 5){
        speed = 15
    }


    setTimeout(drawGame, 1000/speed)

}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false
    }

    //Walls

    if(headX < 0){
        gameOver = true;
    } else if(headX === tileCount){
        gameOver = true
    } else if(headY < 0){
        gameOver = true
    } else if(headY === tileCount){
        gameOver = true
    }

    for (let i = 0; i <snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font = "50px Verdana";

        var gradient = ctx.createLinearGradient(0,0,canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0","red");
        //Fill with gradient

        ctx.fillStyle = gradient;

        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2)
    }

    return gameOver
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText("Score " + score, canvas.width - 50, 20)
}
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.clientWidth, canvas.height)
}

function drawSnake(){

    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length > tailLenght){
        snakeParts.shift()
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(headX *tileCount, headY * tileCount,tileSize, tileSize)
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount,appleY * tileCount,tileSize,tileSize)
}

function checkAppleCollision(){
    if (appleX === headX & appleY === headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        score++;
        tailLenght++;
        gulpSound.play();
    }
}


document.body.addEventListener('keydown',keyDown);

function keyDown(e){
    // Up
    if(e.keyCode == 38){
        if(yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0
    }

    //Down
    if(e.keyCode == 40){
        if(yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0
    }

    //Left 
    if(e.keyCode == 37){
        if(xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //Right 
    if(e.keyCode == 39){
        if(xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}


drawGame()