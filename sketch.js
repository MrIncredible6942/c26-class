const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Render = Matter.Render;

var myEngine, myWorld;

var tower, towerImg, ground, cannon;
var backgroundImg;
var cannonBallImg;
var boat
var balls = [];
var boats = [];

function preload()
{
  towerImg = loadImage("assets/tower.png");
  backgroundImg = loadImage('assets/background.gif');
  cannonBallImg = loadImage("assets/cannonball.png")
    
}

function setup(){
    createCanvas(1200,600);
    myEngine = Engine.create();
    myWorld = myEngine.world;

    var render = Render.create({

      element: document.body,
      engine: myEngine,
      options: {

        width: 1200,
        height: 600,
        wireframes: false
      }
    });

    Render.run(render)

    

    tower = new Tower(150, 380, 190, 330);

    ground = new Ground(600, height-1, width*2,1);
    angle = -PI/4
    cannon = new Cannon(185, 140, 90, 56,angle);

  //  boat = new Boat(width-300, height-120, 200, 200,-100 )
   // cannonBall = new CannonBall(cannon.x, cannon.y, 40);
    
}

function draw(){
    background(backgroundImg);
    Engine.update(myEngine);
   // cannonBall.display();

   //created an array [c1, c2, c3,c4]; for the cannonball
   for(var i =0; i<balls.length; i++)
   {
    //calling the function
      showCannonBalls(balls[i] , i);

      //C26 for the collision
      //for loop for pirates
      for(var j = 0; j< boats.length; j++)
      {

        //atleast 1 ball has to be there
          if(balls[i] !== undefined  && boats[j] !== undefined)
          {

              //Matter.SAT.colides.collided --> returns either true or false 
              var collision = Matter.SAT.collides(balls[i].body, boats[j].body);
              if(collision.collided)
              {

                  boats[j].remove(j);

                  World.remove(myWorld, balls[i].body);
                  balls.splice(i, 1);
                  i--;

                  /*
                  [b1, b2, b3, b4, b5]
                  i=3;
                  [c1, c2, c3, c4, c5]
                  [C1, C2, C4, C5]

                  */

              }
          
            }

      }


   }


    tower.display();
    ground.display();
    cannon.display();
 
    /*
      Body.setVelocity(boat.body ,{
        x: -0.8,
        y:0 
      })                          

    boat.display()

    */

    showBoats();
   
}

//defining 
function showCannonBalls(ball, index)
{
   
     ball.display();


     if(ball.body.position.x >= width | ball.body.position.y >= height -50)
     {
        World.remove(myWorld, ball.body);
        balls.splice(index,1);
     }
}

function keyPressed()
{
  if(keyCode === DOWN_ARROW)
  {
    var cannonBall = new CannonBall(cannon.x +10, cannon.y+10, 40);
    balls.push(cannonBall);
  }
}

function keyReleased()
{
   if(keyCode === DOWN_ARROW)
   {

    console.log("Shoot")
      //cannonBall.shoot();
      balls[balls.length-1].shoot();
   }
}

//user define
function showBoats()
{
    //boats[b1]   length array: no of elements inside

    //atleast 1 boat is present
    if(boats.length >0)
    {

        if(boats.length < 4 && boats[boats.length -1].body.position.x < width -300)
        {
            var position = [height-140, height-210, height-180];
            var position = random(position);
            var boat = new Boat(width, height-100, 200, 200, position );
            boats.push(boat);
        }

        for(var i=0; i<boats.length; i++)
        {
          Body.setVelocity(boats[i].body, {x:-0.87, y:0} );
          boats[i].display();
        }


    }

    else{


       boat = new Boat(width, height -100, 200, 200, height-110);
       boats.push(boat);
      }

}
