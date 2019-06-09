import Phaser from "phaser";
import ball from "./assets/ball1.png";
import css from './assets/css/myfile.css';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  // height: document.getElementById("phaser-example").height,
  // width: document.getElementById("phaser-example").width,
  width: 800,
  height: 600,
  autoResize: true,
  backgroundColor: 0x222222,
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true
      gravity: { y: 100 },
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var myMap = new Map();
var myNumMap = new Map();
var group;
var debugCount=0;
const game = new Phaser.Game(config);

function preload() {
  this.load.image("ball", ball);
}

function create() {
  group = this.add.group();
  
  // this.physics.add.collider(group, group);
  // group.refresh();
  for (var x = 0; x < 15; x++) {
    var xPlot = rand(1, 800);
    var yPlot = rand(1, 600);
    var text = this.add.text(xPlot, yPlot - 15, x, { fontFamily: 'Arial', fontSize: 14, color: '#ffff00' });
    var sprite = this.add.image(xPlot, yPlot, 'ball');
    this.physics.world.enable(sprite);
    var v1 = rand(50, 100);
    var v2 = rand(50, 100);
    sprite.body.setVelocity(v1, v2).setBounce(1, 1).setCollideWorldBounds(true);
    group.add(sprite);
    var key = 'ball' + x;
    myMap.set(key, sprite);
    myNumMap.set(key, text);
  }
}

function update() {
  // this.physics.world.collide(group, group);
  for (var [key, value] of myMap) {
    for (var [keyCheck, valueCheck] of myMap) {
      this.physics.world.collide(value, valueCheck);
    }
    // this.physics.world.collide(value, group);
    var text = myNumMap.get(key);
    text.setX(value.x - 10);
    text.setY(value.y - 25);
  }
  if(debugCount==1000)
    debugCount = 0;
  debugCount++;
}

function rand(start, end) {
  return Math.floor(Math.random() * end) + start;
}
