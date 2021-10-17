
const express = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.json);

const server = require("http").createServer(app); 
const io = require('socket.io')(server, {cors: { origin: "*" }})

server.listen('3001', () => {
  console.log(`Server listening on ${3001}`);
});

io.on('connection',socket =>{
  console.log(socket.id)

  socket.on('join_room', (data) =>{
    socket.join(data);
    console.log('User Joined Room: ' + data)
  })




  socket.on('disconnect',()=>{
    console.log("USER DISCONNECTED")
  })
})

