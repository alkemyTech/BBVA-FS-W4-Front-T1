// components/Deposito.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  CircularProgress,
} from '@mui/material';
import { deposit } from '../../api/Transaction';
import MySnackbar from '../../UI/MySnackBar';
import { useNavigate } from 'react-router';
import { showNotification, hideNotification } from '../../Redux/slice/snackBarSlice';

const transactionConcepts = [
  'VARIOS',
  'ALQUILERES',
  'CUOTAS',
  'EXPENSAS',
  'HONORARIOS',
  'FACTURAS',
  'HABERES',
  'PRESTAMOS',
  'SEGUROS',
];

const accountTypes = {
  USD: ['CAJA_AHORRO'],
  ARS: ['CAJA_AHORRO', 'CUENTA_CORRIENTE'],
};

const Deposito = () => {
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState('');
  const [accountType, setAccountType] = useState('CAJA_AHORRO');
  const [currency, setCurrency] = useState('ARS');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (currency === 'USD' && accountType === 'CUENTA_CORRIENTE') {
      setAccountType('CAJA_AHORRO');
    }
  }, [currency]);

  const onChangeAmount = (e) => {
    let result = e.target.value.replace(/\D/g, '');
    setAmount(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount > 0) {
      const depositData = {
        amount: parseFloat(amount),
        concept,
        description,
        accountType,
        currency,
        date: new Date().toISOString(),
      };

      try {
        setIsLoading(true);
        await deposit(depositData);
        dispatch(showNotification({ message: 'Depósito realizado con éxito', status: 'success' }));
        navigate('/home');
      } catch (error) {
        dispatch(showNotification({ message: error.response ? error.response.data : 'Error del servidor', status: 'error' }));
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(showNotification({ message: 'El monto debe ser mayor que cero', status: 'error' }));
    }
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Box sx={{ maxWidth: 400, ml: 'auto', mr: 'auto', mt: 9, mb: 10, '@media (max-width: 450px)': { maxWidth: '90%' } }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Cargar Saldo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Monto'
          value={amount}
          onChange={onChangeAmount}
          fullWidth
          margin='normal'
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4B56D2',
              },
            },
          }}
          required
        />
        <TextField
          select
          label='Concepto'
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          fullWidth
          margin='normal'
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4B56D2',
              },
            },
          }}
          required
        >
          {transactionConcepts.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label='Descripción'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin='normal'
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4B56D2',
              },
            },
          }}
        />
        <TextField
          select
          label='Tipo de cuenta'
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          fullWidth
          margin='normal'
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4B56D2',
              },
            },
          }}
          required
        >
          {accountTypes[currency].map((option) => (
            <MenuItem key={option} value={option}>
              {option === 'CAJA_AHORRO' ? 'Caja de Ahorro' : 'Cuenta Corriente'}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label='Moneda'
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          fullWidth
          margin='normal'
          sx={{
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#4B56D2',
              },
            },
          }}
          required
        >
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='ARS'>ARS</MenuItem>
        </TextField>
        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{ mt: 2, backgroundColor: '#d1d8c5', '&:hover': { backgroundColor: '#c0c9b5' }, color: '#000000' }}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Cargar'}
        </Button>
      </form>
      <MySnackbar
        open={notification.open}
        handleClose={handleSnackbarClose}
        message={notification.message}
        status={notification.status}
      />
    </Box>
  );
};

export default Deposito;
