import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_SOCKET);

export const addListener = (event, handler) => socket.on(event, handler);

export const removeListener = (event, handler) => socket.off(event, handler);
