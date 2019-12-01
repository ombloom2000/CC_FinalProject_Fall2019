//declaring variables
var octopus;
var octoanimation;
var scenewidth;
var sceneheight;
var backgd;
var oceansound;
var chompsound;
var villainsound;
var seagullsound;
var bubblesound;
var blehsound;
var soundmap;
var shrimpsprites;
var shrimp;
var trash;
var trashsprites;
var trashimg;
var count;
var button;
var villain;
var villainsprites;
var xspeed;
var yspeed;
var xdirection;
var ydirection;
var direction;
var backmap;
var previouscount;

//preload to load animations
function preload(){
	//create sprite at given location, width and height
	octopus = createSprite(350,350,50,100);
	//create an animation for octopus from img 001 to 005
	octoanimation = octopus.addAnimation('float','octopus001.png', 'octopus005.png'); 
	//load sound to be manipulated
	oceansound = loadSound('water.wav');
	chompsound = loadSound('chomp.wav');
	villainsound = loadSound('villain.wav');
	seagullsound = loadSound('seagull.wav');
	bubblesound = loadSound('bubbles.wav');
	trashimg = loadImage('trash.png');
	blehsound = loadSound('bleh.mp3');
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
	makevillainsprites();
	maketrashsprites();
	
	//instantiate
	count = 0;
	xspeed = 2.8;
	yspeed = 2.2;
	xdirection = 1; // Left or Right
  ydirection = 1; //up or down
	direction = 90;
}

//active
function draw() {
	//update map variable of amplitude and octopus y position
	soundmap = map(octopus.position.y,1496.36,3013.2,0.8,0.1);
	
	//update map variable of background color and octopus y position
	backmap = map(octopus.position.y,-20.5,3013.2,130,80);
	
	//change amplitude and play sound depending on mapped y value
	//if in top half, keep quiet, loud in middle, then map it to get quiet as you go deeper
	//for seagulls, loud at top and silent by middle
	if(octopus.position.y<1496.35){
		var mapper = map(octopus.position.y,-20.5,1496.36,0.01,0.8);
		var smapper = map(octopus.position.y,-20.5,1496.36,0.8,0.01);
		oceansound.amp(mapper);
		seagullsound.amp(smapper);
	}else{
		oceansound.amp(soundmap);
		seagullsound.amp(0);
	}
	seagullsound.playMode('untilDone');
	seagullsound.play();
	oceansound.playMode('untilDone');
	oceansound.play();
	
	
//play bubbles randomly
	var ready = random(0,200);
	if(ready<0.5){
		bubblesound.playMode('untilDone');
		bubblesound.play();
	}
	
	//clear background and change darkness with "depth"
	background(0,30,backmap);
	
	//make background w/stones
	drawSprites(backgd);
	
	//draw octopus sprite w/ animation
	drawSprite(octopus);
	
	//make shrimp sprites w/animation
	drawSprites(shrimpsprites);
	
	//make villain sprites w/animation
	drawSprites(villainsprites);
	
	//make trash sprites
	drawSprites(trashsprites);
	
	//call functions
	cameraposition();
	stayinsketch();
	movespeed();
	keepscore();
	movevillains();
	movetrash();
	constrainscore();
	
	//test if overlapping with shrimps prites, if so run eatshrimp function
	octopus.overlap(shrimpsprites, eatshrimp);
	
	//check to see if the score is 20/20
	checkscore();
}

//custom functions
function trashreact(){
		//count -=1;
	  //spawnnewshrimp(1);
	  blehsound.playMode('untilDone');
	  blehsound.play();
}

function constrainscore(){
	if(count <=0){
		count = 0;
	}
}

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

function maketrashsprites(){
	trashsprites = new Group();
	
	for(i=0;i<20;i++){
		trash = createSprite(random(0, scenewidth), random(0, sceneheight));
		trash.addImage(trashimg);
		trashsprites.add(trash);
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

function makevillainsprites(){
	//instantiation of group of sprites through Group class, a type of extended array
	villainsprites = new Group();
	
	//create villain
	for(var i=0; i<5; i++){
		//create villain sprite and animate it, put at a random location in the sketch
		villain = createSprite(random(0, scenewidth), random(0, sceneheight));
		villain.mirrorX(-1);
		
		//animates and adds to Group
		villain.addAnimation('villain001.png','villain002.png','villain003.png');
		villainsprites.add(villain);
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

function movespeed(){
	//virtual camera movement is effected by the mouse
	//speed is inversely proportional to the mouse distance, further mouse gets, faster the scene moves
  octopus.velocity.x = (camera.mouseX-octopus.position.x)/20;
  octopus.velocity.y = (camera.mouseY-octopus.position.y)/20;
}

function keepscore(){
	//print the current score out of 20
	noStroke();
	fill(255);
	textSize(20);
	rect(octopus.position.x-400,octopus.position.y-370,70,30);
	fill(0);
	text(count+' / 20',octopus.position.x-395,octopus.position.y-350);
}

function movevillains(){
	//for each villain sprite, do something
	for(var i = 0; i<villainsprites.length; i++) {
		//give a variable v to the current villain sprite
    var v = villainsprites[i];
    //moving all the villains
		v.position.x += xspeed * xdirection;
    v.position.y += yspeed * ydirection;
		
		if (v.position.x > 3000 || v.position.x < 0) { //not working
      xdirection *= -1;
    }
    if (v.position.y > 3000 || v.position.y < 0) {
      ydirection *= -1;
    }
		if(xdirection == -1){
			v.mirrorX(1); //not working
		}
		//test if villains and octopus overlap, if so run villainbump function
		octopus.overlap(v,villainbump);
  }
}

function movetrash(){
	for(i=0;i<trashsprites.length;i++){
		var t = trashsprites[i];
		t.setSpeed(3, direction);
	  octopus.overlap(t,trashreact);
	}
	direction += 8;
}

function eatshrimp(collector,collected){
	//increase score
	count++;
	chompsound.amp(0.5);
	chompsound.play();
	//print(count+" ");
  //collected is the sprite in the group shrimpsprites that triggered the event
	//delete the shrimp
  collected.remove();
}

function villainbump(){
	//make a rectangle covering the screen, keep track of what the score was, set the score to zero
	previouscount = count;
	villainsound.amp(0.2);
	villainsound.play();
	var w = scenewidth+width+width;
	var h = sceneheight+height+height;
	fill(230,255,0);
	rect(-width,-height,w,h);
	count = 0;
	spawnnewshrimp(previouscount);
}

function spawnnewshrimp(num){
	for(i=0; i<num;i++){
	//to make new shrimp when the score gets lowered from trash or villain
	 var newshrimp = createSprite(random(0, scenewidth), random(0, sceneheight));

  //assign an animation and add to shrimp group
   newshrimp.addAnimation('normal','shrimp001.png','shrimp002.png','shrimp003.png');
	 shrimpsprites.add(newshrimp);
	 print("added "+num+" new shrimp");
	}
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
		text('YOU WON', octopus.position.x,ocotpus.position.y);
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
