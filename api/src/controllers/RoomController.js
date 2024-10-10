
const RoomRepository = require('../repositories/RoomRepository');

class RoomController {
    
    static async createRoom(req, res) {
        try {
            const room = await RoomRepository.createRoom(req.body);
            res.status(201).json(room);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar a sala', error: error.message });
        }
    }

    
    static async getAllRooms(req, res) {
        try {
            const rooms = await RoomRepository.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao obter salas', error: error.message });
        }
    }

    static async enterRoom(req, res) {
        try {
            const updatedRoom = await RoomRepository.enterRoom(req.params.roomId);
            res.status(200).json(updatedRoom);
        } catch (error) {
            console.error('Erro ao entrar na sala:', error.message);
            res.status(500).json({ message: error.message });
        }
    }

    
    static async leaveRoom(req, res) {
        try {
            const room = await RoomRepository.leaveRoom(req.params.roomId);
            res.status(200).json(room);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao sair da sala', error: error.message });
        }
    }

   
    static async deleteRoom(req, res) {
        try {
            const room = await RoomRepository.getRoomById(req.params.roomId);

            if (!room) {
                return res.status(404).json({ message: 'Sala não encontrada.' });
            }

            
            if (room.currentParticipants > 0) {
                return res.status(400).json({ message: 'A sala não pode ser excluída porque ainda tem participantes ativos.' });
            }

           
            await RoomRepository.deleteRoom(req.params.roomId);
            return res.status(200).json({ message: 'Sala excluída com sucesso.' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir sala', error: error.message });
        }
    }

}

module.exports = RoomController;
