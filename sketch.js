var player,playerImg
var opponent,opponentImg
var gameState=0
var playerImg1="b1.png"
var girlbutton
var boybutton
var playbutton
var cork,corkImg
var edges
var power
var opponentscore = 0
var playerscore = 0
var racket,racket1,racketImg,racketImg1

function preload(){
getPlayerImg()
bg=loadImage("bg.png")
opponentImg=loadImage("b2.png")
bg1=loadImage("bg1.jpg")

g1=loadImage("g1.png")

corkImg=loadImage("shuttlecock.png")

powerImage = loadImage("clock.png")

racketImg = loadImage("racket.png")
racketImg1 = loadImage("racket1.png")
}

function setup() {
  createCanvas(1000,700);

  player = createSprite(200,320,50,50)
  player.addImage("player",playerImg)
  player.scale=1

  opponent = createSprite(700,320,50,50)
  opponent.addImage("opponent",opponentImg)

  cork = createSprite(205,350,30,30)
  cork.addImage("cork",corkImg)
  cork.scale=0.3

  racket = createSprite(230,320)
  racket.addImage("racket",racketImg)
  racket.scale=0.8

  racket1 = createSprite(670,345)
  racket1.addImage("racket1",racketImg1)
  racket1.scale=0.8

  edges = createEdgeSprites()

  powerGroup = createGroup();

}

function draw() {
 // background(bg)
if(gameState===0){
  start()
}

if(gameState===1){
  girlbutton.hide()
      boybutton.hide()
      playbutton.hide()
  play()
}
spawnPowers()

 if(cork.x > 400){
  opponent.y = cork.y
}

racket.x=player.x
racket.y=player.y

//top edge
if(cork.x < 500 && cork.y < 30){
  end()
}
//left edge
if(cork.x < 40 && cork.y < 30){
  end()
}
//bottom edge
if(cork.x < 500 && cork.y > 540){
  end()
}

if(cork.x < 130){
opponentscore=opponentscore+1
}

if(cork.x < 740){
  playerscore=playerscore+1
  }

fill("white")
text(mouseX+","+mouseY,mouseX,mouseY)


  //drawSprites();
}

function keyPressed(){
  if(keyCode==UP_ARROW){
    player.y=player.y-20
  }
  if(keyCode==DOWN_ARROW){
    player.y=player.y+20
  }
  if(keyCode==LEFT_ARROW){
    player.x=player.x-20
  }
  if(keyCode==RIGHT_ARROW){
    player.x=player.x+20
  }
}

function start(){
  background(bg1)
fill("red")
textSize(30)
  text("Rules of the Game",370,30)

  fill("maroon")
  textSize(25)
  text("*The player will move with arrow keys",300,100)

  text("*When the computer misses the cork the player will get a point & vise versa",50,150)

  text("*There are three levels and the players will get 2 chances ",150,200)

  text("*The game will also have powers ",300,250)

  text("*You will have to jump to catch the powers",250,300)

  text("*press space to start",250,350)

fill("green")
textSize(30)
text("Click the button to choose your character",200,400)


    girlbutton = createButton("Girl Player")
    girlbutton.position(320,500)
    girlbutton.mousePressed(function(){

      playerImg1 = "b1.png"
    })

    boybutton = createButton("Boy Player")
    boybutton.position(550,500)
    boybutton.mousePressed(function(){
      playerImg1 = "b2.png"
    })

    playbutton = createButton("Play")
    playbutton.position(450,600)
    playbutton.mousePressed(()=>{
      gameState = 1
      
    })
}

function play(){
   background(bg)

   
 cork.bounceOff(edges[0])
 cork.bounceOff(edges[1])
 cork.bounceOff(edges[2])
 cork.bounceOff(edges[3])

 if(cork.isTouching(opponent)){
  cork.bounceOff(opponent)
}

if(cork.isTouching(player)){
 cork.bounceOff(player)
}
 
if(keyDown("space")){
  cork.velocityX=7
  cork.velocityY=-2

}

if(player.isTouching(powerGroup)){
    player.y = cork.y
  }


fill("yellow")
textSize(25)
text("PlayerScore :",50,55)
text("OpponentScore :",50,78)
  drawSprites()
}

function getPlayerImg(){
  playerImg=loadImage(playerImg1)
}

function end(){
  cork.velocityX=0
  cork.velocityY=0
   
  cork.x = 500
  cork.y = 350

}

function spawnPowers() {
  if (frameCount % 600 === 0) {
    var power = createSprite(450,30,40,10);
    power.y = Math.round(random(80,120));
    power.addImage(powerImage);
    power.scale = 0.2;
    power.velocityY = 2;
  
    power.lifetime = 350;
    
    powerGroup.add(power);
  }
}

