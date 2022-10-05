import { GameObject } from "./GameObject"
import * as PIXI from 'pixi.js';
import { BallBehavior } from './BallBehavior';
import { SquareBehavior } from './SquareBehaviour';

import { Button1 } from './Button1';
import { Button2 } from './Button2';
import { GameApplication } from './GameApplication'


export class Game extends PIXI.Container {

    private gameObjects: Map<string, GameObject>;

    private ticker: PIXI.Ticker;

    private gameObjectContainer: PIXI.Container;
    private uiContainer: PIXI.Container;

    private changeBehaviourBtn: Button1;
    private initBehaviorButton: Button2;
    private square: PIXI.Sprite;
    private ballGameObj: GameObject;

    constructor() {
        super();
        this.init();
    }

    private init() {
        this.createTicker();
        this.createGameObjList();
        this.createGameObjContainer()
        this.createUIContainer();
        this.createBtn();
        this.createGameObject();



    }


    private createGameObjList() {
        this.gameObjects = new Map<string, GameObject>();
    }

    private createBtn() {
        this.changeBehaviourBtn = new Button1('change behavior');
        this.changeBehaviourBtn.x = 400;
        this.changeBehaviourBtn.y = GameApplication.getApp().view.height - this.changeBehaviourBtn.height;
        this.changeBehaviourBtn.getDispatcher().addListener('changebtnup', this.onChangeButtonUp, this);
        this.uiContainer.addChild(this.changeBehaviourBtn);

        this.initBehaviorButton = new Button2('init');
        this.initBehaviorButton.x = 150;
        this.initBehaviorButton.y = GameApplication.getApp().view.height - this.initBehaviorButton.height;
        this.initBehaviorButton.getDispatcher().addListener('initbtnup', this.onInitButtonUp, this);
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

    private createBallGameObj() {
        const ballGameObj: GameObject = new GameObject('gameObj1');

        ballGameObj.x = 100;
        ballGameObj.y = 100;

        this.addGameObject(ballGameObj);

        const ballBehavior: BallBehavior = new BallBehavior(ballGameObj);
        ballGameObj.addBehavior('ballBehavior', ballBehavior);


    }

    private createSquareGameObj() {
        const squareGameObj: GameObject = new GameObject('gameObj2');

        squareGameObj.x = 300;
        squareGameObj.y = 100;

        this.addGameObject(squareGameObj);

        const squareBehavior: SquareBehavior = new SquareBehavior(squareGameObj);
        squareBehavior.setBallObjRef(this.getGameObjById('gameObj1'));////////////
        squareGameObj.addBehavior('squareBehavior', squareBehavior);
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

    // private onInitButtonUp() {
    //     console.log('safafafaf')
    //     const ballBehavior: BallBehavior = new BallBehavior(this.ballGameObj);
    //     this.ballGameObj.addBehavior(ballBehavior);
    // }


    private getGameObjById(id: string): GameObject {
        if (!this.gameObjects.has(id)) {
            return null;
        }
        return this.gameObjects.get(id);
    }

    private onInitButtonUp() {
        // const gameObj: GameObject = this.getGameObjById('gameObj1');

        // if (!gameObj) {
        //     console.log('no object');
        //     return;
        // }

        // const squareBehavior: SquareBehavior = new SquareBehavior(gameObj);
        // gameObj.addBehavior('squareBehavior', squareBehavior);
    }

    private onChangeButtonUp() {


    }
}