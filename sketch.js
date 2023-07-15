var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  spookySound.loop();
  spookySound.setVolume(0.3);


}

function draw() {
  background(0);

  if (gameState === "play") {
    if (tower.y > 400) {
      tower.y = 300
    }

    if (keyDown("space")) {
      ghost.velocityY = -8;
    }

    if (keyDown("left")) {
      ghost.x -= 8;
    }

    if (keyDown("right")) {
      ghost.x += 8;
    }

    ghost.velocityY += 0.8;

    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }

    spawn_doors();

    drawSprites();
  }

  if (gameState === "end") {
    textSize(20);
    fill("red");
    text("Game Over!", 250, 300);
  }
}

function spawn_doors() {
  if (frameCount % 200 == 0) {
    door = createSprite(300, -50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120, 400));
    doorsGroup.add(door);
    ghost.depth = door.depth;
    ghost.depth += 1;

    climber = createSprite(300, 10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

  }
}