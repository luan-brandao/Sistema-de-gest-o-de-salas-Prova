const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); // Importando o UUID

class UserController {
    async index(req, res) {
        try {
            const users = await userRepository.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await userRepository.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async store(req, res) {
        try {
            const { name, email, password } = req.body;
    
            // Verifica se já existe um usuário com o mesmo e-mail
            const existingUser = await userRepository.getUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'E-mail já está em uso.' });
            }
    
            // Gera um novo UUID para o usuário
            const userId = uuidv4();
    
            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Cria o novo usuário
            const newUser = await userRepository.createUser({
                id: userId,
                name,
                email,
                password: hashedPassword // Armazena a senha criptografada
            });
    
            res.status(201).json({ message: 'Usuário criado com sucesso!', newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body; // Remova a senha se não for permitido atualizar a senha no perfil
            const updatedUser = await userRepository.updateUser(id, { name, email }); // Não inclua a senha, a menos que a senha seja um campo que você deseje atualizar
            if (!updatedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedUser = await userRepository.deleteUser(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userRepository.getUserByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Senha incorreta.' });
            }

            // Geração do token JWT
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login bem-sucedido!', token }); // Retorna o token
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async getMe(req, res) {
        try {
            const userId = req.user.id; // O ID do usuário autenticado é adicionado ao req pelo middleware
            const user = await userRepository.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar informações do usuário.' });
        }
    }
    
}

module.exports = new UserController();
