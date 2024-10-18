import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function DashboardPage() {
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
          Dashboard
        </Typography>
        <Typography component="p" variant="body1" sx={{ mt: 2 }}>
          Bem-vindo à sua dashboard!
        </Typography>
      </Box>
    </Container>
  );
}

export default DashboardPage;
