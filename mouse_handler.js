let init_x,init_y,offset_x,offset_y,mouse_dragging
var cam_pos //= createVector(0,0,1)
let move_coeff = 50

function mousePressed(){
  if((mouseX > 0 & mouseX <canvas.width) & (mouseY>0 & mouseY <(canvas.height/2))){
    mouse_dragging=true
    init_x = mouseX
    init_y = mouseY
    offset_x=0
    offset_y=0
  }
}


function mouseDragged(){
  offset_x = init_x-mouseX
  offset_y = init_y-mouseY
}

function to_local_space(vec){
  return (vec.copy().mult(cam_pos.z)).sub(cam_pos.x,cam_pos.y)
}

function to_global_space(vec){
   return (vec.copy().add(cam_pos.x,cam_pos.y)).div(cam_pos.z)
}

function mouseReleased(){
  if(mouse_dragging){
    mouse_dragging=false

    let swing_factor = float((document.getElementById("swing").value)) * sqrt(offset_x**2+offset_y**2)
    let mass = document.getElementById("mass").value
    let quantity = document.getElementById("asteroids").value
    
    pos = to_local_space(createVector(mouseX,mouseY))
    mom = createVector(offset_x,offset_y).mult(swing_factor*(cam_pos.z))
    for (let x =0; x < random(quantity); x++){
      let aster = new asteroid(pos.copy().add(random(-quantity,quantity)*2,random(-quantity,quantity)*2),mom.copy(),mass);
    }
  }
}

function draw_mouse(){
  strokeWeight(1)
  stroke(200)
  if (mouse_dragging){
    line(mouseX,mouseY,mouseX+offset_x,mouseY+offset_y)
  }
}

function zoom_about(pos,depth){ // input canvas position and zoom depth
  global_center = to_local_space(pos)
  cam_pos.add(0,0,depth)
  
  global_offset = global_center.sub(to_local_space(pos))
  cam_pos.sub(global_offset)
}

function keyPressed(){
  //cam_pos = cam_pos  createVector(0,0,1)
  //increment camera position vector by movement vector
  let center,global_center,global_center2,global_offset
  move_coeff = 50 * cam_pos.z
  center = createVector(500,500)
  
  mover_vec = createVector()
  
  switch(key) {
    case "s":
      cam_pos.add(0,-move_coeff)
      break;
    case "w":
      cam_pos.add(0,move_coeff)
      break;
    case "d":
      cam_pos.add(-move_coeff,0)
      break;
    case "a":
      cam_pos.add(move_coeff,0)
      break;
    case "]":
      zoom_about(center,1)
      break;
    case "[":      
      if(cam_pos.z > 2){
        zoom_about(center,-1)
      }
      break;
  }
}

function mouseWheel(event) {
  let scalar = event.delta/100
  
  
  
  if(cam_pos.z+scalar > 1){
    mouse_pos = createVector(mouseX,mouseY)
    zoom_about(mouse_pos,scalar)
    //cam_pos.add(0,0,scalar)
  }
  //zoom+=event.delta
}