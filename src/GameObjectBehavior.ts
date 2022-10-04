import { GameObject } from './GameObject'

export class GameObjectBehavior {

    protected gameObjectRef: GameObject;

    constructor(gameObjectRef: GameObject) {
        this.gameObjectRef = gameObjectRef;

        this.init();

    }

    protected init() {

    }

    public update(delta: number) {

    }
}