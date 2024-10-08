const express = require("express");
const cors = require("cors");
const { connectPg } = require('./config/mysql');
const connectMongoDB = require("./config/mongo");
const userRoutes = require("./routes/UserRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const authMiddleware = require('./middlewares/authMiddleware');
const authRoomMiddleware = require('./middlewares/auth');
const http = require('http');
const initializeSocket = require('./service/socket'); // Importando a função para inicializar o Socket.IO
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Criando o servidor HTTP com Express

// Habilitar CORS
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(authMiddleware);
app.use('/api/rooms', authRoomMiddleware, roomRoutes);

// Conectando ao MongoDB
connectMongoDB();
// Conectando ao MySQL
connectPg();

// Inicializando o Socket.IO
const io = initializeSocket(server);

// Iniciando o servidor
server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
