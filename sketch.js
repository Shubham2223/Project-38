var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var balls, ball1, ball2, ball3, ball4;
var ball1Img,ball2Img,ball3Img,ball4Img,track,ground;
function preload(){
  track = loadImage("../images/track.jpg")
  ball1Img = loadImage("../images/ball1.png")
  ball2Img = loadImage("../images/ball2.png")
  ball3Img = loadImage("../images/ball3.png")
  ball4Img = loadImage("../images/ball4.png")
  ground = loadImage("../images/ground.png")
}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
