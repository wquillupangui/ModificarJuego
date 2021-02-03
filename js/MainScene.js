class MainScene extends Phaser.Scene {
  preload() {
    this.load.image("tiles", "res/Tileset.png");
    this.load.tilemapTiledJSON("map", "res/Map.json");
    this.load.image("bgSky", "res/sky.png");
    this.load.image("sea", "res/sea.png");
    this.load.image("player", "res/idle-1.png");
    //Phaser.Physics.Arcade.Sprite
    // https://gammafp.com/tool/atlas-packer/
    this.load.atlas(
      "sprites_jugador",
      "res/player_anim/player_anim.png",
      "res/player_anim/player_anim_atlas.json"
    );
    this.load.spritesheet("tilesSprites", "res/Tileset.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.bgSky = this.add.tileSprite(
      800,
      0,
      windows.width * 3,
      windows.height * 2,
      "bgSky"
    );
    this.bgSky.fixedToCamera = true;
    //necesitamos un player
    this.player = new Player(this, 50, 100);
    var map = this.make.tilemap({ key: "map" });
    var tiles = map.addTilesetImage("Plataformas", "tiles");

    var layerFondo = map.createLayer("Fondo", tiles, 0, 0);
    var layerSuelo = map.createLayer("Suelo", tiles, 0, 0);
    //enable collisions for every tile

    layerSuelo.setCollisionByExclusion(-1, true);
    this.physics.add.collider(this.player, layerSuelo);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.objetos = map.getObjectLayer("objetos")["objects"];
    this.loadObjects();
    this.score = 1;
    this.scoreText = this.add.text(16, 16, "PUNTOS: " + this.score, {
      fontSize: "20px",
      fill: "#000",
      fontFamily: "verdana, arial, sans-serif",
    });
  }

  spriteHit(sprite1, sprite2) {
    this.score++;
    this.scoreText.text = "PUNTOS: " + this.score;
    sprite1.destroy();
  }

  update(time, delta) {
    this.player.update(time, delta);
    //console.log(this.player);
    if (this.player.x > 1300 || this.player.y > 600) {
      this.player.x = 50;
      this.player.y = 100;
      this.loadObjects();
      this.score = 1;
      this.scoreText.text = "PUNTOS: " + this.score;
    }
    this.scoreText.x = this.cameras.main.scrollX + 16;
  }

  loadObjects() {
    this.objetos.map((obj) => {
      if (obj.gid == 115) {
        // en mi caso la seta
        var seta = new Seta(this, obj.x, obj.y);
        //this.setas.push(seta);
        this.physics.add.overlap(seta, this.player, this.spriteHit, null, this);
        return obj;
      }
    });
  }
}
