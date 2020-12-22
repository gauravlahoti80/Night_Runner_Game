var bunny,bunny_img,play,play_img,sample,sample_img,htp,htp_img;
var back,back_img;
var cloudsGroup, cloudImage,coin_img,coinGroup;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle2, obstacle3, obstacle4, obstacle5,obstacle6,obstacle7;

PLAY = 1;
END = 0;
STAR = 0;
HTP = 1;
gameState = "START";
score = 0;

function preload(){

//loading bunny animation
  bunny_img = loadAnimation("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/ee849ebf-c1c5-43eb-b119-314a9fb8e76a.png","https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/4beaec87-5e31-4105-93a9-678864ef998d.png")

//loading play button image
  play_img = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/0f5bb17f-25c6-4ac5-9dfe-c0f0f070204c.jpg");
  
//loading how to play button image
  htp_img = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/f50d10c5-9e3f-4d4b-9305-48daa7fd1c46.png");
  
//loading back button image
  back_img = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/b327a901-6cf8-4330-b4dd-25ddf4f39246.png");
  
//loading cloud image
  cloudImage = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/fb7b693b-184d-438e-a25e-2de37a94d2d8.png");
  
//loading ground image
  groundImage = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/50155048-2553-4fd4-9fa2-3b42a8246b10.png");
  
//loading coin image
  coin_img = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/3eb5b6e9-6f99-427f-ba03-61bf30b38d72.png");
  
//loading obstacles images
  obstacle2 = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/8de1a7d1-60cf-48de-ac56-3ac08eebe165.png");
  obstacle3 = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/fca04f94-9f93-4a97-ad54-ba3fa18fbc3d.png");
  obstacle4 = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/5df996ee-a909-42a4-aad5-61c8d4aab4bc.png");
  obstacle5 = loadImage("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/2c29a01a-7b40-46de-94bb-496484f74adb.png");
  
//loading sounds
  click = loadSound("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/ade67517-5a9d-4fc0-9de4-f4898216b59e.mp3");
  click2 = loadSound("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/0aa51b1f-01a2-4abf-810e-e2556bc12e0a.mp3");
  coin = loadSound("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/8cc97a0e-ab66-47cc-b517-308754972f59.mp3");
  error = loadSound("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/83458afa-8e5a-40d1-8e55-1f750ff72a9c.wav");
  jump = loadSound("https://assets.editor.p5js.org/5f6726b6641a0b00248286d0/d4c6ef54-1d38-4969-abfc-f904fe709b95.mp3");
}


//setup function
function setup() {
  
//creating canvas
  createCanvas(500,400);
  
//creating play button sprite
  play = createSprite(250,200);
  play.addImage(play_img);
  
//creating how to play button sprite
  htp = createSprite(250,350);
  htp.addImage(htp_img);
  htp.scale = 0.5;
//creating sample image of bunny which is to be displayed in start
  sample = createSprite(250,90);
  sample.addAnimation("sample",bunny_img);
  
//creating back button sprite 
  back = createSprite(30,50);
  back.addImage(back_img);
  back.scale=0.4;
  
//creating bunny
  bunny = createSprite(30,330);
  bunny.scale = 0.5;
  bunny.addAnimation("bunny_running",bunny_img);
  
//creating ground
  ground = createSprite(160,350);
  ground.addImage("ground",groundImage);
  
//creating invisible ground for collision of bunny and obstacles
  invisibleGround = createSprite(250,360,500,10);
  invisibleGround.visible = false;
  
//creating another ground
  ground2 = createSprite(480,350);
  ground2.addImage("ground",groundImage);
  
//creating groups
  obstaclesGroup = new Group();
  coinGroup = new Group();
  cloudsGroup = new Group();
}

