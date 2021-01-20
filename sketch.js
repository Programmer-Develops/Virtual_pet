//Create variables here
var doggy, doggyIMG;
var dogImg2;
var FoodS = 20;
var database;

function preload() {
  //load images here
  doggy = createSprite(400, 400, 20, 20);
  goodDog = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 700);
  doggy.addImage(goodDog);
  doggy.scale = 0.20;
  foodStock = database.ref('FoodS');
  foodStock.on("value", readStock);
}

function draw() {

  background("lime")
  if (keyWentDown(UP_ARROW)) {
    writeStock(FoodS);
    FoodS = FoodS-1;
    doggy.addImage(happyDog);
  }

  if (keyWentUp(UP_ARROW)) {
    doggy.addImage(goodDog);
  }

  drawSprites();
  //add styles here
  textSize(20);
  textFont("Bold");
  stroke(4);
  text("foodStock : " + FoodS, 370, 20);

}

function readStock(data) {

  foodS = data.val();

}

function writeStock(x) {

  if (x <= 0) {
    x = 0
  } else {
    x = x - 1
  }

  database.ref('/FoodS').update({
    FoodS: x
  })
}