//declaring variables
var octopus;
var octoanimation;
var scenewidth;
var sceneheight;
var backgd;
var oceansound;
var soundmap;
var shrimpsprites;
var shrimp;
var count;
var button;
var xpos;
var ypos;
var villain;
var villainanimation;
var backmap;

//preload to load animations
function preload(){
	//create sprite at given location, width and height
	octopus = createSprite(350,350,50,100);
	//create an animation for octopus from img 001 to 005
	octoanimation = octopus.addAnimation('float','octopus001.png', 'octopus005.png'); 
	//load sound to be manipulated
	oceansound = loadSound('water.wav');
	//creat villain sprite at random location
	villain = createSprite(random(0, scenewidth), random(0, sceneheight));
	//create an animation for villain fron 001 to 003
  villainanimation = villain.addAnimation('move','villain001.png','villain003.png'); 
}

//static
function setup(){
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
	
	//update map variable of amplitude and octopus y position
	soundmap = map(octopus.position.y,-20.5,3013.2,0.01,0.5);
	//print(soundmap);
	backmap = map(octopus.position.y,-20.5,3013.2,130,80);
	
	//change amplitude and play sound depending on mapped y value
	oceansound.amp(soundmap);
	oceansound.play();
	
	//clear background
	//background(0,50,100);
	background(0,30,backmap);
	
	//make background w/stones
	drawSprites(backgd);
	
	//draw octopus sprite w/ animation
	drawSprite(octopus);
	
	//make shrimp sprites w/animation
	drawSprites(shrimpsprites);
	
	//make villain
	drawSprite(villain);
	
	//call functions
	cameraposition();
	stayinsketch();
	speed();
	keepscore();
	//buttonClicked();
	
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

function keepscore(){
	//print the current score out of 20
	fill(255);
	textSize(20);
	text(count+' / 20',octopus.position.x-25,octopus.position.y-60);
}

function eatshrimp(collector,collected){
	//increase score
	count++;
	//print(count+" ");
  //collected is the sprite in the group shrimpsprites that triggered the event
	//delete the shrimp
  collected.remove();
}

function checkscore(){
	//if score is 20/20, tell the player they've won
	//stops loop of program
	//play again on a button with a double click
	if(count == 20){
		noLoop();
		oceansound.amp(0.0);
		background(0,50,100);
		fill(255);
		textSize(70);
		textFont('Helvetica');
		text('YOU WON', octopus.position.x, octopus.position.y);
	  }
	}
		//how to make that button actually restart the program
		/*button = createButton('PLAY AGAIN?');
    button.position(width/2-50,height/2+75);
		button.mousePressed(buttonClicked);
	}
}

function buttonClicked(){
	//checks for the button being clicked, which sets the count back to zero, removes the button, and resumes the draw loop
		loop();
		//count=0;
		//removeElements(button);
}*/
