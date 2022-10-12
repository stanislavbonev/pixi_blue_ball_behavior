import { GameObjectBehavior } from './GameObjectBehavior'
import { GameObject } from './GameObject'
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication'


export class BlueBallBehavior extends GameObjectBehavior {

    private ball: PIXI.Sprite;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef)
    }

    public destroy() {
        this.ball.destroy({ texture: true, baseTexture: true }); //remove texture !!!! texture vs basetexture
        this.gameObjRef.removeChild(this.ball); //remove the ball
    }

    protected init() {
        this.createBall();

    }




    private createBall() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff);
        gfx.drawCircle(0, 0, 30);
        gfx.endFill();

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.ball = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.ball);
    }

    public update(delta: number) {





    }


}