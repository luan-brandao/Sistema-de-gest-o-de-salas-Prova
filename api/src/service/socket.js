const socketIO = require('socket.io');

const initializeSocket = (server) => {
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:3001",
            methods: ["GET", "POST"],
        },
    });

    io.on('connection', (socket) => {
        const userName = socket.handshake.query.userName; // Captura o nome do usuário da query
        console.log('Novo usuário conectado:', userName || socket.id);

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`Usuário ${userName || socket.id} entrou na sala ${roomId}`);

            // Enviar mensagem de entrada para os outros usuários
            io.to(roomId).emit('receiveMessage', {
                name: 'Sistema',
                message: `${userName} entrou na sala.`,
            });
        });

        socket.on('sendMessage', (messageData) => {
            console.log('Mensagem recebida para sala:', messageData.roomId, 'Mensagem:', messageData.message);
            io.to(messageData.roomId).emit('receiveMessage', messageData);
        });

        socket.on('sendAudio', (audioData) => {
            console.log('Áudio recebido para sala:', audioData.roomId);
            io.to(audioData.roomId).emit('receiveMessage', audioData);
        });

        // Evento quando o usuário inicia uma chamada de vídeo
        socket.on('startVideoCall', (data) => {
            const { roomId, userName } = data;
            console.log(`${userName} iniciou uma chamada de vídeo na sala ${roomId}`);
            
            // Notificar os outros usuários na sala que o usuário iniciou uma chamada de vídeo
            io.to(roomId).emit('userStartedVideoCall', { userName });
        });

        // Evento quando o usuário sai de uma chamada de vídeo
        socket.on('stopVideoCall', (data) => {
            const { roomId, userName } = data;
            console.log(`${userName} saiu da chamada de vídeo na sala ${roomId}`);
            
            // Notificar os outros usuários na sala que o usuário saiu da chamada de vídeo
            io.to(roomId).emit('userStoppedVideoCall', { userName });
        });

        socket.on('leaveRoom', (roomId) => {
            socket.leave(roomId);
            console.log(`Usuário ${userName || socket.id} saiu da sala ${roomId}`);

            // Enviar mensagem de saída para os outros usuários
            io.to(roomId).emit('receiveMessage', {
                name: 'Sistema',
                message: `${userName} saiu da sala.`,
            });
        });

        socket.on('disconnect', () => {
            console.log('Usuário desconectado:', userName || socket.id);
            const rooms = Array.from(socket.rooms).filter(room => room !== socket.id);
            rooms.forEach((roomId) => {
                io.to(roomId).emit('receiveMessage', {
                    name: 'Sistema',
                    message: `${userName || socket.id} saiu do chat.`,
                });
            });
        });
    });

    return io;
};

module.exports = initializeSocket;
