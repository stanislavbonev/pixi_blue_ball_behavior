import { Button } from './Button';
import { Game } from './Game'
import { EventDispatcher } from './EventDispatcher';

export class Button2 extends Button {


    constructor(label: string) {
        super(label);
    }

    protected init() {
        super.init()

    }
    protected onPointerup() {
        super.onPointerup();

        EventDispatcher.getInstance().getDispatcher().emit('initbtnup');
    }

    protected onPointerDown() {
        super.onPointerDown();

        EventDispatcher.getInstance().getDispatcher().emit('initbtndown');
    }

}