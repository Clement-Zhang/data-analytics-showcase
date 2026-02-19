import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_SOCKET);

export const receive = (event, handler) => socket.on(event, handler);
