
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
const rooms = [];
async function getRoomsList(db) {
  const roomsRef = db.collection('rooms');
  const snapshot = await roomsRef.get();
snapshot.forEach(doc => {
  rooms.push(doc.id);
});
//  console.log(rooms);
  return rooms;
}

// async function addUser(db,data,id) {
//   const res = await db.collection('users').doc(id).set({nickname: data.userName});
// }
const usersAtRoom=[];
function addToUsersAtRoom(room,userName){
  let addRoom = true;
  let addUser = true;
  for(let i in usersAtRoom){
    if (usersAtRoom[i].room === room) {
    for(let j in usersAtRoom[i].users){
      if ( usersAtRoom[i].users[j] === userName){
        addUser = false;
        addRoom = false;
        break;
      }
    }
    if(addUser){
      usersAtRoom[i].users.push(userName);
      addRoom = false;
    }
  }}
  if(addRoom){
    let new_room = {room: room, users: [userName]};
    usersAtRoom.push(new_room);
  }
  // console.log(usersAtRoom)
}
function getCoversationsAtRoom(room){
  
}

function getUsersAtRoom(room){
    let users = [];
    for(let i in usersAtRoom){
      if(usersAtRoom[i].room === room) {
        users = usersAtRoom[i].users;
        break;
      }
    }
    // console.log(users)
    return users;
}
async function addRoom(db,roomname){
  if(!rooms.includes(roomname)){
  const res = await db.collection('rooms').doc(roomname).set({conversations:{}});
  rooms.push(roomname)}
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

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
const io = require('socket.io')(server, {cors: { origin: "*" }})
// const rooms = io.of("/").adapter.rooms;
getRoomsList(db);
io.on('connection',socket =>{
  
  io.emit('room_list',rooms)
  // console.log(socket.id)
  socket.on('join_room', (data) =>{
    // addUser(db,data,socket.id)
    addToUsersAtRoom(data.room,data.userName);
    addRoom(db,data.room);
    io.emit('room_list',rooms)
    let users = getUsersAtRoom(data.room);
    socket.join(data.room);
    io.in(data.room).emit("receive_users_at_room", users);
    console.log(data.userName +' Joined Room: ' + data.room)
  })
  
  socket.on('send_message', (data) =>{
    // console.log(data);
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

