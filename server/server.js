const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum');
const materialRoutes = require('./routes/material');
const cors = require('cors');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/material', materialRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/mentorship', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

io.on('connection', (socket) => {
  socket.on('newPost', (post) => io.emit('newPost', post));
  socket.on('sendMessage', (msg) => io.emit('receiveMessage', msg));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));