import { GameObjectBehavior } from './GameObjectBehavior'
import { GameObject } from './GameObject'
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'

export class BallBehavior extends GameObjectBehavior {

    private ball: PIXI.Sprite;
    private velocity: number = 10;
    private hitDown: boolean = false;
    private hitRight: boolean = false;
    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }
    protected init() {
        this.createBall();
    }

    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawCircle(0, 0, 30);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);

        this.gameObjectRef.addChild(this.ball);
    }

    public update(delta: number) {
        // if (this.gameObjectRef.x + this.gameObjectRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
        //     this.gameObjectRef.x += this.velocity * delta;
        //     console.log(this.gameObjectRef.x);
        // }

        // else {
        //     // let va = this.gameObjectRef.x - GameApplication.getApp().view.width
        //     // this.gameObjectRef.x + va;
        //     this.gameObjectRef.x = GameApplication.getApp().view.width - this.ball.width;
        // }
        if (this.gameObjectRef.x < GameApplication.getApp().view.width - this.gameObjectRef.width && !this.hitRight) {
            this.gameObjectRef.x += this.velocity * delta;
        } else {
            this.hitRight = true;
        }
        if (this.gameObjectRef.x > 0 && this.hitRight) {
            this.gameObjectRef.x -= this.velocity * delta;
        } else {
            this.hitRight = false;
        }
        if (this.gameObjectRef.y < GameApplication.getApp().view.height - this.gameObjectRef.width && !this.hitDown) {
            this.gameObjectRef.y += this.velocity * delta;
        } else {
            this.hitDown = true;
        }
        if (this.gameObjectRef.y > 0 && this.hitDown) {
            this.gameObjectRef.y -= this.velocity * delta;
        } else {
            this.hitDown = false;
        }


    }
}