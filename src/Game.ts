import { GameObject } from "./GameObject"
import * as PIXI from 'pixi.js';
import { BallBehavior } from './BallBehavior';
import { SquareBehavior } from './SquareBehaviour';

import { Button1 } from './Button1';
import { Button2 } from './Button2';
import { GameApplication } from './GameApplication'

import { EventDispatcher } from './EventDispatcher';
import { ScoreView } from './ScoreView';
import { Model } from './Model'

export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;
    private text: PIXI.Text = new PIXI.Text();
    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;

    private changeBehaviourBtn: Button1;
    private initBehaviorButton: Button2;
    private scoreView: ScoreView;
    private square: PIXI.Sprite;
    private ballGameObj: GameObject;
    private squareGameObj: GameObject;
    private ballBehavior: BallBehavior
    // squareGameObj

    // public static dispatcher: PIXI.utils.EventEmitter;

    constructor() {
        super();
        this.init();
    }

    private init() {

        this.createTicker();
        this.createGameObjList();
        this.createGameObjContainer();
        this.createUIContainer();
        this.createBtn();
        this.createGameObject();
        this.createScoreView();
        this.createMask();
        this.createText();
    }

    private createScoreView() {
        this.scoreView = new ScoreView(0);
        this.scoreView.x = 250;
        this.scoreView.y = 300;
        this.uiContainer.addChild(this.scoreView);
    }
    private createText() {
        this.text = new PIXI.Text('press space bar', {
            fontFamily: 'Minecraft',
            fontSize: 30,
            fill: 0xffff00
        });
        this.text.anchor.set(0.5);
        this.text.x = 400;
        this.text.y = this.gameObjectContainer.height / 2;
        this.addChild(this.text);
    }



    private createGameObjList() {
        this.gameObjects = new Map<string, GameObject>();
    }

    private createBtn() {
        this.changeBehaviourBtn = new Button1('change behavior');
        this.changeBehaviourBtn.x = 400;
        this.changeBehaviourBtn.y = GameApplication.getApp().view.height - this.changeBehaviourBtn.height;
        EventDispatcher.getInstance().getDispatcher().addListener('changebtnup', this.onChangeButtonUp, this);
        this.uiContainer.addChild(this.changeBehaviourBtn);

        this.initBehaviorButton = new Button2('init');
        this.initBehaviorButton.x = 150;
        this.initBehaviorButton.y = GameApplication.getApp().view.height - this.initBehaviorButton.height;
        EventDispatcher.getInstance().getDispatcher().addListener('initbtnup', this.onInitButtonUp, this);
        this.uiContainer.addChild(this.initBehaviorButton);
    }

    private createGameObjContainer() {
        this.gameObjectContainer = new PIXI.Container();
        this.addChild(this.gameObjectContainer);
    }

    private createUIContainer() {
        this.uiContainer = new PIXI.Container();
        this.addChild(this.uiContainer);

    }

    private createTicker() {
        this.ticker = new PIXI.Ticker();
        this.ticker.add(this.update, this);
        this.ticker.start();
    }

    private createGameObject() {
        this.createBallGameObj();
        this.createSquareGameObj();
    }

    protected createBallGameObj() {
        this.ballGameObj = new GameObject('gameObj1');

        this.ballGameObj.x = 100;
        this.ballGameObj.y = 100;

        this.addGameObject(this.ballGameObj);

        this.ballBehavior = new BallBehavior(this.ballGameObj);
        this.ballGameObj.addBehavior('ballBehavior', this.ballBehavior);


    }

    private createSquareGameObj() {
        this.squareGameObj = new GameObject('gameObj2');

        this.squareGameObj.x = 300;
        this.squareGameObj.y = 100;

        this.addGameObject(this.squareGameObj);

        const squareBehavior: SquareBehavior = new SquareBehavior(this.squareGameObj);
        squareBehavior.setBallObjRef(this.getGameObjById('gameObj1'));////////////
        this.squareGameObj.addBehavior('squareBehavior', squareBehavior);

        console.log(this.squareGameObj);

        EventDispatcher.getInstance().getDispatcher().addListener('updatescore', this.onScoreUpdate, this);
    }

    private addGameObject(gameObj: GameObject) {
        this.gameObjectContainer.addChild(gameObj);
        this.gameObjects.set(gameObj.getId(), gameObj);
    }

    private update(delta: number) {
        this.gameObjects.forEach(gameObj => {
            gameObj.update(delta);

        })


    }

    private createMask() {
        const gfx: PIXI.Graphics = new PIXI.Graphics();
        gfx.beginFill(0xff0000);
        gfx.drawRect(0, 0, 400, 400);
        gfx.endFill();

        const texture1: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);


        const square: PIXI.Sprite = new PIXI.Sprite(texture1);

        gfx.clear();
        gfx.beginFill(0x0000ff);
        gfx.drawCircle(0, 0, 100);
        gfx.endFill();

        const texture2: PIXI.Texture = GameApplication.getApp().renderer.generateTexture(gfx);
        const circle: PIXI.Sprite = new PIXI.Sprite(texture2);
    }


    private getGameObjById(id: string): GameObject {
        if (!this.gameObjects.has(id)) {
            return null;
        }
        return this.gameObjects.get(id);
    }

    private onInitButtonUp() {

        const ballBehavior: BallBehavior = new BallBehavior(this.ballGameObj);
        this.ballGameObj.addBehavior('ballBehavior', ballBehavior);

        console.log('onInitButtonUp');
    }

    private onChangeButtonUp() {

    }



    private onScoreUpdate() {
        let currentScore: number = Model.getInstance().getScore() + 1;

        Model.getInstance().setScore(currentScore);
        this.scoreView.setScore(Model.getInstance().getScore());

        console.log(this.gameObjects.get('gameObj1'));


    }
}