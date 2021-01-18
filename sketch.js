  var PLAY = 1;
  var END = 0;
  gameState = PLAY;

  var sword,monster,fruit1,fruit2,fruit3,fruit4,fruitGroup,enemyGroup;
  var swordImage,monsterImage,gameoverImage,gameOverSound,knifeSound;

  var score;

function preload(){
  
   swordImage    = loadImage("knife.png");
   fruit1        = loadImage("fruit1.png");
   fruit2        = loadImage("fruit2.png");
   fruit3        = loadImage("fruit3.png");
   fruit4        = loadImage("fruit4.png");
   monsterImage  = loadImage("alien2.png");
   gameoverImage = loadImage("gameover.png");
  gameOverSound  = loadSound("gameover.mp3");
  knifeSound     = loadSound("knifeSwooshSound.mp3");
  
   fruitGroup = createGroup();
   enemyGroup = createGroup(); 
}
function setup(){
   createCanvas(500,500);
  
   sword = createSprite(100,200,20,20);
   sword.addImage(swordImage);
   sword.scale = 0.7;
   // sword.debug = true;
   score = 0;
}

function draw(){
   background("lightblue");
  textSize(25);
   text("Score: " + score,200,40);
 
  
if (gameState === PLAY){
    
   Enemy();
   fruits();
   sword.x = mouseX;
   sword.y = mouseY;
    
if (fruitGroup.isTouching(sword)){
   knifeSound.play(); 
   fruitGroup.destroyEach();
   score = score+1;
}
  
}
  
else if (gameState === END){
    
   fruitGroup.destroyEach();
   enemyGroup.destroyEach();
   fruitGroup.velocityX = 0;
   enemyGroup.velocityX = 0;
    
}
if (sword.isTouching(enemyGroup)){
  gameOverSound.play();
   gameState = END;
   sword.addImage(gameoverImage);
   sword.x = 250;
   sword.y = 250;
   sword.scale = 1.7;    
}
  
   drawSprites();
}

function fruits(){
  
if (frameCount % 80 === 0){
   fruit = createSprite(500,200,20,20);
   fruit.scale = 0.2;
    
   v = Math.round(random(1,4));
if (v === 1){
   fruit.addImage(fruit1); }
   else if (v === 2){
   fruit.addImage(fruit2); }
   else if (v === 3){
   fruit.addImage(fruit3); }
   else if (v === 4){
   fruit.addImage(fruit4); }
    
   fruit.y = Math.round(random(50,340)); 
   fruit.velocityX = -7;
   fruit.setLifetime = 100;
   fruit.velocityX = -(8+(score/16));
  
   fruitGroup.add(fruit);
}
  //console.log(v);
}

function Enemy(){
  
if (frameCount % 200 === 0){
   monster = createSprite(500,200,20,20);
   monster.addAnimation("moving",monsterImage);
   monster.y = Math.round(random(100,300));
   monster.velocityX = -8;
   monster.setLifetime = 50;
   monster.velocityX = -(5+(score/10));
    enemyGroup.add(monster);
}
  
}  