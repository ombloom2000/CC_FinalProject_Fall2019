//olivia bloom
//final project fall 2019
//declaring variables
var octopus;
var octoanimation;
var scenewidth;
var sceneheight;
var backgd;

//preload to load animations
function preload(){
	//create sprite at given location, width and height
	octopus = createSprite(350,350,50,100);
	//create an animation for cotupus from img 001 to 005
	octonimation = octopus.addAnimation('float','octopus001.png', 'octopus005.png'); 
}

//static
function setup() {
	//create canvas
  createCanvas(700,700); 
	
	//instantiation of variables
	scenewidth = 1600; 
	sceneheight = 800;
	
	//instantiation of group of sprites through Group class
	backgd = new Group();
	
	//create background
  for(var i=0; i<80; i++){
    //create sprite and add the 3 animations
    var stone = createSprite(random(-width, scenewidth+width), random(-height, sceneheight+height));
		
    //cycles through to choose stone 0, 1, or 2 for each round of the for loop
		stone.addAnimation('normal', 'stone'+i%3+'.png');
    backgd.add(stone);
  }
}

//active
function draw() {
	//clear background
	background(0,50,100);
	
	//make background
	drawSprites(backgd);
	
	//draw octopus sprite w/ animation
	drawSprite(octopus);
	
	//set the camera position to the octopus position so the camera keeps the octopus in frame
  camera.position.x =octopus.position.x;
  camera.position.y =octopus.position.y;

  //limit the octopus movements to stay within sketch
  if(octopus.position.x < 0){
    octopus.position.x = 0;
	}
  if(octopus.position.y < 0){
    octopus.position.y = 0;
	}
  if(octopus.position.x > scenewidth){
    octopus.position.x = scenewidth;
	}
  if(octopus.position.y > sceneheight){
    octopus.position.y = sceneheight;
	}
}