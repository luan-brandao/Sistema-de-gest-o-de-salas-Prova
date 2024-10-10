const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const RoomController = require('../controllers/RoomController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Gerenciamento de salas
 */

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Cria uma nova sala
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Sala criada com sucesso
 */
router.post('/', authMiddleware, RoomController.createRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Retorna todas as salas
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de salas
 */
router.get('/', authMiddleware, RoomController.getAllRooms);

/**
 * @swagger
 * /api/rooms/{roomId}/entrar:
 *   post:
 *     summary: Entra em uma sala
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Entrada na sala bem-sucedida
 */
router.post('/:roomId/entrar', authMiddleware, RoomController.enterRoom);

/**
 * @swagger
 * /api/rooms/{roomId}/sair:
 *   post:
 *     summary: Sai de uma sala
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Saída da sala bem-sucedida
 */
router.post('/:roomId/sair', authMiddleware, RoomController.leaveRoom);

/**
 * @swagger
 * /api/rooms/{roomId}:
 *   delete:
 *     summary: Exclui uma sala
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roomId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da sala
 *     responses:
 *       200:
 *         description: Sala excluída com sucesso
 */
router.delete('/:roomId', authMiddleware, RoomController.deleteRoom);

module.exports = router;
