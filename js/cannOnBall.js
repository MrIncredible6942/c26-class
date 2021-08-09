class CannonBall

{
    constructor(x,y,r)
    {
        var ball_options = {
            restitution:0.9,
            isStatic:true,
            density: 1,
            friction:1
        };
       this.image = loadImage("assets/cannonball.png") ;
      this.body = Bodies.circle(x, y, r, ball_options);
      this.r = r;
      this.trajectory = [];
      World.add(myWorld, this.body);
     }

   shoot()
    {

        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(19);
        Body.setStatic(this.body, false)
        Body.setVelocity(this.body, {x: velocity.x, y: velocity.y})
    }

   display()
   {

        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.image,0, 0, this.r, this.r);
        pop();

        if(this.body.velocity.x >0 &&  this.body.position.x >270)
        {
            var position = [this.body.position.x, this.body.position.y]
            this.trajectory.push(position);
          }


        for(var i=0; i<this.trajectory.length; i++)
        {
          image(this.image,this.trajectory[i][0], this.trajectory[i][1], 5, 5)
        }  
   }
}