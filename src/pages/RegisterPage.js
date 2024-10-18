import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import endpoints from '../config/apiEndpoints'; // Importar os endpoints centralizados

function RegisterPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senhaHash, setSenhaHash] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(''); // Limpa qualquer erro anterior

    try {
      const response = await axios.post(endpoints.register, {
        nome: nome,
        email: email,
        senhaHash: senhaHash,
        dataCadastro: new Date().toISOString(),
      });
      // Se o cadastro for bem-sucedido, redireciona para a página de login
      navigate('/login');
    } catch (error) {
      // Exibe a mensagem de erro
      setError('Ocorreu um erro ao registrar o usuário. Verifique os dados e tente novamente.');
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
                Cadastro de Usuário
              </Typography>

              <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nome"
                  label="Nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
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
                  onChange={(e) => setSenhaHash(e.target.value)}
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
                  Cadastrar
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default RegisterPage;
