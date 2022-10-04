import * as PIXI from 'pixi.js';
import { GameApplication } from './GameApplication';

export class Button extends PIXI.Container {

    protected background: PIXI.Sprite;
    private text: PIXI.Text = new PIXI.Text();
    protected label: string;
    protected dispatcher: PIXI.utils.EventEmitter;

    constructor(label: string) {
        super();
        this.label = label;
        this.init();
    }

    public getDispatcher(): PIXI.utils.EventEmitter {
        return this.dispatcher;
    }

    protected init() {
        // GameApplication.getApp().renderer;
        this.dispatcher = new PIXI.utils.EventEmitter;
        this.createBackground();
        this.interactive = true; //!!!!!!!!!
        this.onPointerDown = this.onPointerDown.bind(this);
        this.setInteractiveCallbacks();
        this.createText();


    }

    private createBackground() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0x0000ff);
        gfx.drawRoundedRect(0, 0, 200, 40, 40);
        gfx.endFill();
        const texture: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        this.background = new PIXI.Sprite(texture);

        this.addChild(this.background);
    }

    private setInteractiveCallbacks() {
        this.addListener('pointerdown', this.onPointerDown)
        this.addListener('pointerup', this.onPointerup);

    }

    private createText() {
        this.text = new PIXI.Text(this.label, {
            fontFamily: 'Minecraft',
            fontSize: 30,
            fill: 0xffff00
        });
        this.text.anchor.set(0.5);
        this.text.x = this.background.width / 2;
        this.text.y = this.background.height / 2;
        this.addChild(this.text)
    }

    protected onClick() {
        this.background.tint = 0xff0000;
    }

    protected onPointerDown() {
        this.background.tint = 0x0000ff;
    }

    protected onPointerup() {
        this.background.tint = 0xff0000;
    }
}


export class SceneButton extends Button {
    gfx: PIXI.Graphics = new PIXI.Graphics();

    protected onPointerDown() {

        this.gfx.beginFill(0xffff00);
        this.gfx.drawCircle(0, 0, 100);
        this.gfx.x = 300;
        this.gfx.y = 200;
        this.gfx.endFill();
        this.addChild(this.gfx);
    }

    protected onPointerup() {
        // this.gfx.destroy(true);
    }
}