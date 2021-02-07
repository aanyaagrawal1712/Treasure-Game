var PLAY=1;
var END=0;
var gameState=PLAY;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;

var treasureCollection = 0 , endImage;

var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
endImage=createSprite(width/2,height/2,20,20);
endImage.addAnimation("gameOver",endImg);
endImage.scale=0.8;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  
  if(gameState===PLAY){
    boy.x = World.mouseX;
    
    endImage.visible=false;
    
  if(path.y > height ){
    path.y = height/2;
  }
  
  if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
  }
 else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
 }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
      
 }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        endImage.visible=true;
        boy.destroy();
        swordGroup.destroyEach();
     }
   }
 }
  else if(gameState===END){
    path.velocityY=0;
    cashG.destroyEach();
    cashG.setVelocityYEach(0);
 
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach(0);
    
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach(0);
    
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);
    
  }

  edges= createEdgeSprites();
  boy.collide(edges);
  
  
  createCash();
  createDiamonds();
  createJwellery();
  createSword();

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-190,30);

}


function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-60),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 500;
  cashG.add(cash);
  }
}


function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-60),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 4;
  diamonds.lifetime = 500;
  diamondsG.add(diamonds);
}
}


function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-60),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 4;
  jwellery.lifetime = 500;
  jwelleryG.add(jwellery);
  }
}


function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-60),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 500;
  swordGroup.add(sword);
  }
}