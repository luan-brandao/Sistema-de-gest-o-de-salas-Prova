import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Home from './pages/Home';
import Salas from './pages/Salas';
import ChatRoom from './pages/ChatRoom';

import AuthRoute from './components/AuthRoute';
import Profile from './pages/Profile';

const App = () => {
    const [token, setToken] = useState(sessionStorage.getItem('token') || '');

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/home" element={<AuthRoute token={token} element={<Home />} />} />
                <Route path="/salas" element={<AuthRoute token={token} element={<Salas />} />} />
                <Route path="/sala/:roomId" element={<AuthRoute token={token} element={<ChatRoom />} />} />
                <Route path="/profile" element={<AuthRoute token={token} element={<Profile />} />} /> {/* Adiciona a rota do perfil */}
            </Routes>
        </Router>
    );
};

export default App;
