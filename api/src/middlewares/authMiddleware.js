const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Obtém o token do cabeçalho de autorização
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    

    // Verifica se o token foi fornecido
    if (!token) return res.status(401).json({ message: 'Acesso negado.' });

    try {
        // Verifica e decodifica o token usando a chave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);
       

       
        req.user = verified;

        next(); // Chama o próximo middleware ou controlador
    } catch (err) {
        
        res.status(400).json({ message: 'Token inválido.' }); // Resposta em caso de erro na verificação
    }
};

module.exports = authMiddleware;
