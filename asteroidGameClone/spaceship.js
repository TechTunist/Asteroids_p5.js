class Spaceship {
    
    
    constructor(){
        this.velocity = new createVector(0, 0);
        this.location = new createVector(width/2, height/2);
        this.acceleration = new createVector(0, 0);
        this.maxVelocity = 5;
        this.bulletSys = new BulletSystem();
        this.size = 50;
        this.boostingLeft = false;
//        this.boostingRight = false;
//        this.boostingUp = false;
//        this.boostingDown = false;
        
        this.hideBoosters = 0;
      }

    run(){
    
        this.bulletSys.run();
        this.draw();
        this.move();
        this.edges();
        this.interaction();
      }

      draw(){
          fill(125);
          triangle(this.location.x - this.size/2, this.location.y + this.size/2,
              this.location.x + this.size/2, this.location.y + this.size/2,
              this.location.x, this.location.y - this.size/2);

          fill(255,255,0);
          if(this.boostingLeft){
              ellipse(this.location.x + 15, this.location.y,  10,10);      
          } 
          if(this.boostingRight){
              ellipse(this.location.x - 15, this.location.y, 10,10);    
          }
          if(this.boostingUp){
              ellipse(this.location.x, this.location.y +25, 10,10);  
          }
          if(this.boostingDown){
              ellipse(this.location.x, this.location.y -25, 10,10);
          }
      }

      move(){
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxVelocity);
          this.location.add(this.velocity);
          this.acceleration.mult(0);
      }

      applyForce(f){
        this.acceleration.add(f);
      }

      interaction(){
          if (keyIsDown(LEFT_ARROW)){
              this.applyForce(createVector(-0.1, 0));
              this.boostingLeft = true;
          } else {
              this.boostingLeft = false;
          }

          if (keyIsDown(RIGHT_ARROW)){
              this.applyForce(createVector(0.1, 0));
              this.boostingRight = true;
          } else {
              this.boostingRight = false;
          }
          if (keyIsDown(UP_ARROW)){
              this.applyForce(createVector(0, -0.1));
              this.boostingUp = true;
          } else {
              this.boostingUp = false;
          }
          if (keyIsDown(DOWN_ARROW)){
              this.applyForce(createVector(0, 0.1));
              this.boostingDown = true;
          } else {
              this.boostingDown = false;
          }

      }

      fire(){
        this.bulletSys.fire(this.location.x, this.location.y);
      }

      edges(){
        if (this.location.x<0) this.location.x=width;
            else if (this.location.x>width) this.location.x = 0;
            else if (this.location.y<0) this.location.y = height;
            else if (this.location.y>height) this.location.y = 0;
      }

      setNearEarth(){
        //YOUR CODE HERE (6 lines approx)
          this.applyForce(createVector(0, 0.05));

          var friction = this.velocity.copy();
          friction.mult(-1);
          friction.normalize();
          friction.mult(0.03);

          this.applyForce(friction);

      }
    }
