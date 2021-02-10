class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    //continuación
    this.cursor = this.scene.input.keyboard.createCursorKeys();

    this.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNames("sprites_jugador", {
        start: 1,
        end: 16,
        prefix: "walk-",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.scene.anims.generateFrameNames("sprites_jugador", {
        start: 1,
        end: 16,
        prefix: "walk-",
      }),
      frameRate: 25,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNames("sprites_jugador", {
        start: 1,
        end: 4,
        prefix: "idle-",
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.scene.anims.generateFrameNames("sprites_jugador", {
        start: 1,
        end: 4,
        prefix: "jump-",
      }),
      frameRate: 5,
      repeat: -1,
    });
  }

  update(time, delta) {
    let playerVelocityMod=playerVelocity
    if (this.cursor.shift.isDown && this.body.onFloor()) {
      playerVelocityMod=playerVelocityMod*1.25
    }
    if (this.cursor.left.isDown) {
      this.setVelocityX(-playerVelocityMod * delta);

      this.setFlipX(true);
    } else if (this.cursor.right.isDown) {
      this.setVelocityX(playerVelocityMod * delta);
      this.setFlipX(false);
    } else {
      //Parado
      this.setVelocityX(0);
    }

    if (this.cursor.space.isDown && this.body.onFloor()) {
      this.setVelocityY(-playerVelocityMod * delta);
    }
    if (!this.body.onFloor()) this.play("jump", true);
    else if (this.body.velocity.x !== 0 && this.cursor.shift.isDown) this.play("run", true);
    else if (this.body.velocity.x !== 0) this.play("walk", true);
    else this.play("idle", true);
  }
}
