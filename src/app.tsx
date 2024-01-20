import * as React from 'react';
import {createRoot} from 'react-dom/client';

import '../src/assets/style.css';
import { StickyNote, Image, Frame, Text } from '@mirohq/websdk-types';
import { DropCharacters } from './drop_characters';

var myItem : Image // 내 캐릭터
var myText : Text // 내 캐릭터 
var chatContent : string // 채팅용


// async function getUserName(userId: string) : Promise<string> {
//   const onlineUsers = await miro.board.getOnlineUsers();
//   var username= "";
//   console.log(onlineUsers);

//   onlineUsers.forEach(element => {  
//     if(element.id == userId) {
//       username = element.name; 
//     }
//   });
//   return username;
// }

async function syncCharacter() {
  myText.sync();
  myItem.sync();
}

async function removeCharacter() {
  miro.board.remove(myItem);
  miro.board.remove(myText);
}

async function addCharacter() {
  // var myName= await miro.board.getUserInfo()
  //   .then(res => getUserName(res.id));

  // 이름 가져오기
  var myName= (await miro.board.getUserInfo()).name;

  removeCharacter();

  myItem = await miro.board.createImage({
    title: myName,
    url: 'https://cdn-icons-png.flaticon.com/512/1727/1727571.png',
    width: 250
  });

  // text 생성.
  myText = await miro.board.createText({
    content: myName,
    style: {
      color: '#1a1a1a', // Default value: #1a1a1a (black)
      fillColor: 'transparent', // Default value: transparent (no fill)
      fillOpacity: 1, // Default value: 1 (solid color)
      fontFamily: 'arial', // Default font type for the text
      fontSize: 80, // Default font size
      textAlign: 'center', // Default alignment: left
    },
    x: myItem.x,
    y: myItem.y - 180,
    width: 200
  });

  // grouping
  //myItem = await miro.board.group({items: [myNameText, characterImage]})

  // add to frame
  //myItem.add(characterImage);
  //myItem.add(myNameText);
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




const movingUnit= 10;
async function moveRight() {
  myText.x += movingUnit;
  myItem.x += movingUnit;
  syncCharacter();
}
async function moveLeft() {
  myText.x -= movingUnit;
  myItem.x -= movingUnit;
  syncCharacter();
}
async function moveUp() {
  myText.y -= movingUnit;
  myItem.y -= movingUnit;
  syncCharacter();
}
async function moveDown() {
  myText.y += movingUnit;
  myItem.y += movingUnit;
  syncCharacter();
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
