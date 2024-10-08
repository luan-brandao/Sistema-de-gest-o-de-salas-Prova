import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import '../style/Chat.css';

const Chat = ({ roomId }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [userName, setUserName] = useState('');
    const [isVideoCallActive, setIsVideoCallActive] = useState(false);
    const [videoUsers, setVideoUsers] = useState([]); // Lista de usuários na chamada de vídeo
    const videoRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setUserName(response.data.name);
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                navigate('/login');
            }
        };

        fetchUserInfo();
    }, [navigate]);

    useEffect(() => {
        if (!userName) return;

        const newSocket = io('http://localhost:3000', {
            query: { userName }
        });

        setSocket(newSocket);

        newSocket.emit('joinRoom', roomId);

        newSocket.on('receiveMessage', (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
        });

        // Evento quando um usuário inicia uma chamada de vídeo
        newSocket.on('userStartedVideoCall', (data) => {
            setVideoUsers((prevUsers) => [...prevUsers, data.userName]);
        });

        // Evento quando um usuário sai da chamada de vídeo
        newSocket.on('userStoppedVideoCall', (data) => {
            setVideoUsers((prevUsers) => prevUsers.filter((name) => name !== data.userName));
        });

        return () => {
            newSocket.emit('leaveRoom', roomId);
            newSocket.disconnect();
        };
    }, [roomId, userName]);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            const messageData = {
                roomId,
                message: inputMessage,
                name: userName,
            };

            socket.emit('sendMessage', messageData);
            setInputMessage('');
        }
    };

    const handleAudioRecording = async () => {
        if (isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
        } else {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            recorder.start();
            setIsRecording(true);

            recorder.ondataavailable = async (event) => {
                const audioBlob = new Blob([event.data], { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);

                // Enviar o áudio para o servidor
                const messageData = {
                    roomId,
                    audio: audioUrl,
                    name: userName,
                };
                socket.emit('sendAudio', messageData);
            };
        }
    };

    const handleLeaveChat = async () => {
        const leaveMessage = {
            roomId,
            message: `${userName} saiu do chat.`,
            name: 'Sistema',
        };

        try {
            const token = sessionStorage.getItem('token');
            await axios.post(`http://localhost:3000/api/rooms/${roomId}/sair`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            socket.emit('sendMessage', leaveMessage);
            socket.emit('leaveRoom', roomId);

            alert(`${userName} saiu do chat.`);
            navigate('/salas');
        } catch (error) {
            console.error('Erro ao sair da sala:', error);
            alert('Erro ao sair da sala.');
        }
    };

    const handleVideoCall = async () => {
        setIsVideoCallActive(true);
        socket.emit('startVideoCall', { roomId, userName });

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
        }
    };

    if (!userName) {
        return <p>Carregando informações do usuário...</p>; // Mensagem de carregamento
    }

    return (
        <div className="chat-container">
            <h2>Chat</h2>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.name || 'Usuário'}:</strong> {msg.message}
                        {msg.audio && <audio controls src={msg.audio} />}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Digite sua mensagem"
                    className="message-input"
                />
                <button onClick={handleSendMessage} className="send-button">Enviar</button>
                <button onClick={handleAudioRecording} className="audio-button">
                    {isRecording ? 'Parar Gravação' : 'Gravar Áudio'}
                </button>
                <button onClick={handleLeaveChat} className="leave-button">Sair</button>
                <button onClick={handleVideoCall} className="video-button">Chamada de Vídeo</button>
            </div>

            {isVideoCallActive && (
                <div className="video-call-container">
                    <video ref={videoRef} className="video-call" autoPlay muted></video>
                </div>
            )}

            <div className="video-users-container">
                {videoUsers.length > 0 && <h3>Usuários na Chamada de Vídeo:</h3>}
                {videoUsers.map((user, index) => (
                    <p key={index}>{user} está em chamada de vídeo</p>
                ))}
            </div>
        </div>
    );
};

export default Chat;
