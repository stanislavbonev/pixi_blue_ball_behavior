import { GameObjectBehavior } from './GameObjectBehavior'
import { GameObject } from './GameObject';
import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication';
import { EventDispatcher } from './EventDispatcher';
import { BallBehavior } from './BallBehavior';
import { BlueBallBehavior } from './BlueBallBehavior';


export class SquareBehavior extends GameObjectBehavior {

    private square: PIXI.Sprite;
    private velocity: number = 10;
    private deAccel: number = 0.1099;
    private ballObjRef: GameObject;
    private collision: boolean = false;

    constructor(gameObjRef: GameObject) {
        super(gameObjRef);

    }

    public destroy() {
        this.square.destroy({ texture: true, baseTexture: true }); //remove texture !!!! texture vs basetexture
        this.gameObjRef.removeChild(this.square); //remove the ball
    }

    public setBallObjRef(gameObj: GameObject) {
        this.ballObjRef = gameObj;
    }

    protected init() {
        this.createSquare();
    }

    private createSquare() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawRect(50, 50, 50, 50);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.square = new PIXI.Sprite(texture);

        this.gameObjRef.addChild(this.square);
    }



    ///////////////////////////////////////////////
    private move(obj: GameObject, delta: number) {

        if (obj.x < GameApplication.getApp().view.width) {

            this.velocity -= this.deAccel;
            obj.x += this.velocity * delta;

            if (this.velocity < 0) {
                this.velocity = 10;
                this.collision = false;

            } else
                if (obj.x + obj.width > GameApplication.getApp().view.width) {

                    obj.removeBehavior('squareBehavior');

                    const BlueballBehavior: BlueBallBehavior = new BlueBallBehavior(obj);
                    obj.addBehavior('squareBehavior', BlueballBehavior);
                    obj.x = GameApplication.getApp().view.width - obj.width;

                    console.log(obj);
                }

        }

    }
    /////////////////////////////////////////////

    public update(delta: number) {


        if (!this.collision && this.ballObjRef.x + this.ballObjRef.width >= this.gameObjRef.x && this.ballObjRef.x < this.gameObjRef.x + this.gameObjRef.width &&
            this.ballObjRef.y + this.ballObjRef.height >= this.gameObjRef.y && this.ballObjRef.y < this.gameObjRef.y + this.gameObjRef.height) {

            this.collision = true;

            EventDispatcher.getInstance().getDispatcher().emit('updatescore');

        }
        if (this.collision) {

            this.ballObjRef.removeBehavior('ballBehavior');
            this.move(this.gameObjRef, delta);

        }

    }
}