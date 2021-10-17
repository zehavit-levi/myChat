
const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json);

const PORT = process.env.PORT || 3001;


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

io = socket(server);
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

