import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import BookIcon from '@mui/icons-material/Book';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import endpoints from '../config/apiEndpoints';


const DashboardPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalCredits, setTotalCredits] = useState(0); // Estado para armazenar o total de créditos
  const [totalDebits, setTotalDebits] = useState(0); // Estado para armazenar o total de Débitos
  const userId = localStorage.getItem('id'); // Obtém o ID do usuário do localStorage
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };
  
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleStartDateChange = (event) => setStartDate(event.target.value);
  const handleEndDateChange = (event) => setEndDate(event.target.value);

  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];

  // Função para buscar o total de créditos
  const fetchTotalCredits = async () => {
    try {
      const response = await axios.get(
        `${endpoints.dashboard}/creditos/mes?usuarioId=${userId}`
      );
  
      // Exibe a resposta no console
      console.log('Resposta do servidor:', response.data);
  
      // Acessa o primeiro item do array e obtém o total
      if (response.data.length > 0) {
        setTotalCredits(response.data[0].total);
      } else {
        console.error('Nenhum crédito encontrado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao buscar créditos:', error);
    }
  };     

  // Função para buscar o total de débitos
  const fetchTotalDebits = async () => {
    try {
      const response = await axios.get(
        `${endpoints.dashboard}/debitos/mes?usuarioId=${userId}`
      );
  
      // Exibe a resposta no console
      console.log('Resposta do servidor:', response.data);
  
      // Acessa o primeiro item do array e obtém o total
      if (response.data.length > 0) {
        setTotalDebits(response.data[0].total);
      } else {
        console.error('Nenhum débito encontrado na resposta.');
      }
    } catch (error) {
      console.error('Erro ao buscar débitos:', error);
    }
  };

  // Efeito para buscar os créditos quando o mês ou ano mudar
  useEffect(() => {
    fetchTotalCredits();
  }, [selectedMonth, selectedYear]);

  // Função para formatar o número como moeda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Efeito para buscar os débitos quando o mês ou ano mudar
  useEffect(() => {
    fetchTotalDebits();
  }, [selectedMonth, selectedYear]);
  
  return (
    <Box sx={{ p: 4 }}>
      {/* Título do Dashboard */}
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>

      {/* Seção de Cards - Créditos, Débitos, Reservas, Saldo Final */}
      <Grid container spacing={3} justifyContent="center">
        {/* Card de Créditos */}
        <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Créditos/Mês</Typography>
              <AttachMoneyIcon fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {formatCurrency(totalCredits)} {/* Exibe o total formatado */}
              </Typography>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Mês</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Ano</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange}>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Débitos */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#f44336', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Débitos/Mês</Typography>
              <CreditCardIcon fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {formatCurrency(totalDebits)} {/* Exibe o total formatado */}
              </Typography>
              {/* Seletor de Mês e Ano */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Mês</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Ano</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange}>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Reservas */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#ff9800', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Reservas/Mês</Typography>
              <BookIcon fontSize="large" />
              {/* Seletor de Mês e Ano */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Mês</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Ano</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange}>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Saldo Final */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2196f3', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6">Saldo Final/Mês</Typography>
              <TrendingUpIcon fontSize="large" />
              {/* Seletor de Mês e Ano */}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Mês</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange}>
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Ano</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange}>
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2023}>2023</MenuItem>
                  <MenuItem value={2022}>2022</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Informativos de Reservas e Saldos */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5">Informações Anuais e de Reservas</Typography>

        {/* Total de Uso das Reservas no Ano */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Total de Uso das Reservas no Ano: R$00,00</Typography>
        </Box>

        {/* Saldo Atual das Reservas */}
        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Data Início"
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label="Data Fim"
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <Button variant="contained" sx={{ alignSelf: 'center' }}>Buscar</Button>
        </Box>

        {/* Resultado do Saldo Atual */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Saldo Atual das Reservas: R$00,00</Typography>
        </Box>

        {/* Espaço para os Gráficos */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Gráfico Histórico de Reservas */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Histórico de Reservas</Typography>
                {/* Aqui será implementado o gráfico */}
                <Box sx={{ height: 300, backgroundColor: '#f0f0f0' }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Gráfico de Evolução das Transações */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Evolução das Transações</Typography>
                {/* Aqui será implementado o gráfico */}
                <Box sx={{ height: 300, backgroundColor: '#f0f0f0' }} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Informativo: Valores Adicionados e/ou Usados das Reservas */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Valores Adicionados e/ou Usados das Reservas</Typography>

          {/* Período de busca */}
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <TextField
              label="Data Início"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Data Fim"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <Button variant="contained" sx={{ alignSelf: 'center' }}>Buscar</Button>
          </Box>

          {/* Exibição dos valores baseados no período */}
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Adicionados: R$00,00 | Usados: R$00,00</Typography>
          </Box>
        </Box>

        {/* Informativo: Reservas e Saldos das Reservas */}
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6">Reservas e Saldos das Reservas</Typography>

          {/* Tabela de Reservas e seus Saldos */}
          {/* Tabela de Transações */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Data</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Tipo</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold', backgroundColor: '#e0e0e0' }}>Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Exibir as transações aqui */}
                <TableRow>
                  <TableCell align="center">01/01/2024</TableCell>
                  <TableCell align="center">Crédito</TableCell>
                  <TableCell align="center">R$100,00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">02/01/2024</TableCell>
                  <TableCell align="center">Débito</TableCell>
                  <TableCell align="center">R$50,00</TableCell>
                </TableRow>
                {/* Adicione mais linhas conforme necessário */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
      </Box>
    </Box>
  );
};

export default DashboardPage;
