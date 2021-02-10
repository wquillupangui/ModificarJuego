//Configuración de la escena
const windows = { width: 800, height: 480 };
const config = {
  type: Phaser.AUTO,
  width: windows.width,
  height: windows.height,
  parent: "canvas",
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  scene: MainScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    },
  },
};

const playerXInit=50;
const playerYInit=125;
const playerVelocity=10;
const scoreTextStyle={
  fontSize: "20px",
  fill: "#000",
  fontFamily: "verdana, arial, sans-serif",
}
const game = new Phaser.Game(config);

//'http://labs.phaser.io'
//'assets/skies/space3.png'
//'assets/sprites/phaser3-logo.png'
//'assets/particles/red.png'
