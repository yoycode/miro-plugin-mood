
import { WidgetMixin, Image, Text, Shape } from '@mirohq/websdk-types';

export class MyCharacter {
    constructor() {
    }

    // character position
    x= 0;
    y= 0;

    // character components
    characterComponents?: WidgetMixin[]
    myImage? : Image // 내 캐릭터
    myText? : Text // 내 캐릭터 
    myChatBubble? : Shape // 채팅 버블

    // add character component
    addWidget(element: WidgetMixin) {
        if(this.characterComponents === undefined) {
            this.characterComponents= [element];
            return;
        }
        this.characterComponents?.push(element);
    }


    // need test
    removeCharacter() {
        if(this.myImage) miro.board.remove(this.myImage);
        if(this.myText) miro.board.remove(this.myText);
        if(this.myChatBubble) miro.board.remove(this.myChatBubble);
        // this.characterComponents.forEach(element=> {
        //     miro.board.remove(element as Item);
        // });
        // this.characterComponents= [];
    }

    movingUnit= 10; // character movement unit
    moveRight() {
        if(this.myImage) this.myImage.x += this.movingUnit;
        if(this.myText) this.myText.x += this.movingUnit;
        if(this.myChatBubble) this.myChatBubble.x += this.movingUnit;
        // this.characterComponents.map(element => {
        //     element.x += this.movingUnit;
        //     element.sync();
        // });
    }

    moveLeft() {
        if(this.myImage) this.myImage.x -= this.movingUnit;
        if(this.myText) this.myText.x -= this.movingUnit;
        if(this.myChatBubble) this.myChatBubble.x -= this.movingUnit;
        // this.characterComponents.forEach(element => {
        //     element.x -= this.movingUnit;
        //     element.sync();
        // });
    }
    moveUp() {
        if(this.myImage) this.myImage.y += this.movingUnit;
        if(this.myText) this.myText.y += this.movingUnit;
        if(this.myChatBubble) this.myChatBubble.y += this.movingUnit;
        // this.characterComponents.forEach(element => {
        //     element.y += this.movingUnit;
        //     element.sync();
        // });
    }
    moveDown() {
        if(this.myImage) this.myImage.y -= this.movingUnit;
        if(this.myText) this.myText.y -= this.movingUnit;
        if(this.myChatBubble) this.myChatBubble.y -= this.movingUnit;
        // this.characterComponents.forEach(element => {
        //     element.y -= this.movingUnit;
        //     element.sync();
        // });
    }
};