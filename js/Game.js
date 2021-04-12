class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    ball1 = createSprite(100,200);
    ball1.addImage("ball1",ball1Img);
    ball1.scale = 0.5
    ball2 = createSprite(300,200);
    ball2.addImage("ball2",ball2Img);

    ball3 = createSprite(500,200);
    ball3.addImage("ball3",ball3Img);
    ball3.scale = 0.5
    ball4 = createSprite(700,200);
    ball4.addImage("ball4",ball4Img);
  
    balls = [ball1, ball2, ball3, ball4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background("#68767")
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        balls[index-1].x = x;
        balls[index-1].y = y;

        if (index === player.index){
          balls[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = balls[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3860){
      gameState=2
    }
    drawSprites();
  }
  end(){
    console.log("game ended")
  }
}
