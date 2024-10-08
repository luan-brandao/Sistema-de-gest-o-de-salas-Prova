import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Profile.css'; // Importa o arquivo de estilo

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isEditing, setIsEditing] = useState(false); // Estado para controle de edição
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redireciona se não estiver autenticado
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setUserInfo(response.data);
                setName(response.data.name); // Define o nome no estado
                setEmail(response.data.email); // Define o e-mail no estado
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
                navigate('/login'); // Redireciona se houver um erro
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const handleUpdate = async () => {
        const token = sessionStorage.getItem('token');
        try {
            await axios.put(`http://localhost:3000/update/${userInfo.id}`, {
                name,
                email,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Perfil atualizado com sucesso!');
            setIsEditing(false); // Fecha o modo de edição após atualizar
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            
            // Verifica se o erro é por conflito de nome
            if (error.response && error.response.status === 409) {
                alert('Já existe um usuário com esse nome. Por favor, escolha outro nome.');
            } else {
                alert('Erro ao atualizar perfil.');
            }
        }
    };

    if (!userInfo) {
        return <p>Carregando informações do usuário...</p>;
    }

    return (
        <div className="profile-container">
            <h1>Meu Perfil</h1>
            <div className="profile-info">
                {isEditing ? (
                    <>
                        <label>
                            <strong>Nome:</strong>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </label>
                        <label>
                            <strong>Email:</strong>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </label>
                    </>
                ) : (
                    <>
                        <p><strong>Nome:</strong> {userInfo.name}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                    </>
                )}
            </div>
            {isEditing ? (
                <button className="profile-button" onClick={handleUpdate}>Salvar Alterações</button>
            ) : (
                <button className="profile-button" onClick={() => setIsEditing(true)}>Atualizar Perfil</button>
            )}
            <button className="profile-button" onClick={() => navigate('/home')}>Voltar para Home</button>
        </div>
    );
};

export default Profile;
