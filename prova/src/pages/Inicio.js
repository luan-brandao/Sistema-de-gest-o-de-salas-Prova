import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Inicio.css'; // Importa o arquivo de estilo

const Inicio = () => {
    return (
        <div className="inicio-container">
            <h1>Bem-vindo ao Sistema de Salas</h1>
            <Link to="/cadastro"><button>Cadastrar</button></Link>
            <Link to="/login"><button>Login</button></Link>
        </div>
    );
};

export default Inicio;
