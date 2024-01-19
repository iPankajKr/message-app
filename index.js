import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const __dirname = dirname(fileURLToPath(import.meta.url))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
});

// Display the chat message in client side
    // First fetch the user message from client side
    // Then from client side emit the message to server
    // At the server side get the message and emit to client-side to display on other side

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg)
    })
})

server.listen(3000, ()=> {
    console.log('server running at http://localhost:3000');
});