import { Button } from './Button';


export class Button1 extends Button {


    constructor(label: string) {
        super(label);
    }

    protected init() {
        super.init()

    }
    protected onPointerup() {
        super.onPointerup();

        this.dispatcher.emit('changebtnup');
    }

    protected onPointerDown() {
        super.onPointerDown();

        this.dispatcher.emit('changebtndown');
    }

}