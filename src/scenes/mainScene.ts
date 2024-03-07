import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
    private panda!: Phaser.Physics.Arcade.Sprite;
    private apples!: Phaser.Physics.Arcade.Group;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private readonly totalApples: number = 5;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    static score: number;

    private collectApple(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        s: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const panda = s as Phaser.Physics.Arcade.Image;
        panda.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
        // Check if all apples are collected
        if (this.apples.countActive(true) === 0) {
            // Redirect to NextScene
            this.scene.start("BananaScene", { score: this.score });
        }
    }

    constructor() {
        super({ key: "MainScene" });
    }

    create() {
        this.add.image(0, 0, "background1").setOrigin(0);
        this.panda = this.physics.add.sprite(100, 100, "panda");
        this.panda.setScale(0.25);
        this.apples = this.physics.add.group({
            key: "apple",
            repeat: this.totalApples - 1,
            setXY: { x: 450, y: 350, stepX: 100 },
            immovable: true,
            setScale: { x: 0.25, y: 0.25 },
        });

        this.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            color: "#000",
        });

        this.physics.add.overlap(
            this.panda,
            this.apples,
            this.collectApple,
            undefined,
            this
        );

        this.cursors = this.input.keyboard?.createCursorKeys();
    }

    update() {
        const cursors = this.input.keyboard?.createCursorKeys();

        if (cursors?.left.isDown) {
            this.panda.setVelocityX(-160);
        } else if (cursors?.right.isDown) {
            this.panda.setVelocityX(160);
        } else {
            this.panda.setVelocityX(0);
        }

        if (cursors?.up.isDown) {
            this.panda.setVelocityY(-160);
        } else if (cursors?.down.isDown) {
            this.panda.setVelocityY(160);
        } else {
            this.panda.setVelocityY(0);
        }
    }
}
