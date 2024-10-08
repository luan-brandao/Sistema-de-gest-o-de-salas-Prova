// src/config/mysql.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

// Função para conectar ao MySQL
const connectPg = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com MySQL estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao MySQL:', error);
    }
};

// Exportando tanto a instância do Sequelize quanto a função de conexão
module.exports = {
    sequelize,
    connectPg,
};
