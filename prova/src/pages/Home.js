import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Home.css'; // Importa o arquivo de estilo

const Home = () => {
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = sessionStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:3000/api/rooms',
                { name: roomName, description, capacity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log('Sala criada com sucesso:', response.data);
            setRoomName('');
            setDescription('');
            setCapacity('');
            setSuccessMessage('Sala criada com sucesso!'); 
        } catch (error) {
            console.error('Erro ao criar sala:', error.response ? error.response.data : error.message);
            setSuccessMessage('Erro ao criar sala.');
        }
    };

    const goToRoomsPage = () => {
        navigate('/salas');
    };

    const goToProfilePage = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('name');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <h1 className="home-title">Criar Sala</h1>
            <form className="home-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome da Sala"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    required
                    className="home-input"
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="home-input"
                />
                <input
                    type="number"
                    placeholder="Capacidade"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                    className="home-input"
                />
                <button type="submit" className="home-submit-button">Criar Sala</button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}

            <button className="home-rooms-button" onClick={goToRoomsPage}>Ir para Salas</button>
            
            {/* Botão de Perfil */}
            <button className="home-profile-button" onClick={goToProfilePage}>Meu Perfil</button>

            {/* Botão de Logout */}
            <button className="home-logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
