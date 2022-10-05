import { GameObjectBehavior } from './GameObjectBehavior'
import { GameObject } from './GameObject'
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'

export class BallBehavior extends GameObjectBehavior {

    private ball: PIXI.Sprite;
    private velocity: number = 10;
    private hitDown: boolean = false;
    private hitRight: boolean = false;
    private keyPressed: boolean = false;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }

    public destroy() {
        this.ball.destroy({ texture: true, baseTexture: true }); //remove texture !!!! texture vs basetexture
        this.gameObjRef.removeChild(this.ball); //remove the ball
    }

    protected init() {
        this.createBall();
        this.setKeyCallbackEvent();
    }

    private setKeyCallbackEvent() {
        this.onKeyUp = this.onKeyUp.bind(this); //binding!!!!
        window.addEventListener('keyup', this.onKeyUp)
    }

    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xffffff);
        gfx.drawCircle(0, 0, 30);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.ball);
    }

    public update(delta: number) {

        if (!this.keyPressed) {
            return;
        }

        if (this.gameObjRef.x + this.gameObjRef.width + this.velocity * delta < GameApplication.getApp().view.width) {
            this.gameObjRef.x += this.velocity * delta;
            console.log(this.gameObjRef.x);
        }

        else {
            // let va = this.gameObjectRef.x - GameApplication.getApp().view.width
            // this.gameObjectRef.x + va;
            this.gameObjRef.x = GameApplication.getApp().view.width - this.ball.width;
        }

        // if (this.gameObjRef.x < GameApplication.getApp().view.width - this.gameObjRef.width && !this.hitRight) {
        //     this.gameObjRef.x += this.velocity * delta;
        // } else {
        //     this.hitRight = true;
        // }
        // if (this.gameObjRef.x > 0 && this.hitRight) {
        //     this.gameObjRef.x -= this.velocity * delta;
        // } else {
        //     this.hitRight = false;
        // }
        // if (this.gameObjRef.y < GameApplication.getApp().view.height - this.gameObjRef.width && !this.hitDown) {
        //     this.gameObjRef.y += this.velocity * delta;
        // } else {
        //     this.hitDown = true;
        // }
        // if (this.gameObjRef.y > 0 && this.hitDown) {
        //     this.gameObjRef.y -= this.velocity * delta;
        // } else {
        //     this.hitDown = false;
        // }


    }

    private onKeyUp(e: any) {
        if (e.keyCode == '32') {
            this.keyPressed = true;
        }
    }
}