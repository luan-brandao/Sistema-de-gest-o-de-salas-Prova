// models/RoomModel.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const roomSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4, // Gera um UUID como valor padrão
    },
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: false, 
    },
    capacity: {
        type: Number,
        required: true,
    },
    currentParticipants: {
        type: Number,
        default: 0, // Padrão para 0
    },
    isActive: {
        type: Boolean,
        default: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

// Cria e exporta o modelo Room
module.exports = mongoose.model('Room', roomSchema);
