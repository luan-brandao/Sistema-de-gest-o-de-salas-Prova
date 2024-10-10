// repositories/RoomRepository.js
const Room = require('../models/RoomModel');

class RoomRepository {
    
    static async createRoom(roomData) {
        const room = new Room({
            ...roomData,
            currentParticipants: 0,
        });
        await room.save();
        return room;
    }

    
    static async getAllRooms() {
        return await Room.find();
    }

    
    static async enterRoom(roomId) {
        const room = await Room.findById(roomId);
        
        if (!room) {
            throw new Error('Sala não encontrada');
        }

        
        if (room.currentParticipants < room.capacity) {
            room.currentParticipants += 1; 
            return room;
        } else {
            throw new Error('Capacidade máxima atingida'); 
        }
    }

    
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

 
    static async deleteRoom(roomId) {
        const room = await Room.findById(roomId);
        
        if (!room) {
            throw new Error('Sala não encontrada');
        }

        
        if (room.currentParticipants > 0) {
            throw new Error('A sala não pode ser excluída porque ainda tem participantes.');
        }

        
        await Room.deleteOne({ _id: roomId });
        return { message: 'Sala excluída com sucesso.' };
    }

}

module.exports = RoomRepository;
