import { Box, TextField, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification, hideNotification } from '../../Redux/slice/snackBarSlice';
import MySnackbar from '../../UI/MySnackBar';
import { fixedTerm } from '../../api/FixedTermDeposit';
import { getAccountBalance } from '../../api/Account';
import { useNavigate } from "react-router";
import ArrowBackComponent from "../../UI/ArrowBack";

export default function PlazoFijo() {

    const [amount, setAmount] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notification = useSelector((state) => state.notification);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const data = await getAccountBalance();
                const accountArs = data.accountArs.find(account => account.accountType === "CAJA_AHORRO");
                setAccountData(accountArs);
                setIsLoading(false)
            } catch (error) {
                console.log();
                setIsLoading(false)
            }
        };
        
        fetchBalance();
    }, [isLoading]);
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const fechaActual = new Date();
        const fechaDeCierre = new Date(closingDate);
        const diferencia = ((fechaDeCierre - fechaActual)/ (1000 * 3600 * 24))+1;

        if (!validateNumbers(parseFloat(amount)) || parseFloat(amount) <= 0) {
            dispatch(showNotification({ message: 'El monto ingresado debe ser un numero mayor a cero', status: 'error' }));
            return;
        }
        if (parseFloat(amount) > accountData.balance) {
            dispatch(showNotification({ message: 'El monto no puede ser mayor que el balance de la cuenta', status: 'error' }));
            return;
        }
        if (!acceptTerms) {
            dispatch(showNotification({ message: 'Debe aceptar los términos y condiciones', status: 'error' }));
            return;
        }
        if (diferencia < 30) {
            dispatch(showNotification({ message: 'La fecha de cierre mínima debe ser de 30 días a partir de hoy', status: 'error' }));
            return;
        }

        const fixedTermData = {
            amount: parseFloat(amount.replace(",", ".")),
            closingDate,
        };

        try {
            setIsLoading(true);
            await fixedTerm(fixedTermData);
            dispatch(showNotification({ message: 'Plazo fijo realizado con éxito', status: 'success' }));
            navigate('/inversiones');
        } catch (error) {
            dispatch(showNotification({ message: error.response ? error.response.data : 'Error del servidor', status: 'error' }));
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSnackbarClose = () => {
        dispatch(hideNotification());
    };

    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency,
        }).format(amount);
    };

    const validateNumbers = (number) => {
        const re = /^[0-9]+$/;
        return re.test(String(number));
    };

    return(
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, ml: 'auto', mr: 'auto', mt: 9, mb: 10, '@media (max-width: 450px)': { maxWidth: '90%' } }}>
        <ArrowBackComponent/>
        <Typography variant='h4' component='h1' gutterBottom>
            Plazo Fijo
        </Typography>
        <Typography variant='h6' component='h7' gutterBottom>
            Balance actual: {accountData ? formatCurrency(accountData.balance, accountData.currency)+' '+accountData.currency : 'Cargando...'}
        </Typography>
        <TextField
            label="Monto"
            value={amount}
            fullWidth
            margin='normal'
            sx={{
                '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#4B56D2',
                },
                },
            }}
            onChange={(e) => setAmount(e.target.value)}
            required
        />
        <TextField
            label="Fecha de Cierre"
            type="date"
            value={closingDate}
            fullWidth
            margin='normal'
            sx={{
                '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#4B56D2',
                },
                },
            }}
            onChange={(e) => setClosingDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
        />
        <FormControlLabel
            control={<Checkbox checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />}
            label="Acepto los términos y condiciones"
        />
        <Typography variant="body2">
            Términos y condiciones: No se puede mover este dinero hasta que no cumpla la fecha estipulada.
        </Typography>
        <Button type="submit" variant="contained" disabled={isLoading} fullWidth
            sx={{ mt: 2, backgroundColor: '#d1d8c5', 
                    '&:hover': { backgroundColor: '#c0c9b5' }, 
                    color: '#000000' }}>
            {isLoading ? 'Cargando...' : 'Crear Plazo Fijo'}
        </Button>
        <MySnackbar
            open={notification.open}
            handleClose={handleSnackbarClose}
            message={notification.message}
            status={notification.status}
        />
    </Box>);
}