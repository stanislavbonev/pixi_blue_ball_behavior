import * as PIXI from 'pixi.js';

export class ScoreView extends PIXI.Container {

    private score: PIXI.Text;

    constructor() {
        super();
    }

    private init() {
        this.score = new PIXI.Text('', {
            fontSize: 20,
            fill: 0xffff00
        })
        this.addChild(this.score);
    }

    public setScore(score: number) {
        // this.score.text = score.toString();
        this.score.text = score + '';
    }
}