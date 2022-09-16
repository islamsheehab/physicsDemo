function setup() {
    var canvas = createCanvas(2000, 1000);
    cam_pos = createVector(0,0,10)
    canvas.parent('sketch-holder');
    
    //pos=createVector(500,500)
    //vel=createVector(0,0)
    //aster = new asteroid(pos,vel,400);
    
    pos=createVector(100,40)
    vel=createVector(-400,400)
    //aster2 = new asteroid(pos,vel,40000);
  }
  
  
  function draw() {
     background(0);
    
    draw_stars();
    draw_mouse();
    
    handle_asteroids();
  }