//draw function
function draw() {

//background
  background("white");
  
//adding scores
  if (bunny.isTouching(coinGroup))
    {
      coin.play();
      score = score + 1 ;
      coinGroup.destroyEach();
   }
  
//debugging bunny
  bunny.debug = true;
  bunny.setCollider("rectangle",0,0,bunny.width,bunny.height);
//chnging gameState when bunny touches the obstacles
  if (bunny.isTouching(obstaclesGroup))
    {
      error.play();
      gameState = "START";
    }
  
//gameState PLAY
  if (gameState === "PLAY")
    {
      
//creating back button
      back.visible = true;
      back.scale = 0.2;
      back.x = 18;
      back.y = 18;
      
//when the player touches the space and up key bunny should jump
      if(keyDown("space")&& bunny.y >= 320 || touches.length < 0) {
        jump.play();
        bunny.velocityY = -12;
    }
      
      if(keyDown(UP_ARROW)&& bunny.y >= 320) {
        jump.play();
        bunny.velocityY = -12;
    }
      if(keyDown(DOWN_ARROW)) 
    {
        bunny.velocityY = 12;
    }
      
//giving function to back button when player presses on it
      if (mousePressedOver(back) || touches.length > 0)
        {
          click.play();
          gameState = "START";
          cloudsGroup.destroyEach();
        }
    
//adding gravity so that bunny can come down when space is presed
      bunny.velocityY = bunny.velocityY + 0.8;
      
//visibilites
      ground2.visible = true;
      ground.visible  = true;
      bunny.visible   = true;
      sample.visible  = false;
      htp.visible     = false;
      
//background for gameState PLAY
      background("black");
      
//creating clouds  
    if (frameCount % 60 === 0) {
    var cloud = createSprite(500,120,40,10);
    cloud.y = Math.round(random(50,200));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = bunny.depth;
    bunny.depth = bunny.depth + 1;
    cloudsGroup.add(cloud);
  }
//calling obstacles and coins function
      spawnobstacles();
      coins();
}
  
//gameState HTP(how to play)
  if (gameState === "HTP")
    {
//visibilities
      ground2.visible = false;
      ground.visible  = false;
      bunny.visible   = false;
      sample.visible  = true;
      htp.visible     = false;
      back.visible    = true;
      
//giving background
      background("black")
      
//function to happen when player presses back button
      if (mousePressedOver(back) || touches.length > 0)
        {
          click.play();
          gameState = "START";
        }
      
//sample image x
      sample.x = 400;
      
//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Enjoy the Game🙂🙂",150,300);

//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Press *DOWN ARROW* key to bring the bunny down",10,220);

//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Press *SPACE* to jump the Bunny...",10,145);
      
//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Collect a lot of Points to enjoy the game",10,170);
      
//giving text
      textFont("Algerian")
      stroke("red")
      textSize(18);
      fill("white")
      text("Note that velocity of the obstacle  will increase ",10,195);
}
  
//gameState START
  if (gameState === "START")
    {
//destroying groups so that they dont come in the START screen
      coinGroup.destroyEach();
      cloudsGroup.destroyEach();
      obstaclesGroup.destroyEach();
      
//visibilities
      ground2.visible = false;
      sample.visible  = true;
      ground.visible  = false;
      bunny.visible   = false;
      htp.visible     = true;
      play.visible    = true;
      back.visible    = false;
      sample.x = 250;
      
//play  button function 
      if (mousePressedOver(play) || touches.length > 0)
        {
          click2.play();
          play.visible  = false;
          score = 0;
          gameState = "PLAY";
        }
      
//htp button function
      if (mousePressedOver(htp) || touches.length > 0)
        {
          click.play();
          play.visible  = false;
          gameState = "HTP";
        }
      
//giving text
      stroke("magenta");
      textSize(18);
      fill("black");
      text("Press on how to Play button to Konw more..........",60,315);

//giving text
      stroke("red");
      textSize(18);
      fill("black");
      text("Credit :- freesound.org",310,395);
      
//giving text
      stroke("pink");
      textSize(18);
      fill("black");
      text("Night Runner Game",170,30);

//giving text
      stroke("purple");
      textSize(18);
      fill("black");
      text("Score: " + score,10,30);
  
//giving text
      stroke("magenta");
      textSize(18);
      fill("black");
      text("Press on the Play to Play the Nigh Runner game",60,290);
    }
 
//collision 
   bunny.collide(invisibleGround);
  
//calling drawsprites
   drawSprites();
  
//giving text
  if (gameState === "PLAY")
    {
     stroke("magenta");
      textSize(15);
      fill("white");
      text("Score: " + score,420,20)
}
}

//spawnobstacles function
function spawnobstacles()
{
  if (frameCount % 70 === 0)
{
      var obstacle  = createSprite(500,350,110,20);
      obstacle.scale=0.5;
      r = Math.round(random(1,2));
      
  
    if (r === 1 ){
        obstacle.addImage(obstacle2);
        }
    else if (r === 2) {
      obstacle.scale = 0.3;
    obstacle.addImage(obstacle3);
  }
    else if (r === 3) {
    obstacle.addImage(obstacle4);
  } 
    else if (r === 4) {
    obstacle.addImage(obstacle5);
      
  }
  
  obstacle.collide(invisibleGround);
  obstacle.velocityX = -(8 + score/100);
  obstacle.setLifetime=100;
  obstaclesGroup.add(obstacle);
} 
}

//coins function
function coins()
{
  if (frameCount % 80 === 0)
{
     var coin  = createSprite(500,200);
      coin.scale= -0.02;
      r = Math.round(random(1,2));
      
  
    if (r === 1 ){
        coin.addImage(coin_img);
        }
  else {
    coin.addImage(coin_img);
  }
  
  coin.y =Math.round(random(200,250));
  coin.collide(invisibleGround);
  coin.velocityX=-7;
  coin.setLifetime=100;
  coinGroup.add(coin);
} 
}