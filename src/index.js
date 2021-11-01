require('dotenv').config();

require('module-alias/register');
const db = require('./config/db');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const {
  addUser,
  removeUser,
  getUser,
  getRoomUsers,
} = require('./app/model/chatroom');

//router
const authRoute = require('@api/auth');
const userRoute = require('@api/user');
const uploadRoute = require('@api/upload');
const question = require('@api/question');

//connect to DB
db.connect();

//bodyParser Middelware
const app = express();
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });
app.use(express.json()); // we need to tell server to use json as well
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // We're telling express to use CORS

// End point
app.get('/', (req, res) => {
  res.json('Api is working');
});

//use router
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/upload', uploadRoute);
app.use('/quiz', question);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Sever run at http://localhost:${PORT}`));

// Socket
io.on('connect', (socket) => {
  socket.on('join', ({ user, room }, callback) => {
    console.log(user, room);
    const { response, error } = addUser({
      id: socket.id,
      user: user,
      room: room,
    });

    console.log(response);

    if (error) {
      callback(error);
      return;
    }
    socket.join(response.room);
    socket.emit('message', {
      user: 'admin',
      text: `Welcome ${response.user} `,
    });
    socket.broadcast
      .to(response.room)
      .emit('message', { user: 'admin', text: `${response.user} has joined` });

    io.to(response.room).emit('roomMembers', getRoomUsers(response.room));
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.user, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.user} has left`,
      });
    }
  });
});
