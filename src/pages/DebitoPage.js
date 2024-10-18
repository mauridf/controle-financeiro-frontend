import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function DebitoPage() {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh', // Centraliza o conteúdo
        }}
      >
        <Typography component="h1" variant="h4">
          Débito
        </Typography>
        <Typography component="p" variant="body1" sx={{ mt: 2 }}>
          Bem-vindo ao Cadastro de Débito!
        </Typography>
      </Box>
    </Container>
  );
}

export default DebitoPage;
