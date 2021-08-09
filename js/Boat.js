class Boat{
   
    constructor(x, y, w, h, boatPos)
    {
        var boat_options = {
        friction: 1,
        density:1,
        restitution:0.75
        }
        this.body  = Bodies.rectangle(x, y, w, h, boat_options)
        this.w = w
        this.h = h
        this.boatPosition = boatPos;
        this.image = loadImage("assets/boat.png")  
        World.add(myWorld, this.body)
     }

     display(){

         var pos = this.body.position;

         push();

         imageMode(CENTER)
         image(this.image, pos.x, this.boatPosition , this.w, this.h )
         pop();
     }

    // boats[j].remove(j);
      remove(index)
      {
            Matter.World.remove(myWorld, boats[index].body);
            boats.splice(index, 1)
            
      }


    }





