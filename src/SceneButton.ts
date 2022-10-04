import * as PIXI from 'pixi.js'
import { Button } from './Button'
import { GameApplication } from './GameApplication';



export class SceneButton extends Button {
    num: number;
    constructor(label: string, num: number) {
        super(label);
        this.num = num;
    }

    print() {

        console.log(this.label, this.num);
    }
}