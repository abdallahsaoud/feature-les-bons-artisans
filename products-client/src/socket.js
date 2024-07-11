import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');  // Utilisez l'URL de votre serveur backend

export default socket;
