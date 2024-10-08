import React from 'react';
import Chat from '../components/Chat';
import { useParams } from 'react-router-dom';
import '../style/ChatRoom.css'; // Importa o arquivo de estilo

const ChatRoom = () => {
    const { roomId } = useParams();

    return (
        <div className="chatroom-container">
            <h1>Chat da Sala</h1>
            <Chat roomId={roomId} />
        </div>
    );
};

export default ChatRoom;
