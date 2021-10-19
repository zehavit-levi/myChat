import React, { useEffect, useState } from 'react';
import io from 'socket.io-client'; 
import './App.css';
import Login from "./pages/Login/Login";
import ChatRoom from "./pages/ChatRoom/ChatRoom";

let socket;
const CONNECTION_PORT = "localhost:3001/";

function App() {

  //Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room,setRoom]= useState('');
  const [userName, setUserName] = useState('');
  const [roomList, setRoomList] = useState(['class2301','java']);

  //After Login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [usersList, setUsersList] = useState([]);
 
  
  useEffect(()=>{
    socket = io(CONNECTION_PORT)
  },[CONNECTION_PORT])
 
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data.author + ":" +data.message);
      setMessageList([...messageList, data]);
    });
  });
  useEffect(()=>{
    socket.on("receive_users_at_room", (data) => {
      setUsersList([...usersList,data])
    })
  })

  const connectToRoom = () =>{
    setLoggedIn(true);
    let data={
      room: room,
      userName: userName
    }
    setUsersList([...usersList,data.userName])
    socket.emit('join_room', data);
  }
  
  const sendMessage = async() =>{
    let messageContent = {
      room: room,
      content:{
      author: userName,
      message: message
      }
    }

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList,messageContent.content]);
    setMessage('');
  }

  return (
    <div className="App">
      {!loggedIn? 
      <Login setRoom={setRoom} setUserName={setUserName} connectToRoom={connectToRoom} setUsersList={setUsersList} roomList={roomList} room={room}/>
      :
      <ChatRoom userName = {userName} messageList={messageList} room={room} setMessage={setMessage} sendMessage={sendMessage} usersList={usersList} />}
  </div>
  );
}

export default App;
