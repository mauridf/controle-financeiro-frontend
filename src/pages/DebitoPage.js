import React, { useState, useEffect, useRef } from 'react';
import {
  Container, FormControl, FormControlLabel, Typography, Box, Checkbox, TextField, Button, MenuItem, InputLabel, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Edit, Delete } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import endpoints from '../config/apiEndpoints';

function DebitoPage() {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [error, setError] = useState('');
  const [debitos, setDebitos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const formRef = useRef(null);

  const meses = [
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

  useEffect(() => {
    loadDebitos();
  }, [page]);

  const loadDebitos = async () => {
    try {
      const usuarioId = localStorage.getItem('id');
      const response = await axios.get(`${endpoints.debito}/usuario/${usuarioId}?page=${page}&limit=5`);
      setDebitos(response.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Erro ao carregar os débitos:', error);
      setError('Erro ao carregar os débitos');
    }
  };

  const onSubmit = async (data) => {
    setError('');

    try {
      const token = localStorage.getItem('token');
      const payload = {
        usuarioId: localStorage.getItem('id'),
        descricao: data.descricao,
        valor: parseFloat(data.valor.replace(/\./g, '').replace(',', '.')),
        mes: meses.find(m => m.label === data.mes).value,
        ano: parseInt(data.ano, 10),
        pago: data.pago,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (editId) {
        await axios.put(`${endpoints.debito}/${editId}`, payload, config);
        setEditId(null);
      } else {
        await axios.post(endpoints.debito, payload, config);
      }

      reset();
      loadDebitos();
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Erro de autenticação. Verifique suas credenciais.');
      } else {
        setError('Erro ao salvar o débito');
      }
    }
  };

  const handleEdit = (debito) => {
    setEditId(debito.id);
    setValue('descricao', debito.descricao);
    
    // Atualizar valor no campo NumericFormat (precisa garantir que o valor seja convertido corretamente para string formatada)
    setValue('valor', debito.valor.toFixed(2).replace('.', ','));
  
    // Garantir que o Select do mês receba o valor correto
    //setValue('mes', meses.find(m => m.value === debito.mes)?.label);
    setValue('mes', debito.mes);
  
    // Definir o valor do ano e se o débito está pago ou não
    setValue('ano', debito.ano);
    setValue('pago', debito.pago); // Checkbox do campo pago
  };  

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente deletar o débito?')) {
      try {
        await axios.delete(`${endpoints.debito}/${id}`);
        loadDebitos();
      } catch (error) {
        console.error('Erro ao deletar o débito:', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="form-content"
          id="form-header"
          sx={{ backgroundColor: '#f5f5f5', color: 'black' }} // Cor de fundo cinza claro e texto preto
        >
          <Typography variant="h5" align="center" sx={{ width: '100%' }}>
            Cadastro de Débito
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            ref={formRef}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 3,
              width: '100%',
              maxWidth: 400,
              mx: 'auto', // Centraliza o formulário
            }}
          >
            <TextField
              {...register('descricao', { required: true })}
              margin="normal"
              required
              fullWidth
              id="descricao"
              label="Descrição"
              autoFocus
            />

            <NumericFormat
              {...register('valor', { required: true })}
              customInput={TextField}
              margin="normal"
              required
              fullWidth
              id="valor"
              label="Valor"
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              onValueChange={(values) => {
                setValue('valor', values.value);
              }}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="mes-label">Mês</InputLabel>
              <Select
                {...register('mes', { required: true })}
                labelId="mes-label"
                id="mes"
                label="Mês"
                value={watch('mes') || ''} // Garantir que 'mes' tenha um valor válido ou vazio
                onChange={(e) => setValue('mes', e.target.value)}
              >
                {meses.map((mes) => (
                  <MenuItem key={mes.value} value={mes.value}>
                    {mes.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              {...register('ano', { required: true, minLength: 4, maxLength: 4 })}
              margin="normal"
              required
              fullWidth
              id="ano"
              label="Ano"
              type="number"
              inputProps={{ maxLength: 4 }}
            />

            {/* Checkbox para indicar se o débito foi pago */}
            <FormControlLabel
              control={
                <Checkbox
                  {...register('pago')}
                  checked={watch('pago') || false} // Garantir que sempre tenha um valor booleano
                  onChange={(e) => setValue('pago', e.target.checked)}
                />
              }
              label="Pago"
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {editId ? 'Atualizar' : 'Salvar'}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="table-content"
          id="table-header"
          sx={{ backgroundColor: '#f5f5f5', color: 'black' }} // Cor de fundo cinza claro e texto preto
        >
          <Typography variant="h5" align="center" sx={{ width: '100%' }}>Débitos Cadastrados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mt: 2 }}>
            {Array.isArray(debitos) && debitos.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Descrição</strong></TableCell>
                      <TableCell><strong>Valor</strong></TableCell>
                      <TableCell><strong>Mês</strong></TableCell>
                      <TableCell><strong>Ano</strong></TableCell>
                      <TableCell><strong>Pago</strong></TableCell>
                      <TableCell><strong>Ação</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {debitos.map((debito) => (
                      <TableRow key={debito.idString}>
                        <TableCell>{debito.descricao}</TableCell>
                        <TableCell>{`R$ ${debito.valor.toFixed(2).replace('.', ',')}`}</TableCell>
                        <TableCell>{debito.mes}</TableCell>
                        <TableCell>{debito.ano}</TableCell>
                        <TableCell>{debito.pago ? 'Pago' : 'A Pagar'}</TableCell> {/* Verificação aqui */}
                        <TableCell>
                          <IconButton onClick={() => handleEdit(debito)}>
                            <Edit />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(debito.id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography align="center" variant="body1" sx={{ mt: 2 }}>
                Nenhum débito cadastrado.
              </Typography>
            )}
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default DebitoPage;
