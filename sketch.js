var Night_Sky = [];
var tam_Night_Sky = 200;

var ground_randomY = [];
var point_ground = 6;

var ground2_randomY = [];
var point2_ground = 5;

var star = [];
var goes = [];
var tam_star = 5;

var cloud = [];
var tam_cloud = 5;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  for (var i = 0; i < tam_Night_Sky; i++)
    Night_Sky.push(new ones_function());

  for (var i = 0; i < point_ground; i++)
    ground_randomY[i] = random(height - 150, height - 50);

  for (var i = 0; i < point2_ground; i++)
    ground2_randomY[i] = random(height - 150, height - 50);

  for (var i = 0; i < tam_star; i++){
    star.push(new star_function());
    goes[i] = false;
  }

  for (var i = 0; i < tam_cloud; i++)
    cloud.push(new clouds(i));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  ground();

  for (var i = 0; i < Night_Sky.length; i++) {
    Night_Sky[i].move();
    Night_Sky[i].display();
  }

  grounds();

  for (var i = 0; i < star.length; i++)
    if ((random(0, 1000) < 20) && (random(0, 1000) > 980) && (boolean(goes[i]) == false))
      goes[i] = true;
  for (var i = 0; i < star.length; i++)
    if(boolean(goes[i])){
      star[i].movie(i);
      star[i].display();
    }

  for (var i = 0; i < cloud.length; i++) {
    cloud[i].move();
    cloud[i].display();
  }
}

function ground() {
  var co = 0;
  noStroke();
  for(i = 0; i < height; i += 10){
    fill(19 + co, 24 + co, 60 + co);
    co += 1.2;
    rect(0, i, width, 100);
  }

  //background(46,68,130); uniform color
}

function ones_function() {
  this.x = random(10, width - 10);
  this.y = random(10, height - 10);
  this.diameter = 1;
  this.speed = random(0.01, 0.05);

  this.move = function() {
    if(this.diameter > 3)
      this.speed = -random(0.01, 0.05);
    if(this.diameter < -0.1)
      this.speed = random(0.01, 0.05);

    this.diameter += this.speed;
  };

  this.display = function() {
    noStroke();
    fill(238, 238, 238, 255);
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function grounds() {
  noStroke();

  fill(38, 48, 60)
  beginShape();
    curveVertex(width - 800, height);
    curveVertex(width - 800, height);

      for(var i = 0; i < point2_ground; i++)
        curveVertex(map(i, 0, point2_ground, width - 600, width), ground2_randomY[i]);

    curveVertex(width + 50, height);
    curveVertex(width + 50, height);
  endShape();


  fill(19, 24, 30, 255)
  beginShape();
    curveVertex(0, height);
    curveVertex(0, height);

    for(var i = 0; i < point_ground; i++)
      curveVertex(map(i, 0, point_ground, 0, width - 500), ground_randomY[i]);

    curveVertex(width - 500, height);
    curveVertex(width - 500, height);
  endShape();
}

function star_function() {
  this.x = random(width - 500);
  this.y = random(-100, -50);

  //direita
  this.rand = random(30, 50);
  this.xA = this.x + this.rand;
  this.speed = random(5, 7);
  this.yA = this.y + random(8, 14) + this.rand;
  this.alpha = 200;

  this.movie = function(i) {
    this.x += this.speed;
    this.xA += this.speed;
    this.y += this.speed;
    this.yA += this.speed;

    if(this.y > 300)
      this.alpha = map(this.y, 300, 500, 200, 0);

    if(this.y > 500 + random(0, 100)){
      this.x = random(width - 500);
      this.y = random(-100, -50);
      this.alpha = 200

      //direita
      this.rand = random(30, 50);
      this.xA = this.x + this.rand;
      this.speed = random(5, 7);
      this.yA = this.y + random(8, 14) + this.rand;

      goes[i] = false;
    }
  };

  this.display = function() {
    stroke(255, this.alpha);
    strokeWeight(1);
    fill(255, this.alpha);
    line(this.xA, this.yA, this.x, this.y);
    noStroke();
    fill(255, this.alpha);
    ellipse(this.xA, this.yA, 5, 5);
  };
}

function clouds(i) {
  this.x = random(width);
  this.y = height*0.6 + random(-50, 100);

  this.speed = 0.05;

  this.move = function () {
    if(this.x > width + 50){
      this.x = -50;
      this.y = height*0.6 + random(-50, 100);
    }

    this.x += this.speed;
  };

  this.display = function () {
    noStroke();
    fill(19 + 30, 24 + 30, 60 + 30);

    rect(this.x, this.y, 60,  20, 20, 20, 20, 20);
    rect(this.x + 5, this.y - 10, 50, 20,  20, 20, 20, 20);
    rect(this.x + 15, this.y - 20, 40, 20,  20, 20, 20, 20);
    rect(this.x + 25, this.y - 30, 25, 20,  20, 20, 20, 20);
    rect(this.x + 30, this.y - 35, 15, 20,  20, 20, 20, 20);
  };
}
