import * as React from 'react';
import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';
import { StickyNote, Image } from '@mirohq/websdk-types';
import { DropCharacters } from './drop_characters';

var myItem : Image // 내 캐릭터
var chatContent : string // 채팅용


async function addCharacter() {
  myItem = await miro.board.createImage({
    title: 'my_character',
    url: 'https://cdn-icons-png.flaticon.com/512/1727/1727571.png',
    width: 250
  });
}

async function expressEmotion() {
  const shape = await miro.board.createShape({
    content: `<p>${chatContent}</p>`,
    shape: 'star',
    style: {
      color: '#ff0000', // Default text color: '#1a1a1a' (black)
      fillColor: '#ffff00', // Default shape fill color: transparent (no fill)
      fontFamily: 'arial', // Default font type for the text
      fontSize: 24, // Default font size for the text, in dp
      textAlign: 'center', // Default horizontal alignment for the text
      textAlignVertical: 'middle', // Default vertical alignment for the text
      borderStyle: 'normal', // Default border line style
      borderOpacity: 1.0, // Default border color opacity: no opacity
      borderColor: '#ff7400', // Default border color: '#ffffff` (white)
      borderWidth: 2, // Default border width
      fillOpacity: 1.0, // Default fill color opacity: no opacity
    },
    x: myItem.x, // Default value: center of the board
    y: myItem.y, // Default value: center of the board
    width: 180,
    height: 180,
  });
  
  // Output the created item to the developer console
  console.log(shape);
}


async function copyCharactor() {
  miro.board.remove(myItem);
  myItem = await miro.board.createImage({
    url:  myItem.url,
    x: myItem.x,
    y: myItem.y
  });
}

const movingUnit= 10;
async function moveRight() {
  myItem.x += movingUnit;
  myItem.sync();
}
async function moveLeft() {
  myItem.x -= movingUnit;
  myItem.sync();
}
async function moveUp() {
  myItem.y -= movingUnit;
  myItem.sync();
}
async function moveDown() {
  myItem.y += movingUnit;
  myItem.sync();
}

const App: React.FC = () => {
  React.useEffect(() => {
    //addSticky();
  }, []);

  return (
    <div className="grid wrapper">
      <div className="cs1 ce12">
        {/* <img src="/src/assets/mooody.png" alt="" /> */}
        <DropCharacters/>
      </div>
      <div className="cs1 ce12">
        <h1>Congratulations!</h1>
        <p>Welcome to Moooood</p>
      </div>
      <input width="100%" className="input" type="text" placeholder="Type something here!" id="chat-1"/>
      <div className="cs1 ce12">
        <div className="button button-danger" onClick={addCharacter}>Create your character</div>
        <div className="button button-danger" onClick={expressEmotion}>별 뿅</div>
    
        <div className="cs1 ce12">
          <div className="button button-primary" onClick={moveUp}>UP</div>
          <div className="button button-primary" onClick={moveDown}>DOWN</div>
          <div className="button button-primary" onClick={moveRight}>RIGHT</div>
          <div className="button button-primary" onClick={moveLeft}>LEFT</div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
