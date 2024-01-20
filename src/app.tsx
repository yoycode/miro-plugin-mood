import * as React from 'react';
import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';
import { StickyNote } from '@mirohq/websdk-types';

var myItem : StickyNote // 내 캐릭터

async function addSticky(): Promise<StickyNote> {
  myItem = await miro.board.createStickyNote({
    content: 'Your cute character',
  });
  console.log(myItem.content);
  return myItem
}

async function copyCharactor() {
  miro.board.remove(myItem);
  myItem = await miro.board.createStickyNote({
    content:  myItem.content,
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
        <img src="/src/assets/mooody.png" alt="" />
      </div>
      <div className="cs1 ce12">
        <h1>Congratulations!</h1>
        <p>Welcome to Moooood</p>
      </div>
      <div className="cs1 ce12">
        <div className="button button-primary" onClick={addSticky}>Create your character</div>
    
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
