import { GameObjectBehavior } from './GameObjectBehavior'
import { GameObject } from './GameObject';
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'

export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity: number = 5;
    constructor(gameObjRef: GameObject) {
        super(gameObjRef);
        this.init();
    }
    protected init() {
        this.createBall();
    }
    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawRect(50, 50, 10, 20);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjectRef.addChild(this.square);
    }

    public update(delta: number) {
        if (this.gameObjectRef.x + this.gameObjectRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
            this.gameObjectRef.x += this.velocity * delta;
            console.log(this.gameObjectRef.x);
        }

        else {
            // let va = this.gameObjectRef.x - GameApplication.getApp().view.width
            // this.gameObjectRef.x + va;
            this.gameObjectRef.x = GameApplication.getApp().view.width - this.square.width;
        }
    }
}