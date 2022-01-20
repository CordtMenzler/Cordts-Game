var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var restart,restartImage

var gameover, gameoverImage

var die,checkpoint,jump

var highscore
  

function preload(){
  trex_running = loadAnimation("trex.png");
  //trex_collided = loadAnimation("trex_collided.png");
  restartImage=loadImage("restart.png")
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  gameoverImage=loadImage("gameOver.png")
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  die=loadSound("die.mp3")
  jump=loadSound("jump.mp3")
  checkpoint=loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  restart=createSprite(300,100)
restart.addImage("restart",restartImage)
restart.scale=0.5
gameover=createSprite(300,75)
gameover.addImage("gameover",gameoverImage)
gameover.scale=0.5
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  //trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.2;
 //trex.debug=true
  trex.setCollider("circle",0,0,40)    
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;

  highscore=0

}

function draw() {
  background("lightblue");
  text("Score: "+ score, 500,50);

  text("Highscore: "+highscore,400,50)

 
  
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(4+score/100);
    score = score + Math.round(frameCount/60);
    if (score>0&&score%100==0){
      checkpoint.play()
    }
     if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;

  }
  if (ground.x<0){
    ground.x=ground.width/2
  }
  
  trex.velocityY = trex.velocityY + 0.8
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
    jump.play()
  }
  
  trex.velocityY = trex.velocityY + 0.8
  spawnClouds();
  spawnObstacles();
  if(obstaclesGroup.isTouching(trex)){
    gameState=END
    die.play()
  }

  gameover.visible=false
  restart.visible=false
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    trex.velocityY=0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-1)
//trex.changeAnimation("collided",trex_collided)

gameover.visible=true
  restart.visible=true

if (score>highscore){
  highscore=score
}
if (mousePressedOver(restart)){
  reset()
}

  }
  
 
  
  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  
  //spawn obstacles on the ground
  
  
  drawSprites();
}
function reset(){
  gameState=PLAY
  obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    score=0
    restart.visible=false
    gameover.visible=false
    trex.changeAnimation("running", trex_running)
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -(6+score/100);


   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}