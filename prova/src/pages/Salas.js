import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import '../style/Salas.css'; // Importa o arquivo de estilo

const Salas = () => {
    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        const fetchRooms = async () => {
            const token = sessionStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/rooms', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRooms(response.data); // Assumindo que a resposta é uma lista de salas
            } catch (error) {
                console.error('Erro ao buscar salas:', error);
                setErrorMessage('Erro ao buscar salas.');
            }
        };

        fetchRooms();
    }, []);

    const enterRoom = async (roomId) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(`http://localhost:3000/api/rooms/${roomId}/entrar`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                alert('Você entrou na sala com sucesso!');
                navigate(`/sala/${roomId}`); // Redireciona para a página da sala com o ID da sala
            }
        } catch (error) {
            console.error('Erro ao entrar na sala:', error.response ? error.response.data.message : error);
            alert(error.response ? error.response.data.message : 'Erro ao entrar na sala.');
        }
    };

    const deleteRoom = async (roomId) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta sala? Esta ação não pode ser desfeita.');
        
        if (!confirmDelete) return;
    
        const token = sessionStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3000/api/rooms/${roomId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Sala excluída com sucesso!');
            // Atualiza a lista de salas após a exclusão
            setRooms((prevRooms) => prevRooms.filter((room) => room._id !== roomId));
        } catch (error) {
            console.error('Erro ao excluir sala:', error.response ? error.response.data.message : error);
            alert(error.response ? error.response.data.message : 'Erro ao excluir sala.');
        }
    };
    
    return (
        <div className="salas-container">
            <h1 className="salas-title">Salas Disponíveis</h1>
            {errorMessage && <p>{errorMessage}</p>}
            {rooms.length === 0 ? (
                <p className="salas-item-empty">Não há salas disponíveis.</p>
            ) : (
                <ul className="salas-list">
                    {rooms.map((room) => (
                        <li key={room._id} className="salas-item">
                            <div className="salas-info">
                                <h2 className="salas-name">{room.name}</h2>
                                <p className="salas-description">Descrição: {room.description || 'Nenhuma descrição disponível.'}</p>
                                <p className="salas-capacity">Capacidade: {room.capacity} pessoas</p>
                                <p className="salas-participants">Participantes atuais: {room.currentParticipants}</p>
                            </div>
                            <div className="salas-actions">
                                <button onClick={() => enterRoom(room._id)} className="salas-button">Entrar</button>
                                {/* Botão para excluir sala, somente se estiver vazia */}
                                {room.currentParticipants === 0 && (
                                    <button onClick={() => deleteRoom(room._id)} className="salas-button salas-button-delete">Excluir</button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/* Botão para voltar ao Home */}
            <button onClick={() => navigate('/home')} className="back-button">Voltar para Home</button>
        </div>
    );
};

export default Salas;
