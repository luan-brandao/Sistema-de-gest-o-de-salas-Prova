const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtém o token do cabeçalho de autorização
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    // console.log('Token recebido:', token); // Removido o log do token

    // Verifica se o token foi fornecido
    if (!token) return res.status(401).json({ message: 'Acesso negado.' });

    try {
        // Verifica e decodifica o token usando a chave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Usuário verificado:', verified); // Removido o log do usuário verificado

        // Adiciona os dados do usuário ao objeto req para uso em outros middlewares ou controladores
        req.user = verified;

        next(); // Chama o próximo middleware ou controlador
    } catch (err) {
        // console.error('Erro na verificação do token:', err.message); // Removido o log de erro
        res.status(400).json({ message: 'Token inválido.' }); // Resposta em caso de erro na verificação
    }
};

module.exports = authMiddleware;
