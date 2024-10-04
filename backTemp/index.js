// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Crée l'application Express
const app = express();
const server = http.createServer(app);

function getRandomInt() {
  return Math.floor(Math.random() * 100000);
}
// Instancie le serveur Socket.io
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',  // Autorise uniquement cette origine
    methods: ['GET', 'POST'],          // Autorise ces méthodes HTTP
  },
});

app.use(cors({
  origin: 'http://localhost:5173', // Remplace par l'URL de ton front-end
}));
// Middleware pour la route principale
app.get('/', (req, res) => {
  res.send('API Socket.io en cours d\'exécution...');
});

// Gère les connexions socket
io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');

  // Écouter un événement "send_message"
  socket.on('send_message', (data) => {
    console.log('Message reçu :', message);

    // Émettre un événement "new_chat_message" à tous les clients connectés
    const ret = {
      id: getRandomInt(),
      senderId: data.userId,
      message: data.message,
      createdAt: new Date
    }
    io.emit('new_chat_message', message);
  });

  // Écouter la déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Démarre le serveur sur le port 3000
server.listen(3000, () => {
  console.log('Le serveur tourne sur http://localhost:3000');
});