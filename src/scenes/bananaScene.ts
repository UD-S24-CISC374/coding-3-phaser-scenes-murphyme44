import Phaser from "phaser";

interface SceneData {
    score: number;
}

export default class BananaScene extends Phaser.Scene {
    private panda!: Phaser.Physics.Arcade.Sprite;
    private bananas!: Phaser.Physics.Arcade.Group;
    private score: number = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private readonly totalBananas: number = 5;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

    private collectBanana(
        player:
            | Phaser.Types.Physics.Arcade.GameObjectWithBody
            | Phaser.Tilemaps.Tile,
        b: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
    ) {
        const panda = b as Phaser.Physics.Arcade.Image;
        panda.disableBody(true, true);
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
        // Check if all bananas are collected
        if (this.bananas.countActive(true) === 0) {
            // Redirect to EndScene
            this.scene.start("OrangeScene", { score: this.score });
        }
    }

    constructor() {
        super({ key: "BananaScene" });
    }

    create(data: SceneData) {
        this.add.image(0, 0, "background2").setOrigin(0);
        this.panda = this.physics.add.sprite(100, 100, "panda");
        this.panda.setScale(0.25);
        this.bananas = this.physics.add.group({
            key: "banana",
            repeat: this.totalBananas - 1,
            setXY: { x: 450, y: 350, stepX: 100 },
            immovable: true,
            setScale: { x: 0.025, y: 0.025 },
        });

        this.score = data.score || 0;

        this.scoreText = this.add.text(16, 16, "Score: " + this.score, {
            fontSize: "32px",
            color: "#000",
        });

        this.physics.add.overlap(
            this.panda,
            this.bananas,
            this.collectBanana,
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
