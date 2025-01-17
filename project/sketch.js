//declaring variables
var indigofont;
var octopus;
var octoanimation;
var sickanimation;
var scenewidth;
var sceneheight;
var backgd;
var oceansound;
var chompsound;
var villainsound;
var seagullsound;
var bubblesound;
var blehsound;
var winsound;
var losesound;
var soundmap;
var shrimpsprites;
var shrimp;
var shrimpx;
var shrimpy;
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
var sizemap;
var level;
var obstacle;
var obstacleimg;
var obstacles;
var currenttime;
var gui;
var s;
var winimg;
var loseimg;
var totalshrimp;

//preload to load animations
function preload(){
	//create sprite at given location, width and height
	octopus = createSprite(350,350,50,100);
	//create an animation for octopus from img 001 to 005
	octoanimation = octopus.addAnimation('float','octopus001.png', 'octopus005.png');
	sickanimation = octopus.addAnimation('sick','sick001.png','sick005.png');
	//load sound, font, images to be manipulated
	oceansound = loadSound('water.wav');
	chompsound = loadSound('chomp.wav');
	villainsound = loadSound('villain.wav');
	seagullsound = loadSound('seagull.wav');
	bubblesound = loadSound('bubbles.wav');
	winsound = loadSound('win.wav');
	losesound = loadSound('lose.wav');
	trashimg = loadImage('trash.png');
	blehsound = loadSound('bleh.mp3');
	obstacleimg = loadImage('obstacle.png');
	indigofont = loadFont('indigo.otf');
	winimg = loadImage('octopus003.png');
	loseimg = loadImage('sick003.png');
}

//STATIC
function setup(){
	//create canvas
  createCanvas(900,900); 
	
	//create GUI slider that shows progress on eating shrimp
	gui = createGui();
	s = createSlider("Slider",0,0,250,20, 0, 20);
	noStroke();
	s.setStyle("fillBg",255);
	
	//instantiation of variables
	scenewidth = 3000; 
	sceneheight = 3000;
	level = 1;
	//call functions
	makebackgroundsprites();
	totalshrimp = 30;
	makeshrimpsprites();
	makevillainsprites();
	maketrashsprites();
	makeobstaclesprites();
	
	//instantiate
	count = 0;
	xspeed = 2.8;
	yspeed = 2.2;
	xdirection = 1; // Left or Right
  ydirection = 1; //up or down
	direction = 90;
}

//ACTIVE
function draw() {
	switch(level){
		//if level 1
		case 1:
		//update map variable of amplitude and octopus y position
	  soundmap = map(octopus.position.y,1496.36,3013.2,0.8,0.1);
	
	  //update map variable of background color and octopus y position
	  backmap = map(octopus.position.y,-20.5,3013.2,130,80);
		
		//keep slider in upper right corner
	  s.x = octopus.position.x-400;
	  s.y = octopus.position.y-275;
	
	  //change amplitude and play sound depending on mapped y value
	  //if in top half, keep quiet, loud in middle, then map it to get quiet as you go deeper
	  //for seagulls, loud at top and silent by middle
		//keeping seagulls after 1st crit, hepls user know they are near the surface
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
		
		//make gui and set to count variable
		drawGui();
		s.val = count;

	  //call functions
	  cameraposition();
	  stayinsketch();
	  movespeed();
	  movevillains();
	  movetrash();
	  outoftime();
	
	  //test if overlapping with shrimps prites, if so run eatshrimp function
	  octopus.overlap(shrimpsprites, eatshrimp);
	
	  //check to see if the score is 20/20
	  checkscore();
		break;
		
		//if level 2
		case 2:
			
		//make villains faster
		xspeed = 3.0;
	  yspeed = 2.4;
			
    if((millis()>level2time) &&(millis()<level2time+100)){
			//put shrimp back to 30
			totalshrimp = 30;
			makeshrimpsprites();
			//set score back to 0
			count = 0;
			//set scale back to one
			octopus.scale = 1;
		}
			
	  //update map variable of background color and octopus y position
	  backmap = map(octopus.position.y,-20.5,3013.2,40,0);
			
		//keep slider in upper right corner
	  s.x = octopus.position.x-400;
	  s.y = octopus.position.y-260;
	
	  //very quiet the whole time bc deeper
	  oceansound.amp(0.1);
	  oceansound.playMode('untilDone');
	  oceansound.play();
	
	
    //play bubbles randomly
	  var ready2 = random(0,200);
	  if(ready2<0.5){
		  bubblesound.playMode('untilDone');
		  bubblesound.play();
	  }
	
	  //clear background and change darkness with "depth"
	  background(0,10,backmap);
	
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
		
		//make obstacles and make them collision-prone
	  drawSprites(obstacles);
	  octopus.collide(obstacles);
			
		//make gui and set to count variable
		drawGui();
		s.val = count;
	
	  //call functions
	  cameraposition();
	  stayinsketch();
	  movespeed();
	  movevillains();
	  movetrash();
	  outoftime();
	
	  //test if overlapping with shrimps sprites, if so run eatshrimp function
	   octopus.overlap(shrimpsprites, eatshrimp);
	
	  //check to see if the score is 20/20
    checkscore();
		break;
	}
}

