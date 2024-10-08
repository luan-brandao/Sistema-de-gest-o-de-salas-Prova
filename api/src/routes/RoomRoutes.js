// routes/RoomRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const RoomController = require('../controllers/RoomController'); // Importa o RoomController

const router = express.Router();

// Rota para criar uma nova sala
router.post('/', authMiddleware, RoomController.createRoom);

// Rota para obter todas as salas
router.get('/', authMiddleware, RoomController.getAllRooms);

// Rota para entrar na sala
router.post('/:roomId/entrar', authMiddleware, RoomController.enterRoom);

// Rota para sair da sala
router.post('/:roomId/sair', authMiddleware, RoomController.leaveRoom); // Corrigindo a rota para sair da sala

/// routes/RoomRoutes.js
// Rota para excluir uma sala
router.delete('/:roomId', authMiddleware, RoomController.deleteRoom); // Nova rota para excluir sala


module.exports = router;
