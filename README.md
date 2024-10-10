# Projeto de Sistema de Salas de Videoconferência

Este projeto é um sistema de videoconferência que permite aos usuários criar e participar de salas de chat e videochamada. O sistema é construído utilizando **Node.js** para o backend e **React** para o frontend, com autenticação JWT e armazenamento em **MongoDB** e **MySQL**.

## Tecnologias Utilizadas

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - MySQL
  - JWT (JSON Web Tokens) para autenticação
  - Socket.IO para comunicação em tempo real

- **Frontend:**
  - React.js
  - CSS para estilização



## Funcionalidades

- **Usuários:**
  - Cadastro de novos usuários
  - Login de usuários
  - Recuperação de dados do usuário autenticado

- **Salas:**
  - Criação de salas de videoconferência
  - Entrada e saída de salas
  - Exclusão de salas

- **Comunicação:**
  - Chat em tempo real usando Socket.IO
  - Compartilhamento de áudio e vídeo

## Instruções de Instalação

### Pré-requisitos

- Node.js
- MongoDB
- MySQL

### Passos para Configuração

```bash
# Clone o repositório
git clone https://github.com/luan-brandao/Prova.git
cd Prova/api

# Instale as dependências do backend
npm install

# Crie um arquivo `.env` na pasta `api` e adicione as seguintes variáveis de ambiente
echo "PORT=3000" >> .env
echo "MONGODB_URI='sua_string_de_conexao_mongodb'" >> .env
echo "MYSQL_HOST='seu_host_mysql'" >> .env
echo "MYSQL_USER='seu_usuario_mysql'" >> .env
echo "MYSQL_PASSWORD='sua_senha_mysql'" >> .env
echo "MYSQL_DATABASE='seu_banco_de_dados_mysql'" >> .env
echo "JWT_SECRET='sua_chave_secreta_jwt'" >> .env

# Inicie o servidor backend
npm start

# Para o frontend, navegue até a pasta do frontend e instale as dependências
cd ../frontend
npm install
````
# Inicie o servidor frontend
npm start
Documentação da API
A documentação da API está disponível em http://localhost:3000/api-docs. Utilize o Swagger para visualizar e testar as rotas disponíveis.

Testando a Aplicação
Registre um novo usuário usando a rota de criação.
Faça login para obter um token JWT.
Utilize o token para acessar rotas protegidas da API.
Teste a criação e entrada em salas de videoconferência.
Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.