//CUSTOM FUNCTIONS

function makebackgroundsprites(){
	//instantiation of group of sprites through Group class, a type of extended array
	backgd = new Group();
	
	//create background
  for(var i=0; i<400; i++){
    //create sprite and add the 3 animations
    var stone = createSprite(random(0, scenewidth), random(0, sceneheight));
		
    //cycles through to choose stone 0, 1, or 2 for each round of the for loop and adds to Group
		stone.addAnimation('normal', 'stone'+i%3+'.png');
    backgd.add(stone);
  }
}

function maketrashsprites(){
	//create sprites, add image, add to Group class
	trashsprites = new Group();
	
	for(i=0;i<15;i++){
		trash = createSprite(random(0, scenewidth), random(0, sceneheight));
		trash.addImage(trashimg);
		trashsprites.add(trash);
	}
}

function makeshrimpsprites(){
	//instantiation of group of sprites through Group class, a type of extended array
	shrimpsprites = new Group();
	
	//create shrimp
	for(var i=0; i<totalshrimp;i++){
		//create shrimp sprite and animate it, put at a random location in the sketch
		shrimpx = random(0, scenewidth);
		shrimpy = random(0, sceneheight);
		shrimp = createSprite(shrimpx,shrimpy);
		
		//animates and adds to Group
		shrimp.addAnimation('normal','shrimp001.png','shrimp002.png','shrimp003.png');
		//half of shrimp face other X direction, one third face other y direction
		if(i%2==0){
			shrimp.mirrorX(-1);
		}
		if(i%3==0){
			shrimp.mirrorY(-1);
		}
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

function makeobstaclesprites(){
	obstacles= new Group();
	for(i = 0; i<12;i++){
		var x = random(0, scenewidth);
		var y = random(0, sceneheight);
		//if the random val is at the position of a shrimp, get a different value so they don't overlap
		while(((((x+20)>shrimpx)&&((x-20) <shrimpx))&&(((y+20)>shrimpy)||((y-20) < shrimpy)))){
			x = random(0, scenewidth);
		  y = random(0, sceneheight);
		}
		obstacle = createSprite(x,y);
		obstacle.addImage(obstacleimg);
		obstacles.add(obstacle);
	}
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
	//move each trash sprite in a circular motion
	for(i=0;i<trashsprites.length;i++){
		var t = trashsprites[i];
		t.setSpeed(3, direction);
	  octopus.overlap(t,trashreact);
	}
	direction += 8;
}

function eatshrimp(collector,collected){
	//scale octopus according to how many shrimp eaten
	sizemap = map(count,1,totalshrimp,1,2);
	octopus.scale = sizemap;
	octopus.changeAnimation('float');
	//increase score
	count++;
	chompsound.amp(0.5);
	chompsound.play();
  //collected is the sprite in the group shrimpsprites that triggered the event
	//delete the shrimp
  collected.remove();
}

function villainbump(){
	//make a rectangle covering the screen, reduce the score by 1 (or more if you stay covering the villain), remove old shrimp and spawn a new 30
	villainsound.amp(0.2);
	villainsound.play();
	var w = scenewidth+width+width;
	var h = sceneheight+height+height;
	fill(230,255,0);
	rect(-width,-height,w,h);
	count = count-1;
	//make sure score doesn't go below 0
	if(count<=0){
		count = 0;
	}
	//put back to original size
	octopus.scale = 1;
	//delete all remaining shrimp and make a new 30
	for(i=0;i<shrimpsprites.length;i++){
		var s = shrimpsprites[i];
		s.remove();
	}
	makeshrimpsprites();
	drawSprites(shrimpsprites);
}

function trashreact(){
	  //change animation of octopus to be the sick/ink animation
	  //make sick sound
		octopus.changeAnimation('sick');
	  blehsound.playMode('untilDone');
	  blehsound.play();
	  ink();
}

function ink(){
	//cover screen with nearly opaque surface, makes it harder to see when you run into trash
	    fill(75,0,130,230);
			rect(-900,-900,4800,4800);
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
	//discussed not having this in crit, but I want to keep it because it makes it harder
  octopus.velocity.x = (camera.mouseX-octopus.position.x)/20;
  octopus.velocity.y = (camera.mouseY-octopus.position.y)/20;
}

function outoftime(){
	//keep time, lose if not done in time
	fill(255);
	rect(octopus.position.x-400,octopus.position.y-340,140,30);
	fill(0);
	currenttime = round(millis()/1000);
	textFont(indigofont);
	textSize(20);
	if(level == 1){
	text('Time: '+currenttime + ' /60',octopus.position.x-395,octopus.position.y-320);
		if(currenttime>=60){
		noLoop();
		background(0,50,100);
		fill(255);
		textSize(70);
		textFont(indigofont);
		text('YOU LOST', octopus.position.x-300,octopus.position.y-200);
		image(loseimg,octopus.position.x,octopus.position.y);
		losesound.playMode('untilDone');
		losesound.play();
	}
	}else if(level == 2){
		fill(255);
	  rect(octopus.position.x-400,octopus.position.y-310,130,30);
		fill(0);
	  text('Level 2', octopus.position.x-395,octopus.position.y-290);
		text('Time: '+currenttime +' /120',octopus.position.x-395,octopus.position.y-320);
		if(currenttime>=120){
		noLoop();
		background(0,10,40);
		fill(255);
		textSize(70);
		textFont(indigofont);
		text('YOU LOST', octopus.position.x-300,octopus.position.y-200);
		image(loseimg,octopus.position.x,octopus.position.y);
		losesound.playMode('untilDone');
		losesound.play();
	}
	}
}

function checkscore(){
	//if score is 20/20, tell the player they've won
	//go to level 2
	switch(level){
		case 1:
			if(count == 20){
		//take a timestamp for going into level 2
		level2time = millis();
		level = 2;
		var w = scenewidth+width+width;
	  var h = sceneheight+height+height;
	  fill(255);
	  rect(-width,-height,w,h);
			}
			break;
		case 2:
			if(count ==20){
				noLoop();
		oceansound.amp(0.0);
		background(0,10,40);
		fill(255);
		textSize(70);
		textFont(indigofont);
		text('YOU WON', octopus.position.x-300,octopus.position.y-200);
		text('Time: '+ currenttime+' seconds', octopus.position.x-300,octopus.position.y+300);
		image(winimg,octopus.position.x,octopus.position.y);
		winsound.playMode('untilDone');
		winsound.play();
			}
			break;
	}
}
