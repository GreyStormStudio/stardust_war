import { createServer } from 'node:http';
import { Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
    },
    path: '/ws',
});
console.log('________________________________')
server.listen(7777, () => {
    console.log('server running at http://localhost:7777');
});

io.on('connect', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
