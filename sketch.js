var ghost, towerImage, tower, ghostImage, door, doorImage;
var climber, climberImage;
var background;
var doorGroup, climberGroup, invisibleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ghostjumpImage;
var sound1;


function preload() {
  ghostImage = loadImage("ghost-standing.png")
  towerImage = loadImage("tower.png")
  climberImage = loadImage("climber.png")
  doorImage = loadImage("door.png")
  ghostjumpImage=loadImage("ghost-jumping.png")
  sound1=loadSound("spooky.wav")
  
}

function setup() {
  createCanvas(600, 600)
  sound1.loop();
  tower = createSprite(width / 2, height / 2)
  tower.addImage(towerImage)
  tower.velocityY = 3;
  // Creating ghost
  ghost = createSprite(width / 2, height/2)
  ghost.addImage(ghostImage)
  ghost.scale = 0.3;
  ghost.debug=true;
  //creating door
  doorGroup = createGroup();
  climberGroup = createGroup();
  invisibleGroup = createGroup();


}

function draw() {
  background(0);

  if (gameState === PLAY) {
    //reseting tower
    
    if (tower.y > height + 50) {
      tower.y = height / 2
    }
    //To make ghost jump
    if (keyDown("SPACE")) {
      ghost.velocityY = -5;
      ghost.addImage(ghostjumpImage)
    }
    
    //To assign gravity
    ghost.velocityY = ghost.velocityY + 0.6;
    //To move ghost Right and left
    ghost.addImage(ghostImage)
    if (keyDown("Right_arrow")) {
      ghost.x = ghost.x + 2;
    }
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x - 2;
    }
    //To land the Ghost on the climbers
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    //Spawning doors and climbers and invisible sprites
    spawnObjects();
    drawSprites();
    //To change the gameState to end
    if (invisibleGroup.isTouching(ghost) || ghost.y > height) {
      gameState = END
      ghost.destroy();
    }
  }
    if (gameState === END) {
      fill("red")
      textSize(40)
      
      text("Game over ☠☠☠", 150, height/2)
      
    }


  



}

function spawnObjects() {
  if (frameCount % 150 === 0) {
    door = createSprite(30, -10)
    door.addImage(doorImage);
    door.scale = 0.8;
    door.x = Math.round(random(100, width - 100))
    door.velocityY = 3;
    door.lifetime = 200;
    doorGroup.add(door)
    ghost.depth=door.depth+1
    climber = createSprite(30, 40)
    climber.addImage(climberImage);
    climber.scale = 0.8;
    climber.velocityY = 3;
    climber.x = door.x;
    climber.lifetime = 200;
    climberGroup.add(climber)
    invisibleSprite = createSprite(width - 150, 40, 80, 2)
    invisibleSprite.velocityY = 3;
    invisibleSprite.x = climber.x;
    invisibleSprite.lifetime = 200;
    invisibleGroup.add(invisibleSprite)
    invisibleSprite.debug=true;
    // invisibleSprite.visible = false;

  }

}