// src/repositories/UserRepository.js
const User = require('../models/User');

class UserRepository {
    async getAllUsers() {
        try {
            return await User.findAll(); // Usando findAll para retornar todos os usuários
        } catch (error) {
            throw new Error('Erro ao buscar usuários: ' + error.message);
        }
    }

    async getUserById(id) {
        try {
            return await User.findByPk(id); // Usando findByPk para buscar pelo ID
        } catch (error) {
            throw new Error('Erro ao buscar usuário: ' + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({ where: { email } }); // Usando a cláusula where
        } catch (error) {
            throw new Error('Erro ao buscar usuário por email: ' + error.message);
        }
    }

    async createUser(userData) {
        try {
            return await User.create(userData); // Usando create do Sequelize
        } catch (error) {
            throw new Error('Erro ao criar usuário: ' + error.message);
        }
    }

    async updateUser(id, userData) {
        try {
            const [updated] = await User.update(userData, { where: { id } }); // Usando update com where
            if (!updated) {
                throw new Error('Usuário não encontrado para atualização.');
            }
            return await this.getUserById(id); // Retornando o usuário atualizado
        } catch (error) {
            throw new Error('Erro ao atualizar usuário: ' + error.message);
        }
    }
    

    async deleteUser(id) {
        try {
            const result = await User.destroy({ where: { id } }); // Usando destroy com where
            return result > 0; // Retorna true se um usuário foi deletado
        } catch (error) {
            throw new Error('Erro ao deletar usuário: ' + error.message);
        }
    }
}

module.exports = new UserRepository(); // Singleton
