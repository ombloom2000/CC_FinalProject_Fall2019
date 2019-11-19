//declaring variables
var octopus;
var octoanimation;
var scenewidth;
var sceneheight;
var backgd;
var shrimpsprites;
var shrimp;
var count;

//preload to load animations
function preload(){
	//create sprite at given location, width and height
	octopus = createSprite(350,350,50,100);
	//create an animation for cotupus from img 001 to 005
	octoanimation = octopus.addAnimation('float','octopus001.png', 'octopus005.png'); 
}

//static
function setup() {
	//create canvas
  createCanvas(900,900); 
	
	//instantiation of variables
	scenewidth = 3000; 
	sceneheight = 3000;
	
	//call functions
	makebackgroundsprites();
	makeshrimpsprites();
	
	//instantiate
	count = 0;
	
}

//active
function draw() {
	//clear background and check for direction
	background(0,50,100);
	whatdirection();
	
	//make background w/stones
	drawSprites(backgd);
	
	//draw octopus sprite w/ animation
	drawSprite(octopus);
	
	//make shrimp sprites w/animation
	drawSprites(shrimpsprites);
	
	//call functions
	cameraposition();
	stayinsketch();
	speed();
	keepscore();
	
	//test if overlapping with shrimps prites, if so run eatshrimp function
	octopus.overlap(shrimpsprites, eatshrimp);
	
	//check to see if the score is 20/20
	checkscore();
}

//custom functions
function makebackgroundsprites(){
	//instantiation of group of sprites through Group class, a type of extended array
	backgd = new Group();
	
	//create background
  for(var i=0; i<400; i++){
    //create sprite and add the 3 animations
    var stone = createSprite(random(-width, scenewidth+width), random(-height, sceneheight+height));
		
    //cycles through to choose stone 0, 1, or 2 for each round of the for loop and adds to Group
		stone.addAnimation('normal', 'stone'+i%3+'.png');
    backgd.add(stone);
  }
}

function makeshrimpsprites(){
	//instantiation of group of sprites through Group class, a type of extended array
	shrimpsprites = new Group();
	
	//create shrimp
	for(var i=0; i<20;i++){
		//create shrimp sprite and animate it, put at a random location in the sketch
		shrimp = createSprite(random(0, scenewidth), random(0, sceneheight));
		
		//animates and adds to Group
		shrimp.addAnimation('normal','shrimp001.png','shrimp002.png','shrimp003.png');
		shrimpsprites.add(shrimp);
	}

}

function cameraposition(){
	//set the camera position to the octopus position so the camera keeps the octopus in frame
  camera.position.x =octopus.position.x;
  camera.position.y =octopus.position.y;
}

function stayinsketch(){
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

function speed(){
	//virtual camera movement is effected by the mouse
	//speed is inversely proportional to the mouse distance, furthur mouse gets, faster the scene moves
  octopus.velocity.x = (camera.mouseX-octopus.position.x)/20;
  octopus.velocity.y = (camera.mouseY-octopus.position.y)/20;
}

function whatdirection(){
	//test function to use with sound depending on what direction the user is going
	if(octopus.velocity.y>=0){
		//if going down
		background(255,0,0);
	}else if(octopus.velocity.y<0){
		background(0,255,0);
	}
}

function keepscore(){
	//print the current score out of 20
	fill(255);
	textSize(20);
	text(count+' / 20',octopus.position.x-25,octopus.position.y-60);
}

function checkscore(){
	//if score is 20/20, tell the player they've won
	//need to add option to play again on a button
	if(count == 20){
		background(255);
		fill(0);
		textSize(70);
		text('you won!', octopus.position.x,octopus.position.y);
		//figure out where to put button so it doesn't get lost and how to make that button actually restart the program
	}
}

function eatshrimp(collector,collected){
	//increase score
	count++;
	//print(count+" ");
  //collected is the sprite in the group shrimpsprites that triggered the event
	//delete the shrimp
  collected.remove();
}