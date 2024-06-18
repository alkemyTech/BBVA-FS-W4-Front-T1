import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { deposit } from '../../api/Transaction';
import MySnackbar from '../../UI/MySnackBar';
import { useNavigate } from 'react-router';
import { showNotification, hideNotification } from '../../Redux/slice/snackBarSlice';
import ArrowBackComponent from '../../UI/ArrowBack';

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (currency === 'USD' && accountType === 'CUENTA_CORRIENTE') {
      setAccountType('CAJA_AHORRO');
      dispatch(
        showNotification({
          message: "No tienes cuenta corriente en US$. Seleccionamos tu caja de ahorro",
          status: "error",
        })
      );
    }
  }, [currency]);

  const onChangeAmount = (e) => {
    let result = e.target.value.replace(/[^0-9,]/g, "");

    const parts = result.split(",");
    if (parts.length > 2) {
      result = parts[0] + "," + parts.slice(1).join("");
    }

    setAmount(result);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount.replace(',', '.'));
    if (amountNumber > 0) {
      const depositData = {
        amount: amountNumber,
        concept,
        description,
        accountType,
        currency,
        date: new Date().toISOString(),
      };

      try {
        setIsLoading(true);
        setIsSubmitted(true);
        await deposit(depositData);
        dispatch(showNotification({ message: 'Depósito realizado con éxito', status: 'success' }));
        navigate('/home');
      } catch (error) {
        dispatch(showNotification({ message: error.response ? error.response.data : 'Error del servidor', status: 'error' }));
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
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
      <ArrowBackComponent disabled={isSubmitted}/> 
      <Typography variant='h4' component='h1' gutterBottom>
        Cargar Saldo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Monto"
          value={amount}
          onChange={onChangeAmount}
          fullWidth
          margin="normal"
          error={parseFloat(amount.replace(',', '.')) <= 0}
          helperText={
            parseFloat(amount.replace(',', '.')) <= 0
              ? "El monto debe ser mayor a cero"
              : ""
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#4B56D2",
              },
            },
          }}
          required
          disabled={isSubmitted}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Concepto</InputLabel>
          <Select
            label="Concepto"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            disabled={isSubmitted}
          >
            {transactionConcepts.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
          disabled={isSubmitted}
        />

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Tipo de cuenta</InputLabel>
          <Select
            label="Tipo de cuenta"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            disabled={isSubmitted}
          >
            {accountTypes[currency].map((option) => (
              <MenuItem key={option} value={option}>
                {option === 'CAJA_AHORRO' ? 'Caja de Ahorro' : 'Cuenta Corriente'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Moneda</InputLabel>
          <Select
            label="Moneda"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={isSubmitted}
          >
            <MenuItem value='USD'>USD</MenuItem>
            <MenuItem value='ARS'>ARS</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#d1d8c5",
            "&:hover": { backgroundColor: "#c0c9b5" },
            color: "#000000",
          }}
          disabled={isSubmitted || parseFloat(amount.replace(',', '.')) <= 0}
        >
          {isSubmitted ? "Cargando..." : "Cargar"}
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
