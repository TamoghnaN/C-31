const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var eat,blink,sad

function preload()
{
  bg_img = loadImage('assets/background.png');
  food = loadImage('assets/melon.png');
  rabbit = loadImage('assets/Rabbit-01.png');;
  eat = loadAnimation('assets/eat_0.png','assets/eat_1.png','assets/eat_2.png','assets/eat_3.png','assets/eat_4.png')
  blink = loadAnimation('assets/blink_1.png','assets/blink_2.png','assets/blink_3.png');
  sad = loadAnimation('assets/sad_1.png','assets/sad_2.png','assets/sad_3.png');

  blink.playing=true;
  eat.playing = true;
  sad.playing= true;
  eat.looping= false;
  sad.looping=false;

}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  blink.frameDelay = 15
  eat.frameDelay = 20
  
  button = createImg('assets/cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);
  
  rope = new Rope(7,{x:245,y:30});
  ground = new Ground(200,690,600,20);

  bunny = createSprite(230,620,100,100);
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  bunny.scale = 0.2;


  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  rope.show();
  Engine.update(engine);
  ground.show();


if(collide(fruit,bunny)==true){
  bunny.changeAnimation('eating');
}

if(collide(fruit,ground.body)==true){
  bunny.changeAnimation('crying');
}

   drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function collide(body,sprite){
if(body!=null){
  var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
  if(d<=80){
    World.remove(engine.world,fruit);
    fruit=null;
    return true;
  }
  else{
    return false
  }
}
}
