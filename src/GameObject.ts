import { GameObjectBehavior } from "./GameObjectBehavior"
import * as PIXI from 'pixi.js';
export class GameObject extends PIXI.Container {

    private behaviors: Array<GameObjectBehavior> = [];

    private id: string;

    constructor(id: string) {
        super();
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public update(delta: number) {
        this.behaviors.forEach((behaviour) => {
            behaviour.update(delta);
        })
    }

    public addBehavior(behaviour: GameObjectBehavior) {
        this.behaviors.push(behaviour);
    }
}