// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;

// Connect to MongoDB (replace below uri with your actual MongoDB URI)
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.re3ha3x.mongodb.net/realtimechatapp`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Socket.io setup
const io = require('socket.io')(server);

// Socket.io event handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('chatMessage', (data) => {
        // Save the message to MongoDB and broadcast to all connected clients
        // You'll need to implement this part based on your specific schema and requirements
        console.log(data);
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
