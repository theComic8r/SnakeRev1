//variables
playerX=playerY=10;
gridSize=tileCount=20;
appleX=appleY=15;
xVelocity=yVelocity=0;
trail=[];
tail = 5;
score = 0;
winVal = 25;
record = 0;
timesPlayed=1;
timesWon=0;
var startScreen = true;
var moving = false;
//disable arrow keys scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
//init functions
window.onload=function() {
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	document.addEventListener("keydown",keyPush);
	startScreen = true;
    setInterval(game,1000/10);
}
//game actions, called 10x/sec
function game() {
    playerX+=xVelocity;
	playerY+=yVelocity;
    var started = false;
    if(!moving){
        started = true;
    }
	if(playerX<0 && startScreen){
        // playerX= tileCount-1;
		// moving=true;
		startScreen = false;
    }
    if(playerX>tileCount-1 && startScreen) {
        // playerX= 0;
		// moving=true;
		startScreen = false;
    }
    if(playerY<0 && startScreen) {
        // playerY= tileCount-1;
		// moving=true;
		startScreen = false;
    }
    if(playerY>tileCount-1 && startScreen) {
        // playerY= 0;
		// moving=true;
		startScreen = false;
    }
    if(started && moving){
        score = 0;
    }
	ctx.fillStyle="black";
	ctx.fillRect(0,0,canv.width,canv.height);

	ctx.fillStyle="lime";
	for(var i=0;i<trail.length;i++) {
		ctx.fillRect(trail[i].x*gridSize,trail[i].y*gridSize,gridSize-2,gridSize-2);
		if(trail[i].x==playerX && trail[i].y==playerY && moving) {
			tail = 5;
			startScreen = false;
            moving = false;
		}
	}
	trail.push({x:playerX,y:playerY});
	while(trail.length>tail) {
	trail.shift();
	}

	if(appleX==playerX && appleY==playerY) {
		tail++;
		appleX=Math.floor(Math.random()*tileCount);
		appleY=Math.floor(Math.random()*tileCount);
        score++;
		console.log(score);
		if(score === winVal){
			timesWon++;
		}
	}
	ctx.fillStyle="red";
	ctx.fillRect(appleX*gridSize,appleY*gridSize,gridSize-2,gridSize-2);

    if(!startScreen){
        ctx.clearRect(0,0,canv.width,canv.height);
        ctx.fillStyle="black";
        ctx.fillRect(0,0,canv.width,canv.height);
        ctx.fillStyle="lime";
        ctx.font="50px montserrat";

		if(score>=winVal){
			ctx.fillText("You Won", 85, 100);
		}else{
			ctx.fillText("Game Over", 50, 100);
		}

        ctx.font="30px montserrat";
        ctx.fillText("Score: "+score, 100, 200);

        if (score>record){
            record=score;
        }

        ctx.fillText("Record: "+record, 100, 250);
		ctx.fillText("Played: "+timesPlayed, 100, 150);
		ctx.fillText("Won: "+timesWon, 100, 300);

    }
}
function keyPush(evt) {
	switch(evt.keyCode) {
		case 37:
			xVelocity=-1;
			yVelocity=0;
			moving = true;
			break;
		case 38:
			xVelocity=0;
			yVelocity=-1;
			moving = true;
			break;
		case 39:
			xVelocity=1;
			yVelocity=0;
			moving = true;
			break;
		case 40:
			xVelocity=0;
			yVelocity=1;
			moving = true;
			break;
        case 32:
			if(!startScreen){
            startScreen = true; 
			started=true; 
			timesPlayed++;
			score=0;
			xVelocity=yVelocity=0;
			playerX=playerY=10;
			appleX=appleY=15;
			}
            break;
	}
}
