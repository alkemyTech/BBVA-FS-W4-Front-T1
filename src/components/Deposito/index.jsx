import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import { incrementarSaldo } from "../../Redux/slice/saldoSlice";
import { deposit } from "../../api/Transaction";
import MySnackbar from "../../UI/MySnackBar/index";
import { useNavigate } from "react-router";

const transactionConcepts = [
  "VARIOS",
  "ALQUILERES",
  "CUOTAS",
  "EXPENSAS",
  "HONORARIOS",
  "FACTURAS",
  "HABERES",
  "PRESTAMOS",
  "SEGUROS"
];

const accountTypes = {
  USD: ["CAJA_AHORRO"],
  ARS: ["CAJA_AHORRO", "CUENTA_CORRIENTE"]
};

const Deposito = () => {
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState("CAJA_AHORRO");
  const [currency, setCurrency] = useState("ARS");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saldo = useSelector((state) => state.saldo.value);

  useEffect(() => {
    if (currency === "USD" && accountType === "CUENTA_CORRIENTE") {
      setAccountType("CAJA_AHORRO");
    }
  }, [currency]);

  const onChangeAmmount = (e) => {
    let result = e.target.value.replace(/\D/g, "");
    setAmount(result);
  }

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
        dispatch(incrementarSaldo(depositData.amount));
        setSuccess("Depósito realizado con éxito");
        setError(null);
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } catch (error) {
        setError(error.response ? error.response.data : "Error del servidor");
        setSuccess(null);
        setSnackbarOpen(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("El monto debe ser mayor que cero");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 400, ml: "auto", mr: "auto", mt: 9, mb: 10, '@media (max-width: 450px)': {maxWidth: '90%'} }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cargar Saldo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Monto"
          value={amount}
          onChange={onChangeAmmount}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#4B56D2", // Cambia el color del borde al hacer hover
              },
            },
          }}
          required
        />
        <TextField
          select
          label="Concepto"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#4B56D2", // Cambia el color del borde al hacer hover
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
          label="Descripción"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#4B56D2", // Cambia el color del borde al hacer hover
              },
            },
          }}
        />
        <TextField
          select
          label="Tipo de cuenta"
          value={accountType}
          onChange={(e) => setAccountType(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#4B56D2", // Cambia el color del borde al hacer hover
              },
            },
          }}
          required
        >
          {accountTypes[currency].map((option) => (
            <MenuItem key={option} value={option}>
              {option === "CAJA_AHORRO" ? "Caja de Ahorro" : "Cuenta Corriente"}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Moneda"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          fullWidth
          margin="normal"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#4B56D2", // Cambia el color del borde al hacer hover
              },
            },
          }}
          required
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="ARS">ARS</MenuItem>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: '#d1d8c5', '&:hover': { backgroundColor: '#c0c9b5' }, color: '#000000' }}
          disabled={isLoading}
        >
          {isLoading ? "Cargando..." : "Cargar"}
        </Button>
      </form>
      <MySnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={error || success || ""}
        status={error ? "error" : "success"}
      />
    </Box>
  );
};

export default Deposito;
