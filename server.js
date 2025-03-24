const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/discussions', require('./routes/discussions'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/schedules', require('./routes/schedules'));
app.use('/api/clubs', require('./routes/clubs'));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Socket.io Setup
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => console.log('User disconnected'));
});

app.get('/', (req, res) => res.send('Server is running'));

server.listen(5000, () => console.log('Server running on port 5000'));