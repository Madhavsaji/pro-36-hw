//Create variables here
var dog,sadDog,happyDog;
var database;
var foodObj;
var foodS,foodStock;
var fedTime,lastFed,feed,addFood;


function preload()
{
	//load images here
  sadDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() 
{
  createCanvas(500, 400);

  database = firebase.database()

  dog = createSprite(300,250,100,100);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)


 
}


function draw()
 {  
  background(46,139,87);
  
  foodObj.display();
 
  fedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed = data.val();
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed: "+lastFed %12 + "PM",350,30);
  }
  else if(lastFed == 0)
  {
    text("Last Feed: 12AM ",350,30);
  }
  else
  {
    text("Last Feed: "+lastFed + "AM",350,30);
  }
  drawSprites();
 
  fill("white");
  stroke(20);
  text("Note: Press UP_ARROW To Feed Drago Milk!",100,15);
 
  text("Food Remaining :19 ",250,150);

 

}
function feedDog()
{
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}
function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function readStock(data)
{
  foodS = data.val();
}
function writeStock(x)
{
  if(x<=0)
  {
    x = 0;
  }
  else
  {
    x = x-1;
  }
  database.ref('/').update({
    Food: x
  })

}