import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import './App.css';

let socket;
const CONNECTION_PORT = "localhost:3001/";

function App() {

  //Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room,setRoom]= useState('');
  const [userName, setUserName] = useState('');

  //After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(()=>{
    socket = io(CONNECTION_PORT)
  },[CONNECTION_PORT])
 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  const connectToRoom = () =>{
    setLoggedIn(true);
    socket.emit('join_room',room);
  }

  const sendMessage = () =>{
    let messageContent = {
      room: room,
      content:{
      author: userName,
      message: message
      }
    }

    socket.emit("send_message", messageContent);
    setMessageList([...messageList,messageContent.content]);
    setMessage('');

  }
  return (
    <div className="App">
      {!loggedIn? 
      <div className="logIn">
        <div className="inputs">
          <input type="text" placeholder="Name..." onChange={(e)=>setUserName(e.target.value)}/>
          <input type="text" placeholder="Room..." onChange={(e)=>setRoom(e.target.value)}/>
        </div>
        <button onClick={connectToRoom}>Enter Chat</button>
      </div>:
      <div className="chatContainer">
        <div className="messages">
          {messageList.map(( key,val)=>{
            return <h1>{key.author} {key.message}</h1>
          })}
        </div>
        <div className="messageInputs">
          <input type='text' placeholder='Message...' onChange={(e)=>setMessage(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>}
  </div>
  );
}

export default App;
