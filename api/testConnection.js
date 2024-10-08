// Importa o Sequelize do pacote sequelize
const { Sequelize } = require('sequelize');

// Cria uma nova instância do Sequelize para conectar ao banco de dados
const sequelize = new Sequelize('prova', 'postgres', '12345678', {
    host: '127.0.0.1',  // ou 'localhost', mas teste com 127.0.0.1
    dialect: 'postgres',
    port: 5432,          // a porta padrão do PostgreSQL
});

// Função auto-invocada para testar a conexão
(async () => {
    try {
        // Tenta autenticar a conexão
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso!');
    } catch (error) {
        // Captura e exibe qualquer erro de conexão
        console.error('Não foi possível conectar ao banco de dados:', error);
    } finally {
        // Fecha a conexão
        await sequelize.close();
    }
})();
