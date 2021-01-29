let wavelist = [];
var paused = false;
var lastWaveX;
var lastWaveY;
var delay = 0;
let v;
class waves {
  constructor(x, y) {
    this.x = x;
    this.y = y
    this.r = 5;
  }
  refresh() {
    noFill();
    this.r += 10;
    circle(this.x, this.y, this.r);
  }

}

function setup() {
  createCanvas(800, 800);
  frameRate(30);
  wavelist.push(new waves(width / 2, height / 2));
  v = createSlider(1, 30, 5, 1);
  v.position(10, height + 10);
  fr = createSlider(10, 120, 30, 10);
  fr.position(160, height + 10);
  f = createSlider(1, 10, 5, 1);
  f.position(310, height + 10);
}

function draw() {
  background(240);
  frameRate(fr.value());
  delay++;
  
  for (let i = 0; i < wavelist.length; i++) {
    wavelist[i].refresh();
    if (wavelist[i].r > 3 * height) {
      wavelist.splice(i, 1)
    }
    lastWaveX = wavelist[i].x;
    lastWaveY = wavelist[i].y;
  }
  if (delay % f.value() == 0) {
    if (keyIsDown(LEFT_ARROW)) {
      wavelist.push(new waves(lastWaveX - v.value(), lastWaveY));
    } else if (keyIsDown(RIGHT_ARROW)) {
      wavelist.push(new waves(lastWaveX + v.value(), lastWaveY));
    } else if (keyIsDown(UP_ARROW)) {
      wavelist.push(new waves(lastWaveX, lastWaveY - v.value()));
    } else if (keyIsDown(DOWN_ARROW)) {
      wavelist.push(new waves(lastWaveX, lastWaveY + v.value()));
    } else {
      wavelist.push(new waves(lastWaveX, lastWaveY));
    }
  }
  if (delay>f.value()){delay=0;}
  // Formatting the looks of the top and bottom textuals
  fill(0);
  
  textSize(16);
  textStyle(BOLD);fill(255);
  rect(0,height-50,450,50);fill(0);
  text('velocity: ', 30, height - 20);
  text(v.value(), 105, height - 20);
  text('frame rate: ', 170, height - 20);
  text(fr.value(), 260, height - 20);
  text('frequency: ', 320, height - 20);
  text(f.value(), 410, height - 20);
  square(20, 20, 30);
  fill(255);
  textSize(18);
  text('||', 30, 40);
  fill(255);
  rect(50, 20, 70, 30);
  rect(width - 150, 20, 135, 30);
  fill(0);
  textStyle(NORMAL);
  text('Pause', 60, 41);
  text('Doppler Effect', width - 140, 41);
  
}

function mouseClicked() {
  if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 50) {
    if (!paused) {
      noLoop();
      paused = true;
    } else {
      loop();
      paused = false;
    }
  } else if (paused) {
    // Some cool stuff with angles and stuff.... probably.
  }
}