var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsgroup,cloudimage;
var obstaclesgroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var score=0;
var PLAY=1,END=2,gamestate=PLAY;
var gameimage,restartimage,gameOver,Restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  gameimage=loadImage("gameOver.png");
  restartimage=loadImage("restart.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudimage=loadImage("cloud.png");
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexdead",trex_collided);
  trex.scale = 0.5;
  console.log(trex.y);
  ground = createSprite(300,180,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(400,190,800,10);
  invisibleGround.visible = false;
  
  cloudsgroup=new Group();
  obstaclesgroup= new Group();
  
gameOver = createSprite(200,100);
 Restart = createSprite(200,140);
gameOver.addImage(gameimage);
gameOver.scale = 0.5;
Restart.addImage(restartimage);
Restart.scale = 0.5;

gameOver.visible = false;
Restart.visible = false;

}

function draw() {
  background(25 );
            
 
  
  
  text("Score :"+ score,500,50);

  

  
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround);
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(gamestate === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3*score/100);
    //scoring
    score=score+Math.round(getFrameRate()/60);
    
    if (score>0 && score%100 === 0){
     // playSound("checkPoint.mp3");
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >=160){
      trex.velocityY = -17 ;
     // playSound("jump.mp3");
    }
    
    
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(obstaclesgroup.isTouching(trex)){
     // playSound("jump.mp3");
      gamestate = END;
     // playSound("die.mp3");
    }
  }
  
  else if(gamestate === END) {
    gameOver.visible = true;
    Restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trexdead",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    
    if(mousePressedOver(Restart)){
      reset();
      
      
    }
    
  }
  
 
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 245;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsgroup.add(cloud);
   
  }
  
}

function reset(){
  gamestate = PLAY;
  
  gameOver.visible = false;
  Restart.visible = false;
  
  obstaclesgroup.destroyEach();
  cloudsgroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 score = 0;
  
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2:obstacle.addImage(obstacle2);
              break;
      case 3:obstacle.addImage(obstacle3);
              break;        
      case 4:obstacle.addImage(obstacle4);
              break;        
      case 5:obstacle.addImage(obstacle5);
              break;           
      case 6 :obstacle.addImage(obstacle6);
              break;         
      default: break;     
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 130;
    
     obstaclesgroup.add(obstacle);
 
  }
}










