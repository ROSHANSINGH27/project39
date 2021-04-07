
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var survivalTime=0
var background,backgroundImage

function preload(){
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage=loadImage("image.png")
 
}



function setup() {
 createCanvas(560, 400);
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
  
  
    ground = createSprite(400,350,900,10);
 ground.velocityX=-4
  ground.scale=1.4
   ground.x = ground.width/2;
  ground.visible=true
  

  obstacleGroup = createGroup();
  
  FoodGroup = createGroup();
   score = 0;
  
 
}


function draw() {
  background(backgroundImage)
  stroke("white")
  textSize(20)
  fill ("white")
    text("Score: "+ score, 450,50);
    camera.position.x = 300;
     camera.position.y = monkey.y-120
  
  stroke("black")
   textSize(20)
  fill ("black")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SurvivalTime:"+ survivalTime,100,50)
  text ("MONKEY GAME",220,20)

  console.log(ground.x)
  if (ground.x < 0){
      ground.x = ground.width/2;
    }  
    if (keyDown("s")){
      ground.velocityX=-4
    }else  {
       ground.velocityX=0
    }
  
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -18;
        
    }
  monkey.velocityY = monkey.velocityY + 0.9
 monkey.collide(ground)
  
   
if (monkey.isTouching(FoodGroup)){
  score=score+1
  FoodGroup.destroyEach()
  
  
}
 if (monkey.isTouching(obstacleGroup)) {
  
   score=0
   survivalTime=0

   ground.velocityX = 0;
   monkey.velocityX=0
     monkey.velocityY=0
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
  FoodGroup.destroyEach()
   obstacleGroup.destroyEach()

} 
  
  spawnFood()
  spawnObstacles()
  drawSprites()
}
function spawnFood(){
  if (frameCount%80===0){
    var food=createSprite(400,300,20,20)
    food.y=Math.round(random(120,200))
    food.addImage(bananaImage)
    FoodGroup.add(food);
    food.scale=0.1
     food.lifetime =300
      food .velocityX = -3;
  }
}

function spawnObstacles(){
if (frameCount % 300 === 0){
   var obstacle = createSprite(600,320,20,20);
obstacle.x = Math.round(random(500,600));
    obstacle.scale = 0.1;
  obstacle.velocityX=-3
    obstacle.lifetime =300
  obstacleGroup.add(obstacle);
    
    obstacle.addImage(obstacleImage); 
              
 
   
   
 }

}
