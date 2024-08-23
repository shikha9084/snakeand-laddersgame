// Game constants & Variables
let inputDir = {x: 0, y: 0};
console.log("js running..");
//const foodsound = new Audio('C:\Users\Shikha AGRAWAL\Downloads\3-egg-shaker-rolls-32718.mp3');
const gameOverSound = new Audio('C:\Users\ShikhaAGRAWAL\Downloads\pow-90398.mp3');
const moveSound = new Audio('C:\Users\ShikhaAGRAWAL\Downloads\snake-pit-74085.mp3');
const musicSound = new Audio('C:\Users\ShikhaAGRAWAL\Downloads\chocalho-53806.mp3');
let speed = 5;
let score = 0;
let lastPainttime = 0;
let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 3, y: 4};

// Game Functions
function main(ctime) {
    console.log("Running...")
    window.requestAnimationFrame(main);
    //console.log(ctime) 
    if((ctime - lastPainttime)/800 < 1/speed) {
        return;
    }
    lastPainttime = ctime;
    gameEngine(); 
}
function isCollide(snake) {
    // if you bump into yourself
    for (let i = 1; i< snakeArr.length; i++) {
        //if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y <= 0) {

            return true;
        }
    }

   // if you bump into the wall 
   //if(snake[0].x >= 18 || snake[0].x <=0 && snake[0].y <=0){
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y <= 0 || snake[0].y >= 18) {
        return true;
    }
}
    
function gameEngine(){
    // Part1: updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x:0, y:0};
        alert("Game over. Press any key to play again!");
        snakeArr = [{x:13, y:15}];
        musicSound.play();
        score = 0;
    }

    // if you have eaten the food , increment the score and regenerate the food    
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        //foodSound.play();
        score += 1;
        
         
        scoreBox.innerHTML = "Score: "+ score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake 
     for (let i = snakeArr.length -2; i>=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]}; 
     }
     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;
    // Part2: Display the snake and food
    const board = document.querySelector('#board');
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

gameEngine();
// main logic starts here

window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    inputDir = {x:0 , y:1} //Start the game
    moveSound.play();
    // console.log(e);
    switch (e.key) {
        
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
        break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
        break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
        break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
        break;
        default:
            break;
    }
});
