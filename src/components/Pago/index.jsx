import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography
} from '@mui/material';
import { payment } from '../../api/Transaction';
import MySnackbar from '../../UI/MySnackBar';
import { useNavigate } from 'react-router';
import { showNotification, hideNotification } from '../../Redux/slice/snackBarSlice';
import { getAccountBalance } from '../../api/Account';

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

const Pago = () => {
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState('');
  const [accountType, setAccountType] = useState('CAJA_AHORRO');
  const [currency, setCurrency] = useState('ARS');
  const [isLoading, setIsLoading] = useState(false);
  const [balances, setBalances] = useState({ USD: { CAJA_AHORRO: 0 }, ARS: { CAJA_AHORRO: 0, CUENTA_CORRIENTE: 0 } });
  const [balance, setBalance] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const accountData = await getAccountBalance();
        const balances = {
          USD: { CAJA_AHORRO: accountData.accountUsd ? accountData.accountUsd.balance : 0 },
          ARS: {
            CAJA_AHORRO: accountData.accountArs.find(acc => acc.accountType === 'CAJA_AHORRO')?.balance || 0,
            CUENTA_CORRIENTE: accountData.accountArs.find(acc => acc.accountType === 'CUENTA_CORRIENTE')?.balance || 0,
          },
        };
        setBalances(balances);
        setBalance(balances[currency][accountType]);
      } catch (error) {
        console.error("Error fetching account balances: ", error);
        dispatch(showNotification({ message: 'Error al obtener saldos de las cuentas', status: 'error' }));
      }
    };

    fetchAccountBalance();
  }, [dispatch]);

  useEffect(() => {
    if (currency === 'USD' && accountType === 'CUENTA_CORRIENTE') {
      setAccountType('CAJA_AHORRO');
    }
  }, [currency]);

  useEffect(() => {
    setBalance(balances[currency][accountType]);
  }, [currency, accountType, balances]);

  const onChangeAmount = (e) => {
    let result = e.target.value.replace(/\D/g, '');
    setAmount(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(amount) <= balance && amount > 0) {
      const paymentData = {
        amount: parseFloat(amount),
        concept,
        description,
        accountType,
        currency,
        date: new Date().toISOString(),
      };

      try {
        setIsLoading(true);
        await payment(paymentData);
        dispatch(showNotification({ message: 'Pago realizado con éxito', status: 'success' }));
        navigate('/home');
      } catch (error) {
        dispatch(showNotification({ message: error.response ? error.response.data : 'Error del servidor', status: 'error' }));
      } finally {
        setIsLoading(false);
      }
    } else {
      dispatch(showNotification({ message: 'Saldo insuficiente o monto inválido', status: 'error' }));
    }
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Box sx={{ maxWidth: 400, ml: 'auto', mr: 'auto', mt: 9, mb: 10, '@media (max-width: 450px)': { maxWidth: '90%' } }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Cargar Pago
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
        <Typography variant='body2' component='div' color='textSecondary' sx={{ textAlign: 'right' }}>
          Saldo actual: ${balance.toFixed(2)}
        </Typography>
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
          disabled={isLoading || parseFloat(amount) > balance || parseFloat(amount) <= 0}
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

export default Pago;
