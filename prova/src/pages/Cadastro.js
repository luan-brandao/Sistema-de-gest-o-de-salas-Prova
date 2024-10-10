import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o cadastro
import '../style/Cadastro.css'; // Importa o arquivo de estilo

const Cadastro = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar a mensagem de erro
    const navigate = useNavigate(); // Hook para navegação

    const handleRegister = async () => {
        // Validação da senha
        if (password.length < 6) {
            setErrorMessage('A senha deve ter pelo menos 6 dígitos.');
            return; // Impede o envio se a senha for inválida
        }

        try {
            const response = await axios.post('http://localhost:3000/create', {
                name,
                email,
                password,
            });
            // Armazenar o nome no sessionStorage após o cadastro bem-sucedido
            sessionStorage.setItem('name', name);
            alert('Usuário cadastrado com sucesso!');
            // Redirecionar para o login
            navigate('/login');
        } catch (error) {
            console.error(error);
            // Exibir erro no corpo da página
            setErrorMessage('Erro ao cadastrar usuário. Tente novamente.'); // Atualiza a mensagem de erro
        }
    };

    return (
        <div className="cadastro-container">
            <h1>Cadastro</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro, se houver */}
            <input 
                type="text" 
                placeholder="Nome" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
            <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
            <button onClick={handleRegister}>Cadastrar</button>
        </div>
    );
};

export default Cadastro;
