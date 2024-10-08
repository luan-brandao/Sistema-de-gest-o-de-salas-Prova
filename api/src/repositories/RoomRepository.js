// repositories/RoomRepository.js
const Room = require('../models/RoomModel');

class RoomRepository {
    // Método para criar uma nova sala
    static async createRoom(roomData) {
        const room = new Room({
            ...roomData,
            currentParticipants: 0, // Inicializa o número de participantes
        });
        await room.save();
        return room;
    }

    // Método para obter todas as salas
    static async getAllRooms() {
        return await Room.find();
    }

    // Método para entrar na sala
    static async enterRoom(roomId) {
        const room = await Room.findById(roomId);
        
        if (!room) {
            throw new Error('Sala não encontrada');
        }

        // Verifica se a capacidade máxima foi atingida
        if (room.currentParticipants < room.capacity) {
            room.currentParticipants += 1; // Incrementa o número de participantes
            await room.save();
            return room;
        } else {
            throw new Error('Capacidade máxima atingida'); // Lança um erro se a capacidade for atingida
        }
    }

    // Método para sair da sala
    static async leaveRoom(roomId) {
        const room = await Room.findById(roomId);
        
        if (!room) {
            throw new Error('Sala não encontrada');
        }

        // Decrementa o número de participantes, garantindo que não fique negativo
        if (room.currentParticipants > 0) {
            room.currentParticipants -= 1; 
            await room.save();
        }
        
        return room;
    }

    // Método para excluir uma sala
// repositories/RoomRepository.js
    static async deleteRoom(roomId) {
        const room = await Room.findById(roomId);
        
        if (!room) {
            throw new Error('Sala não encontrada');
        }

        // Verifica se a sala está vazia
        if (room.currentParticipants > 0) {
            throw new Error('A sala não pode ser excluída porque ainda tem participantes.');
        }

        // Exclui a sala
        await Room.deleteOne({ _id: roomId });
        return { message: 'Sala excluída com sucesso.' };
    }

}

module.exports = RoomRepository;
