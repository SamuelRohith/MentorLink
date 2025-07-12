require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const session = require('express-session'); // Added
const connectDB = require('./config/db');

// Routes
const authRoutes = require('./routes/auth');
const materialRoutes = require('./routes/material');
const forumRoutes = require('./routes/forum');
const feedbackRoutes = require('./routes/feedback');
const usersRoutes = require('./routes/users');

// Initialize app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
  cors: { 
    origin: 'http://localhost:3000' 
  } 
});

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Added express-session middleware
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // ✅ Required for persistent login sessions

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', usersRoutes);

// Basic route
app.get('/', (req, res) => res.send('API running'));

// Socket.io
io.on('connection', (socket) => {
  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('sendMessage', ({ senderId, receiverId, content }) => {
    io.to(receiverId).emit('receiveMessage', { senderId, content });
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
