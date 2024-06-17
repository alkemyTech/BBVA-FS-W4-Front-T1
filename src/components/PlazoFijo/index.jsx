import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification, hideNotification } from '../../Redux/slice/snackBarSlice';
import MySnackbar from '../../UI/MySnackBar';
import { fixedTerm } from '../../api/FixedTermDeposit';
import { useNavigate } from "react-router";

export default function PlazoFijo() {

    const [amount, setAmount] = useState('');
    const [closingDate, setClosingDate] = useState('');
    //const [termType, setTermType] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const notification = useSelector((state) => state.notification);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (amount > 0) {
            const fixedTermData = {
              amount: parseFloat(amount),
              closingDate,
            };
      
            try {
              setIsLoading(true);
              await fixedTerm(fixedTermData);
              dispatch(showNotification({ message: 'Plazo fijo realizado con éxito', status: 'success' }));
              navigate('/home');
            } catch (error) {
              dispatch(showNotification({ message: error.response ? error.response.data : 'Error del servidor', status: 'error' }));
            } finally {
              setIsLoading(false);
            }
        } else {
            dispatch(showNotification({ message: 'El monto debe ser mayor que cero', status: 'error' }));
        }
        if (!acceptTerms) {
            dispatch(showNotification({ message: 'Debe aceptar los términos y condiciones', status: 'error' }));
        }
        
        //dispatch(createPlazoFijo({ amount, closingDate, termType }))
        //    .finally(() => setIsLoading(false));
    };
    
    const handleSnackbarClose = () => {
        dispatch(hideNotification());
    };
    

    return(
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, ml: 'auto', mr: 'auto', mt: 9, mb: 10, '@media (max-width: 450px)': { maxWidth: '90%' } }}>
        <Typography variant='h4' component='h1' gutterBottom>
            Crear Plazo Fijo
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
            //defaultValue="aaaa-mm-dd"
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
        {/* <FormControl required fullWidth margin='normal'
            sx={{'& .MuiOutlinedInput-root': {'&:hover fieldset': {borderColor: '#4B56D2',},},}}>
            <InputLabel>Tipo de Plazo</InputLabel>
            <Select label="Tipo de Plazo"
                value={termType}
                onChange={(e) => setTermType(e.target.value)}
            >
                <MenuItem value="30">30 días</MenuItem>
                <MenuItem value="60">60 días</MenuItem>
                <MenuItem value="90">90 días</MenuItem>
            </Select>
        </FormControl> */}
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