import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("panda", "assets/panda.png");
        this.load.image("apple", "assets/apple.jpeg");
        this.load.image("banana", "assets/banana.png");
        this.load.image("orange", "assets/orange.png");
        this.load.image("watermelon", "assets/watermelon.png");
        this.load.image("background1", "assets/background1.jpg");
        this.load.image("background2", "assets/background2.png");
        this.load.image("background3", "assets/background3.jpeg");
        this.load.image("background4", "assets/background4.jpg");
    }

    create() {
        this.scene.start("MainScene");
    }
}
