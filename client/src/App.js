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


  useEffect(()=>{
    socket = io(CONNECTION_PORT)
  },[CONNECTION_PORT])

  const connectToRoom = () =>{
    setLoggedIn(true);
    socket.emit('join_room',room);
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
        <div className="messages"></div>
        <div className="messageInputs">
          <input type='text' placeholder='Message...'/>
          <button>Send</button>
        </div>
      </div>}
  </div>
  );
}

export default App;
