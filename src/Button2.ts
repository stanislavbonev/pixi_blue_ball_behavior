import { Button } from './Button';


export class Button2 extends Button {


    constructor(label: string) {
        super(label);
    }

    protected init() {
        super.init()

    }
    protected onPointerup() {
        super.onPointerup();

        this.dispatcher.emit('initbtnup');
    }

    protected onPointerDown() {
        super.onPointerDown();

        this.dispatcher.emit('initbtndown');
    }

}