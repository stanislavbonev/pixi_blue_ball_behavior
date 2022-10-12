import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication';

export class ScoreView extends PIXI.Container {

    private score: PIXI.Text;

    background: PIXI.Sprite;

    constructor(value: number) {
        super();
        this.init(value);

    }

    private init(value: number) {
        this.createBackground();
        this.createScore(value);
    }

    private createScore(value: number) {
        this.score = new PIXI.Text('', {
            fontSize: 20,
            fill: 0xffff00
        })
        this.score.anchor.set(0.5);
        this.score.x = this.background.width * 0.5;
        this.score.y = this.background.height * 0.5;
        this.score.text = value + '';
        this.addChild(this.score)
    }

    public setScore(score: number) {
        this.score.text = score + '';
    }

    private createBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff);
        gfx.drawRoundedRect(0, 0, 100, 20, 20);
        gfx.endFill();
        gfx.cacheAsBitmap = true;////////

        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);

        this.background = new PIXI.Sprite(texture);
        this.addChild(this.background)

    }
}