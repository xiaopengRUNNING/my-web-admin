import { io } from 'socket.io-client';

export const socketState = reactive<{
  connected: boolean;
}>({
  connected: false,
});

const URL = 'http://localhost:4000';

export const socket = io(URL);

socket.on('connect', () => {
  socketState.connected = true;
});

socket.on('disconnect', () => {
  socketState.connected = false;
  socket.removeAllListeners();
});
