const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001", // URL de l'application frontend
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('Mongo URI is not defined in .env file');
    process.exit(1);
}

app.use(cors({
    origin: "http://localhost:3001" // URL de l'application frontend
}));
app.use(bodyParser.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('API Running'));

// Passez io à vos routes
const productRoutes = require('./routes/products')(io);
const userRoutes = require('./routes/user');

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected');
    });
});

server.listen(port, () => console.log(`Server running on port ${port}`));
