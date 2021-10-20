
const firebase = require("firebase");
const express = require("express");
const socket = require("socket.io");
const { time } = require("console");
const app = express();
const PORT = '3001';
const config = {
  projectId: 'mychat-data', 
  apiKey: 'AIzaSyDvFk3JCnIXtR5CDE7Xj_fMHy76XwWkqEQ',
  databaseURL: 'https://mychat-data-default-rtdb.asia-southeast1.firebasedatabase.app'
};
firebase.initializeApp(config);
const db = firebase.firestore();

async function getRoomsList(db) {
  const roomsRef = db.collection('rooms');
  const snapshot = await roomsRef.get();
  const rooms = [];
snapshot.forEach(doc => {
  console.log(doc.id)
  rooms.push(doc.id);
});
  return rooms;
}

// async function addUser(db,data,id) {
//   const res = await db.collection('users').doc(id).set({nickname: data.userName});
// }
async function addRoom(db,roomname){
  const res = await db.collection('rooms').doc(roomname).set({conversations:{}});
}
async function saveConversation(db,data){
  const datetime = getDateTime();
  const res = await db.collection('rooms').doc(data.room).collection('conversations').doc(datetime).set({messages: data.messageList});
}
function getDateTime(){
  let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
// current hours
let hours = date_ob.getHours();
// current minutes
let minutes = date_ob.getMinutes();
// current seconds
let seconds = date_ob.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

}

app.use(express.json);
// const server = require("http").createServer(app); 
const roomList = getRoomsList(db);

//send roomList to client - not working yet
app.get('/rooms' , (req,res)=>{
  console.log(roomList);
  res.send(roomList);
}); 
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
const io = require('socket.io')(server, {cors: { origin: "*" }})
// const rooms = io.of("/").adapter.rooms;







io.on('connection',socket =>{

  console.log(socket.id)
  socket.on('join_room', (data) =>{
    // addUser(db,data,socket.id);
    addRoom(db,data.room);
    socket.join(data.room);
    socket.to(data.room).emit("receive_users_at_room", data.userName )
    console.log(data.userName +' Joined Room: ' + data.room)
  })
  
  socket.on('send_message', (data) =>{
    console.log(data);
    socket.to(data.room).emit("receive_message", data.content);
  })

  socket.on('saveConversation', (data) =>{
    console.log(data);
    saveConversation(db,data);
  })


  socket.on('disconnect',()=>{
    console.log("USER DISCONNECTED")
  })
})

