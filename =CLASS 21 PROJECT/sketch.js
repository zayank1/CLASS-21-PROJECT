var mario, mariostanding, mariorunning, mariojumping;
var play = 0
var end = 1
var ground
var gamestate = play
var score=0
var obstaclesgroup



function preload(){
    mariostanding = loadAnimation("mariostanding.png")
    mariorunning = loadAnimation("mariorunning .png")
    mariojumping = loadAnimation("mariojumping.png")
   restart = loadAnimation("reset.webp")


}

function setup() {
 createCanvas(windowWidth, windowHeight)
mario = createSprite(width/2,height/2,20,20)
mario.addAnimation("standing",mariostanding)
mario.addAnimation("jumping",mariojumping)
mario.addAnimation("running",mariorunning)
mario.scale=0.2

ground = createSprite(width/2,height-20,width,70)
ground.shapeColor = "red"

obstaclesgroup = new Group()


}

function draw() {
   background("black")
drawSprites()

edges = createEdgeSprites()
textSize(20)
fill("white")
text("SCORE: "+ score,30,50)
if(gamestate===play){
  score = score + Math.round(getFrameRate()/60);
spawnobstacles()
if((touches.length > 0 )|| keyDown("space")) {
  mario.changeAnimation("jumping",mariojumping)
  mario.scale=0.03
mario.velocityY = -6
   touches = [];
}
if(keyDown("right")){
  mario.changeAnimation("running",mariorunning)
  mario.x = mario.x+6
  mario.scale=0.13
}
if(keyDown("left")){
  mario.changeAnimation("running",mariorunning)
mario.x=mario.x-6
mario.scale=0.13
}
mario.velocityY = mario.velocityY+0.5
if(obstaclesgroup.isTouching(mario)||ground.isTouching(mario)){
gamestate = end
mario.changeAnimation("standing",mariostanding)
mario.scale=0.2
mario.velocityY = 0
obstaclesgroup.setVelocityYEach(0)
obstaclesgroup.setLifetimeEach(-1)
}

}
if(gamestate === end){
textSize(80)
fill("white")
text("GAME OVER",width-700,height/2)
text("PRESS R TO RESET",width-800,height-250)
if(keyDown("r")){
  gamestate=play
  mario.y = height/2
  mario.width/2
  score = 0
  obstaclesgroup.destroyEach()
}
}









mario.collide(edges)
mario.collide(ground)
}

function spawnobstacles() {
if(frameCount %60 ===0){
  var rand = Math.round(random(1,width))
  var obstacles = createSprite(rand,-100,100,20)
  
  obstacles.velocityY = 5
obstacles.lifetime = 200
mario.depth = obstacles.depth
mario.depth = mario.depth+1
obstaclesgroup.add(obstacles)
}





}
