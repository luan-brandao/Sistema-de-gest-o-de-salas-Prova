// src/components/AuthRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ token, element }) => {
    // Verifica se o token está presente
    return token ? element : <Navigate to="/login" />;
};

export default AuthRoute;
