import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Link, Card, CardContent } from '@mui/material';
import axios from 'axios';
import endpoints from '../config/apiEndpoints';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [senhaHash, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Faz a requisição de login
      const response = await axios.post(endpoints.login, {
        email: email,
        senhaHash: senhaHash,
      });

      // Armazena o token no localStorage
      const token = response.data.token;
      localStorage.setItem('token', token);

      // Faz a requisição para buscar as informações do usuário
      const userResponse = await axios.get(`${endpoints.usuario}/${email}`, {
        headers: {
          Authorization: `Bearer ${token}` // Inclui o token no cabeçalho da requisição
        }
      });

      // Verifique a estrutura do userResponse para encontrar o ID correto
      console.log(userResponse.data); // Verifique a estrutura do retorno

      // Armazena as informações do usuário no localStorage
      localStorage.setItem('nome', userResponse.data.nome); // Nome do usuário
      localStorage.setItem('email', email); // E-mail do usuário
      localStorage.setItem('id', userResponse.data.id);

      // Redireciona para a página de dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Centraliza verticalmente
        }}
      >
        <Card sx={{ width: '100%', boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                Login
              </Typography>

              <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="senhaHash"
                  label="Senha"
                  type="password"
                  id="senhaHash"
                  autoComplete="current-password"
                  value={senhaHash}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && (
                  <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Login
                </Button>

                <Link href="/register" variant="body2">
                  {"Não tem uma conta? Cadastrar Usuário"}
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;
