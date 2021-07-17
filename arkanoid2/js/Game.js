// import {Paddle} from "./Paddle.js";
// import {Ball} from "./Ball.js";
// import {GameOver} from "./GameOver.js";
// import {bricks} from "./BrickLayout.js";
// import {Brick} from "./Brick.js";
// import {BaseBox} from "./BaseBox.js";
let level=0;
let scores;
let life;
 class Game {
    
    
    
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isRunning = false;
    }

    audio(){
        var audio = new Audio('ting.mp3');
        audio.play();
    }


    start() {
        this.background = new BaseBox({
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            width: this.canvas.width,
            height: this.canvas.height,
            color: 'rgba(0,0,0,0.75)'
        });
        this.bricksCollection = [];
        
        
       
        bricks.forEach((brickLayout, index) => {
            for(let r=0; r < brickLayout.rows;r++) {
                for(let c=0; c < brickLayout.columns; c++) {
                    const brick = new Brick({
                        x: brickLayout.x + (c * (brickLayout.width + brickLayout.padding)),
                        y: brickLayout.y + (r * (brickLayout.height + brickLayout.padding)),
                        width: brickLayout.width,
                        height: brickLayout.height,
                        color: brickLayout.color,
                        score: brickLayout.score
                    });
                    
                    this.bricksCollection.push(brick);
                }
            }
        });
        


    
   
        this.paddle = new Paddle({
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 100,
            height: 15,
            color: 'yellow',
            maxXBound: this.canvas.width
        });
        this.ball = new Ball({
            x: this.canvas.width / 2,
            y: this.canvas.height - 70,
            radius: 10,
            bounds: {
                left: 0,
                top:0,
                right: this.canvas.width,
                bottom:this.canvas.height
            }
        });
        this.level=1;
        this.gameOver = new GameOver(this.canvas);
        this.gameWin = new GameWin(this.canvas);
        this.score = 0;
        this.lives = 3;
        this.life=this.lives;
        this.scores=this.score;
    }




    level2() {
        this.background = new BaseBox({
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            width: this.canvas.width,
            height: this.canvas.height,
            color: 'rgba(0,0,0,0.75)'
        });
        this.bricksCollection = [];
        
        
        bricks2.forEach((brickLayout, index) => {
            for(let r=0; r < brickLayout.rows;r++) {
                for(let c=0; c < brickLayout.columns; c++) {
                    const brick = new Brick({
                        x: brickLayout.x + (c * (brickLayout.width + brickLayout.padding)),
                        y: brickLayout.y + (r * (brickLayout.height + brickLayout.padding)),
                        width: brickLayout.width,
                        height: brickLayout.height,
                        color: brickLayout.color,
                        score: brickLayout.score
                    });
                    
                    this.bricksCollection.push(brick);
                }
            }
        });

        this.paddle = new Paddle({
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 100,
            height: 20,
            color: 'yellow',
            maxXBound: this.canvas.width
        });
        this.ball = new Ball({
            x: this.canvas.width / 2,
            y: this.canvas.height - 70,
            radius: 10,
            bounds: {
                left: 0,
                top:0,
                right: this.canvas.width,
                bottom:this.canvas.height
            }
        });
        this.level=2;
        this.gameOver = new GameOver(this.canvas);
        this.gameWin = new GameWin(this.canvas);
        this.score = 0;
        this.lives = 3;
    }



    level3() {
        this.background = new BaseBox({
            x: this.canvas.width/2,
            y: this.canvas.height/2,
            width: this.canvas.width,
            height: this.canvas.height,
            color: 'rgba(0,0,0,0.75)'
        });
        this.bricksCollection = [];
        
        
    
        bricks3.forEach((brickLayout, index) => {
            for(let r=0; r < brickLayout.rows;r++) {
                for(let c=0; c < brickLayout.columns; c++) {
                    const brick = new Brick({
                        x: brickLayout.x + (c * (brickLayout.width + brickLayout.padding)),
                        y: brickLayout.y + (r * (brickLayout.height + brickLayout.padding)),
                        width: brickLayout.width,
                        height: brickLayout.height,
                        color: brickLayout.color,
                        score: brickLayout.score
                    });
                    
                    this.bricksCollection.push(brick);
                }
            }
        });

        this.paddle = new Paddle({
            x: this.canvas.width / 2,
            y: this.canvas.height - 50,
            width: 100,
            height: 20,
            color: 'yellow',
            maxXBound: this.canvas.width
        });
        this.ball = new Ball({
            x: this.canvas.width / 2,
            y: this.canvas.height - 70,
            radius: 10,
            bounds: {
                left: 0,
                top:0,
                right: this.canvas.width,
                bottom:this.canvas.height
            }
        });
        this.level=3;
        this.gameOver = new GameOver(this.canvas);
        this.gameWin = new GameWin(this.canvas);
        this.score = 0;
        this.lives = 3;
    }



    reset() {
        this.paddle.isAlive = true;
        this.paddle.x = this.canvas.width / 2 - this.paddle.width/2;
        this.paddle.y = this.canvas.height - 50 - this.paddle.height/2;
        this.ball.isAlive = true;
        this.ball.isActive=false;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - 70;
    }
    onKeyDown(kev) {
        if(this.gameOver.isGameOver) {
            kev.preventDefault();
            return;
        }
        else if(this.gameWin.isGameWin) {
            kev.preventDefault();
            return;
        }
        switch(kev.code){
            case 'ArrowLeft':
                this.paddle.move('left');
                break;
            case 'ArrowRight':
                this.paddle.move('right');
                break;
        }
    }
    onKeyUp(kev) {
        if(this.gameOver.isGameOver) {
            kev.preventDefault();
            return;
        }
        else if(this.gameWin.isGameWin) {
            kev.preventDefault();
            return;
        }
        switch(kev.code) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.paddle.stop();
                break;
            case 'Space':
            case 'KeyS':
                this.ball.bounce();
                
                this.isRunning = true;
                break;
        }
    }
    update() {

        if(this.gameOver.isGameOver) {
            return;
        }
        if(this.gameWin.isGameWin) {
            return;
        }

        if(!this.isRunning) {
            return;
        }
        this.paddle.update();
        this.ball.update();
        if(this.paddle.hitTest(this.ball)) {
            this.ball.bounceUp();
            // this.audio();
            
        }
        this.bricksCollection.forEach(brick => {
            if(brick.isAlive && brick.hitTest(this.ball)) {
                brick.isAlive = false;
                this.ball.bounceUp();
                this.audio();
                
                this.score += brick.score;
            }
        });
        if(!this.ball.isAlive) {
            this.lives--;
            if(this.lives === 0) {
                this.gameOver.isGameOver = true;
            }
            this.paddle.isAlive = false;
            this.isRunning = false;
            setTimeout(this.reset.bind(this), 500);
        }
        let aliveBricks = this.bricksCollection.filter(brick => brick.isAlive);
        if(aliveBricks.length === 28) {
            // this.ball.speed++;
        } else if(aliveBricks.length === 14) {
            // this.ball.speed++;
            // this.paddle.maxSpeed++;
        } else if(aliveBricks.length === 7) {
           // this.ball.speed++;
        } else if(aliveBricks.length === 0) {
            // this.gameOver.isGameOver = true;
            if(this.level===1){
                console.log('hi')
            this.level2();
           } else if(this.level===2){
            console.log('hi2')
            this.level3();
           }else if(this.level===3){
            console.log('hi3')
            this.gameWin.isGameWin = true;
           }
            // this.level2();
        }
    }
    draw() {
        let canvas = this.canvas;
        let ctx = this.ctx;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        this.background.draw(ctx);
        ctx.font = '20px Arial Bold';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(`Lives: ${this.lives}`, 10, 20);
        ctx.textAlign = 'right';
        ctx.fillText(`Score: ${this.score}`, 790, 20);
        ctx.textAlign = 'center';
        ctx.fillText(`Level: ${this.level}`, 400, 20);
        

        this.paddle.draw(ctx);
        this.ball.draw(ctx);
        this.bricksCollection.forEach(brick => brick.draw(ctx));

        this.gameOver.draw(ctx);
        this.gameWin.draw(ctx);
    }
}