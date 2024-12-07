import { createServer } from 'node:http';
import { Server } from 'socket.io';
import SocketEventsHandler from './services/SocketEvents';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: '*',
    },
    path: '/ws',
});

const socketEventsHandler = new SocketEventsHandler(io);
socketEventsHandler.initializeEvents();

server.listen(7777, () => {
    console.log('server running at http://localhost:7777');
});