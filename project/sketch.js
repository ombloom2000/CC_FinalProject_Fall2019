//olivia bloom
//final project fall 2019
var octopus;

function preload(){
	octopus = loadAnimation('assets/octopus001.png','assets/octopus003.png');
}

function setup() {
  createCanvas(1000,1000);
}

function draw() {
  background(255,255,255);  
  animation(octopus, 500,500);
  
}
