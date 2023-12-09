import io from 'socket.io-client';

const socket = io('http://127.0.0.1:6001', { transports: ['websocket', 'polling', 'flashsocket']}); 

export default socket;
