var gamestate = "serve"
var score=0

//loads the images, animation and sound
function preload(){
  t_rex=loadAnimation('trex1.png','trex3.png','trex4.png')
  
  groundimg=loadImage('ground2.png')
  cloudimg= loadImage('cloud.png')
  ob1= loadImage('obstacle1.png')
  ob2= loadImage('obstacle2.png')
  ob3= loadImage('obstacle3.png')
  ob4= loadImage('obstacle4.png')
  ob5= loadImage('obstacle5.png')
  ob6= loadImage('obstacle6.png')
  trex1= loadAnimation("trex1.png")
  trexE = loadAnimation("trex_collided.png")
  reloadimg = loadImage("restart.png")
  gameOimg = loadImage("gameOver.png")
  jumpS = loadSound("jump.mp3")
  dieS = loadSound("die.mp3")
  checkPoint = loadSound("checkpoint.mp3")

}

function setup(){
  createCanvas(windowWidth,windowHeight)
  trex=createSprite(50,height-70,5,4)
  trex.addAnimation("standing",trex1)
  trex.addAnimation('walking',t_rex)
  trex.addAnimation("end",trexE)
  trex.scale=0.6
  trex.debug=false
  trex.setCollider("rectangle",0,0,70,80)

  ground=createSprite(width/2,height-60,width,20)
  ground.addImage(groundimg)
  ground2=createSprite(width/2,height-50,width,20)
  ground2.visible=false
  cloudG = createGroup()
  obstacleg = createGroup()

  reload = createSprite(width/2,height/2+45,60,40)
  reload.addImage(reloadimg)
  reload.scale = 0.5
  gameO = createSprite(width/2,height/2,45,45)
  gameO.addImage(gameOimg)
  gameO.scale= 0.7
  reload.visible= false
  gameO.visible= false
}

//indentation - giving tab space in the begining of line

function draw(){
  background(180)
  textSize(16)
  text("Score: "+score,width-100,50)
  if(gamestate==="serve"&&(keyDown("space")||touches.length>0) ){
    gamestate= "play"
touches = []
  }

  trex.collide(ground2)
  if(gamestate === "play"){
    //getFrameRate : frames per second
    score=score+Math.round(getFrameRate()/60)
    reload.visible= false
    gameO.visible= false
    trex.changeAnimation('walking',t_rex)
    //touches =[x,y]  length =2
    if ((keyDown('space')||touches.length>0 )&&trex.y>=height-150) {
    trex.velocityY=-8  
    jumpS.play()
    touches=[]
  }
  trex.velocityY=trex.velocityY+0.3
  ground.velocityX=-(4+score/100)
  if(ground.x<0){
    ground.x=600
  }
if(score%100===0 && score>0){
  checkPoint.play()
}
  clouds()
  cactii()
  if(trex.isTouching(obstacleg)){
    gamestate= "end"
    //trex.velocityY=-8 
    dieS.play()
  }
}

if(gamestate==="end"){
  reload.visible= true
  gameO.visible= true
  trex.changeAnimation("end",trexE)
  ground.velocityX = 0
  obstacleg.setVelocityXEach(0)
  cloudG.setVelocityXEach(0)
  obstacleg.setLifetimeEach(-5)
  cloudG.setLifetimeEach(-8)
  trex.velocityY = 0
  if(mousePressedOver(reload)){
    gamestate="serve"
    obstacleg.destroyEach()
    cloudG.destroyEach()
    reload.visible= false
  gameO.visible= false
  score= 0
  trex.changeAnimation("standing",trex1)
  }
}

  drawSprites()
}

function clouds(){
  if(frameCount%60===0){
    cloud =createSprite(width,random(100,200),60,50)
    cloud.velocityX= -4
    cloud.addImage(cloudimg)
    cloud.scale= 0.6
    trex.depth=cloud.depth+1
    cloud.lifetime=500
    cloudG.add(cloud)
  }
  }



  function cactii(){
    if(frameCount%90===0){
      cactus =createSprite(width,height-80,60,50)
      cactus.velocityX= -(4+score/100)
      cactus.scale= 0.6
      var choice = Math.round(random(1,6))
      cactus.lifetime= 500
      switch(choice) {
        case 1 : cactus.addImage(ob1)
        break
        case 2 : cactus.addImage(ob2)
        break
        case 3 : cactus.addImage(ob3)
        break
        case 4 : cactus.addImage(ob4)
        break
        case 5 : cactus.addImage(ob5)
        break
        case 6 : cactus.addImage(ob6)
        break 
      }
      obstacleg.add(cactus)
    }
    }
  
  
  
