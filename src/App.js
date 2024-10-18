import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreditoPage from './pages/CreditoPage';
import DebitoPage from './pages/DebitoPage';
import ReservaPage from './pages/ReservaPage';
import MenuLateral from './components/MenuLateral'; 
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Atualiza o estado sempre que houver mudança no token
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <MenuLateral />} {/* Exibe o menu se o usuário estiver logado */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} /> 
          <Route path="/creditos" element={<PrivateRoute><CreditoPage /></PrivateRoute>} /> 
          <Route path="/debitos" element={<PrivateRoute><DebitoPage /></PrivateRoute>} /> 
          <Route path="/reservas" element={<PrivateRoute><ReservaPage /></PrivateRoute>} />
          {/* Outras rotas */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;