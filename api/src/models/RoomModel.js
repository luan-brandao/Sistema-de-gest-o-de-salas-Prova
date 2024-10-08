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
        required: true, // Campo obrigatório
    },
    description: {
        type: String,
        required: false, // Campo opcional
    },
    capacity: {
        type: Number,
        required: true, // Campo obrigatório
    },
    currentParticipants: {
        type: Number,
        default: 0, // Padrão para 0
    },
    isActive: {
        type: Boolean,
        default: true, // Padrão para true
    },
    createdAt: {
        type: Date,
        default: Date.now, // Data de criação padrão
    },
});

// Cria e exporta o modelo Room
module.exports = mongoose.model('Room', roomSchema);
