var PLAY = 1;
var END = 0;
var gameState = PLAY;
var distance = 0;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var pole;
var score=0;

var gameOver, restart;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex2.png");
  trex_collided = loadAnimation("trex4.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud0.png");
  
  obstacle1 = loadImage("obs1.png");
  obstacle2 = loadImage("obs2.png");
  obstacle3 = loadImage("obs3.png");
  obstacle4 = loadImage("obs4.png");
  obstacle5 = loadImage("obs5.png");
  
  poleimg = loadImage("sprite_10.png");

  bg2img = loadImage("1.0.png");

  bgimg = loadImage("img0.jpg");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(1000, 500);
  
  trex = createSprite(80,450,20,50);  
  trex.addAnimation("running", trex_running);
 // trex.addAnimation("collided", trex_collided);
  trex.scale = 0.8;
  
  ground = createSprite(210,440,2600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(trex.x+100,160);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.0;
  gameOver.visible = false;
  
  restart = createSprite(trex.x+200,280);
  restart.addImage(restartImg);
  restart.scale = 1.0;  
  restart.visible = false;
  
  pole= createSprite(2400,320,20,270);
  pole.addImage(poleimg);
  pole.scale=4.5;
  
  invisibleGround = createSprite(1150,460,2500,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
 // score = 0;
}

function draw() {
  //trex.debug = true;
 // textSize(35);
  background(bgimg);

  fill(0);
  textSize(30);
  text("Score: "+ score, trex.x+280,50);

  trex.collide(invisibleGround);
  
  trex.debug = true;
 pole.setCollider("rectangle",-10,0,10,70);
  
  
  if (gameState===PLAY){
   
    gameOver.visible = false;
    restart.visible = false;
  
  if(keyIsDown(RIGHT_ARROW)){
    trex.x=trex.x+ 10;
  }
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if((keyDown("SPACE")) && trex.y  >= height-120) {
    trex.velocityY = -12;   
  }
  trex.velocityY = trex.velocityY + 0.8;

  camera.position.x = trex.x +410;
  camera.position.y = 250;

 
  score = score + Math.round(getFrameRate()/60);
  console.log("distance");
 
  spawnClouds();
  spawnObstacles();
 }

 if(obstaclesGroup.isTouching(trex)){
  gameState = END;
 // trex.changeAnimation("collided",trex4);
}
 
  if(pole.isTouching(trex)){
    background(bg2img);

    trex.visible=false;
    pole.visible=false;
    ground.visible=false;
  
    ground.velocityX = 0;
    trex.velocityY = 0;

    gameState= 2;
  }

 if (gameState === END) {

  gameOver.visible = true;
  restart.visible = true;
  gameOver.x=trex.x+200;
  restart.x=trex.x+200;

  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setVelocityXEach(0);

  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  
  if(mousePressedOver(restart)) {
    reset();
  }

 }
  drawSprites();
}


function reset(){
  gameState=PLAY;
  obstaclesGroup.destroyEach();
  gameOver.visible=false;
  reset.visible=false;
  cloudsGroup.destroyEach();
  trex.x=80;
  trex.y=440;
  score=0;
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 140 === 0) {
    var cloud = createSprite(2000,200,40,10);
    cloud.y = Math.round(random(80,160));
    cloud.addImage(cloudImage);
    cloud.scale = 1.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(2000,425,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -9;
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.5;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.4;
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.5;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.5;
              break;
      case 5: obstacle.addImage(obstacle5);
              obstacle.scale = 0.4;
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



  
