const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
//畫板子
let board = {
    x: 0,
    y: 550,
}
let boardLength = 200;

//偵測左右鍵讓他移動
window.addEventListener("keydown", move);
    function move(event) {
        if (event.key == "ArrowLeft" && board.x != 0){ 
            ctx.clearRect(board.x, board.y, boardLength, 20);
            board.x -= unit;
        }else if (event.key == "ArrowRight" && board.x != canvas.width-boardLength){
            ctx.clearRect(board.x, board.y, boardLength, 20);
            board.x += unit;
        }
        ctx.fillStyle = "lightgreen";   
        ctx.fillRect(board.x, board.y, boardLength, 20);
    }
function drawBoard() { 
        ctx.fillStyle = "lightgreen";
        ctx.fillRect(board.x, board.y, boardLength, 20);
        window.addEventListener("keydown", move);
        
    } 

//製作小球

let newB;
function setUP(){
    let circleUnit = 10 ;
    let circleBlock = (canvas.width -70)/circleUnit
    newB = new Ball(35, 35);
    newB.x = 35 + Math.floor(Math.random() * circleBlock) * circleUnit;
    newB.y = 35;
    if(newB.x > 400 && newB.x < canvas.width){
        newB.xSpeed = -20;
        newB.ySpeed = 20;
    }else{
        newB.xSpeed = 20;
        newB.ySpeed = 20;
    }
}
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
    drawBoard(); 
}

class Ball {
   constructor(x, y){
      this.x = x ;
      this.y = y;
      this.r = 35;
      this.xSpeed = 20;
      this.ySpeed = 20;
   }

    
    move(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        if(this.x - this.r < 0 && this.y - this.r < 0 && this.xSpeed < 0 && this.ySpeed < 0){
            this.xSpeed = -this.xSpeed;//碰到左上角反彈
            this.ySpeed = -this.ySpeed;
        }else if(this.x + this.r > canvas.width && this.y - this.r < 0 && this.xSpeed >0 && this.ySpeed < 0){
            this.xSpeed = -this.xSpeed;
            this.ySpeed = -this.ySpeed; //碰到右上角反彈
        }else if(this.x - this.r < 0 || this.x + this.r > canvas.width){
            this.xSpeed = -this.xSpeed;//碰到左右牆，X變反
        }else if(this.y - this.r < 0 ){
            this.ySpeed = -this.ySpeed;//碰到上牆，y變反
        }else if(this.x >= board.x && this.y + this.r >= board.y && this.x <= board.x+200){
            this.ySpeed = -this.ySpeed;//碰到板子反彈
        }else if(this.y + this.r > board.y && this.x - this.r < 0 ){
            this.xSpeed = -this.xSpeed;//板子與左下牆壁的角反彈
            this.ySpeed = -this.ySpeed;
        }else if(this.x + this.r > canvas.width && this.y + this.r > board.y ){
            this.xSpeed = -this.xSpeed;//板子與右下牆壁的角反彈
            this.ySpeed = -this.ySpeed;
        }if(this.y + this.r >= canvas.height ){
            clearInterval(myGame);
            alert("遊戲結束");//設定遊戲結束
            return;
        }
        }
        
}

    


//製作磚塊
const blockUnit = 50; //磚塊大小
const blockRow = 550/blockUnit;//設定磚塊的分格
const blockColumn = canvas.width/blockUnit;
let allBlocks = [];


class Block{
    constructor(x, y){
        this.blockQuantity = Math.floor(Math.random()*10);
        this.x = Math.floor(Math.random() * blockColumn) * blockUnit;
        this.y = Math.floor(Math.random() * blockRow) * blockUnit;
        //隨機的磚塊數量及座標
    }
    acountOfBlock(){
        let new_blockQuantity = 0;
        while(new_blockQuantity < 3 ){
            new_blockQuantity = Math.floor(Math.random()*10);
        }for( let i = 0; i< new_blockQuantity ; i++)
        {
        let new_x = Math.floor(Math.random() * blockColumn) * blockUnit;
        let new_y = Math.floor(Math.random() * blockRow) * blockUnit;
        let blocks =  new Block(new_x, new_y);
        allBlocks.push(blocks);
        console.log(allBlocks);
        ctx.fillStyle = "blue";
        ctx.fillRect(allBlocks[i].x ,allBlocks[i].y , blockUnit , blockUnit);
    }
    }
}


let myBlock = new Block();
myBlock.acountOfBlock();
setUP();
let myGame = setInterval(draw,100);

function drawAll(){
    //先畫出圓
    ctx.beginPath();
    ctx.arc( newB.x, newB.y, newB.r , 0, Math.PI * 2); 
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.strokeStyle="yellow";
    ctx.stroke();
    
    //判斷圓有沒有碰到方塊
    let touchedBlocks = [];
    for(let i=0 ; i< allBlocks.length; i++ ){
        if(allBlocks[i].x < newB.x +newB.r && 
         newB.x < allBlocks[i].x + 50 &&
         allBlocks[i].y < newB.y + newB.r &&
         newB.y < allBlocks[i].y + 50 ){
            //刪除有碰到的球
            touchedBlocks = allBlocks.splice(i, 1);
            // console.log(touchedBlocks);
            // console.log(allBlocks);
            for(let i=0 ; i< allBlocks.length; i++){
                ctx.fillStyle = "blue";
                ctx.fillRect(allBlocks[i].x ,allBlocks[i].y , blockUnit , blockUnit);
            }
         }else{
            //都沒碰到就照原本繼續畫
            // console.log(allBlocks);
            ctx.fillStyle = "blue";
            ctx.fillRect(allBlocks[i].x ,allBlocks[i].y , blockUnit , blockUnit);
         } 
    }
    //移動圓
    newB.move();
    if(allBlocks.length == 0){
        myBlock.acountOfBlock();
        boardLength -= 40
    }
    if(allBlocks.length == 0 && boardLength == 20){
        clearInterval(myGame);
        alert("恭喜破關");//設定破關
        return;
    }
}

    

