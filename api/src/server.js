const express = require("express");
const cors = require("cors");
const { connectPg } = require('./config/mysql');
const connectMongoDB = require("./config/mongo");
const userRoutes = require("./routes/UserRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const authMiddleware = require('./middlewares/authMiddleware');
const authRoomMiddleware = require('./middlewares/auth');
const http = require('http');
const initializeSocket = require('./service/socket');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc'); // Importa o swagger-jsdoc
require('dotenv').config();

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(express.json());


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentação da API",
            version: "1.0.0",
            description: "Documentação das rotas da API"
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
app.use(userRoutes);
app.use(authMiddleware);
app.use('/api/rooms', authRoomMiddleware, roomRoutes);


connectMongoDB();

connectPg();


const io = initializeSocket(server);


server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
