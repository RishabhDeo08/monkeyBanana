var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage;
var gameState="start"
var bananaGroup, bananaImage;
var obstaclesGroup, obstacle1

var score;


function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  //trex_collided = loadImage("trex_collided.png");
  
  
  
  bananaImage = loadImage("banana.png");
  
  obstacle1 = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  //.addAnimation("trex_collided",trex_collided)
  monkey.scale = 0.06;
  
  ground = createSprite(300,180,600,10);
  //ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  text("Score: "+ score, 500,50);
  if (gameState=="start") {
      
      
  score = score + Math.round(getFrameRate()/60);
  
  
  if(keyDown("space")) {
    monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.6
  
  if (ground.x < 300){
    ground.x = ground.width/2;
  }
  if (monkey.isTouching(obstaclesGroup)){
    //.changeAnimation("trex_collided",trex_collided)
    gameState="end"
  }
  monkey.collide(ground);
  spawnbananas();
  spawnObstacles();
  }
  if (gameState=="end"){
      ground.velocityX=0
      monkey.velocityY=0
      obstaclesGroup.destroyEach()
      bananaGroup.destroyEach()
      obstaclesGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    score=0
      }
  drawSprites();
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
  obstacle.addImage(obstacle1)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}