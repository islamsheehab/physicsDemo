init_seed = 3

function pareto(x,squeeze) {
    return (1/(x+squeeze))*squeeze
}

function pseudorandom() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

//draws the stars in background
function draw_stars() {
  var i;
  seed=init_seed
  star_count=document.getElementById("star-count").value
  
  for (i = 0; i < star_count; i++) {
    value=pseudorandom()*80
    stroke(value); // Change the color
    strokeWeight(pareto(pseudorandom(),0.03)*8)
    x = map(pseudorandom(),0,1,0,canvas.width)
    y = map(pseudorandom(),0,1,0,canvas.height)
    point(x,y)
  }
}
