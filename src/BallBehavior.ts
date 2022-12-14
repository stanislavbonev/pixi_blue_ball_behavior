import { GameObjectBehavior } from './GameObjectBehavior'
import { GameObject } from './GameObject'
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'

export class BallBehavior extends GameObjectBehavior {

    private ball: PIXI.Sprite;
    private velocity: number = 30;
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

        }


    }

    private onKeyUp(e: any) {
        if (e.keyCode == '32') {
            this.keyPressed = true;
        }
    }
}