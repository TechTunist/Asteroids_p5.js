var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var burningUp;
var score = 0;

///Upload earth image
var img;
function preload() {
  img = loadImage('earth.png');
}

//////////////////////////////////////////////////
function setup() {
    createCanvas(1200,800);
    spaceship = new Spaceship();
    asteroids = new AsteroidSystem();

    //location and size of earth and its atmosphere
    atmosphereLoc = new createVector(width/2, height*2.9);
    atmosphereSize = new createVector(width*3, width*3);
    earthLoc = new createVector(width/2, height*3.1);
    earthSize = new createVector(width*3, width*3);
    
    //load earth image
//    image(img, -370, 600, img.height *7, img.width*7);
}

//////////////////////////////////////////////////
function draw() {
    
    background(0);
    sky();

    spaceship.run();
    asteroids.run();


    drawEarth();     

    checkCollisions(spaceship, asteroids); // function that checks collision between various elements
    
    scoreBoard();
    
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
    if(burningUp){
        fill(255,69,0,80)
    } else{
        fill(0, 188, 255, 80);      
    }
    
  
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
    
  //draw earth
    push();
    rotate(-0.5);
    image(img, -2470, 650, img.height*7, img.width*6);
    pop();
    
}


//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    for(var i = 0; i < asteroids.locations.length; i++){
        if(isInside(spaceship.location, spaceship.size - 15,
                asteroids.locations[i], asteroids.diams[i])){
            gameOver();
        }
    }

    //asteroid-2-earth collisions
    for(var i = 0; i < asteroids.locations.length; i++){
        if(isInside(earthLoc, earthSize.x,
                asteroids.locations[i], asteroids.diams[i])){
            gameOver();
        }
    }

    //spaceship-2-earth
    if(isInside(spaceship.location, spaceship.size,
            earthLoc, earthSize.x)){
        gameOver();
        }

    //spaceship-2-atmosphere
    if(isInside(spaceship.location, spaceship.size,
            atmosphereLoc, atmosphereSize.x)){
        spaceship.setNearEarth();
        }

    //bullet collisions
    for(var b = 0; b < spaceship.bulletSys.bullets.length; b++){
        for(var a = 0; a < asteroids.locations.length; a++){
            
            if(isInside(spaceship.bulletSys.bullets[b],
                        spaceship.bulletSys.diam,
                       asteroids.locations[a],
                       asteroids.diams[a])){
                score += 1;
                asteroids.destroy(a);
            }
        
        }
    }
    
    //asteroid atmosphere interaction
    burningUp = false;
    for(var i = 0; i < asteroids.locations.length; i++){
        if(isInside(atmosphereLoc, atmosphereSize.x,
                asteroids.locations[i], asteroids.diams[i])){
            burningUp = true;
        }
        
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    d = dist(locA.x, locA.y, locB.x, locB.y);
    if(d < (sizeA/2) + (sizeB/2) ){
        return true;
        
        
    }
    else {
        return false;
    }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(0,255,0);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}

//asteroids burn in the atmosphere
function burningUp(){
    asteroids.asteroidColor = "darkorange";
}

function scoreBoard(){
    fill(0,255,0);
    textSize(40);
    textAlign(CENTER);
    text("SCORE: " + score, width/8, height/8);
    
}



