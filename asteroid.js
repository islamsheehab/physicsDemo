pi = 3.14159265358979323846264338327950288419716939937510
asteroids=[]

//centralised function to render and handle asteroids
function handle_asteroids(){
  delta = document.getElementById('delta').value/10000
  gravity = document.getElementById('grav').value/50000
  
  for(var index in asteroids){
    aster2 = asteroids[index]
    aster2.update(); 
  }
  for(var index1 in asteroids){
    aster1 = asteroids[index1]
    aster1.detect_collisions();
    aster1.draw()
  }
}

function mass_to_radius(mass){
  return sqrt(mass/pi)
}

//create asteroids via THIS
class asteroid {
  constructor(pos,mom,mass) {
    this.pos = pos
    this.mom = mom
    this.mass = mass
    this.col = createVector(random(255),random(255),random(255))
    asteroids.push(this)
  }
  update(){
    //apply gravity to each object
    
    for (var index in asteroids){
      var aster = asteroids[index]
      
      if(aster!=this){
        let distance = this.pos.copy().sub(aster.pos).mag();
        let force = this.pos.copy().sub(aster.pos).mult(this.mass*aster.mass*gravity)
        force.mult(1/(distance^2))
        
        this.mom.add(force.mult(-1)) 
      }
    }
    
    this.pos = this.pos.add(this.mom.copy().mult(delta/this.mass))
  }
  detect_collisions(){ //handles collision and merging
    let curr_index;
    //determine current index in asteroids array
    for (var i=0; i<asteroids.length; i++){
      if(asteroids[i] == this) {
        curr_index = i 
      }
    }
        
    
    for (var x=curr_index+1; x<asteroids.length; x++){
      let distance
      let collision_threshold
      let aster
      
      aster = asteroids[x]
      
      let r1 = mass_to_radius(aster.mass);
      let r2 = mass_to_radius(this.mass);
      
      distance = (aster.pos.copy().sub(this.pos)).mag();
      collision_threshold = r1 + r2
      
      //if collision occured then MERGE THEM
      if (distance <= collision_threshold/2){
        asteroids.splice(x,1)
        this.mass=float(this.mass)+float(aster.mass)
        this.mom.add(aster.mom)
        this.pos.lerp(aster.pos,r1/(r1+r2))
        this.col.lerp(aster.col,r1/(r1+r2))
        
        aster.mass=30
      }
    }
  }
  draw(){ //draw the asteroid
    let draw_pos
    cam_pos = cam_pos || createVector(0,0,1)
    
    //aesthetic customization
    let thiccness = document.getElementById('thiccness').value
    let offset_thiccness = document.getElementById('thicc_ofst').value
    
    strokeWeight((thiccness*(mass_to_radius(this.mass) / cam_pos.z)) + float(offset_thiccness))
    stroke(this.col.x,this.col.y,this.col.z)
    color(200)
        
    
    draw_pos = to_global_space(this.pos.copy())//this.pos.copy().add(createVector(cam_pos.x,cam_pos.y))//.div(max(1,cam_pos.z))
    
    point(draw_pos)
  }
}