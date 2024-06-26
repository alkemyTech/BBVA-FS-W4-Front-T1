import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  hideNotification,
  showNotification,
} from "../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../UI/ArrowBack";
import MySnackbar from "../../UI/MySnackBar";
import { deposit } from "../../api/Transaction";

const transactionConcepts = [
  "VARIOS",
  "ALQUILERES",
  "CUOTAS",
  "EXPENSAS",
  "HONORARIOS",
  "FACTURAS",
  "HABERES",
  "PRESTAMOS",
  "SEGUROS",
];

const accountTypes = {
  USD: ["CAJA_AHORRO"],
  ARS: ["CAJA_AHORRO", "CUENTA_CORRIENTE"],
};

const Deposito = () => {
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState("CAJA_AHORRO");
  const [currency, setCurrency] = useState("ARS");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    if (currency === "USD" && accountType === "CUENTA_CORRIENTE") {
      setAccountType("CAJA_AHORRO");
      dispatch(
        showNotification({
          message:
            "No tienes cuenta corriente en US$. Seleccionamos tu caja de ahorro",
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
    const amountNumber = parseFloat(amount.replace(",", "."));
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
        dispatch(
          showNotification({
            message: "Depósito realizado con éxito",
            status: "success",
          })
        );
        navigate("/home");
      } catch (error) {
        dispatch(
          showNotification({
            message: error.response
              ? error.response.data
              : "Error del servidor",
            status: "error",
          })
        );
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
      }
    } else {
      dispatch(
        showNotification({
          message: "El monto debe ser mayor que cero",
          status: "error",
        })
      );
    }
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        ml: "auto",
        mr: "auto",
        mt: 9,
        mb: 10,
        "@media (max-width: 450px)": { maxWidth: "90%" },
      }}
    >
      <ArrowBackComponent disabled={isSubmitted} />
      <Typography variant="h4" component="h1" gutterBottom>
        Cargar Saldo
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Monto"
          value={amount}
          onChange={onChangeAmount}
          fullWidth
          margin="normal"
          error={parseFloat(amount.replace(",", ".")) <= 0}
          helperText={
            parseFloat(amount.replace(",", ".")) <= 0
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
                borderColor: "#4B56D2",
              },
            },
          }}
          required
          disabled={isSubmitted}
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
                borderColor: "#4B56D2",
              },
            },
          }}
          disabled={isSubmitted}
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
          disabled={isSubmitted}
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
          disabled={isSubmitted}
        >
          <MenuItem value='USD'>USD</MenuItem>
          <MenuItem value='ARS'>ARS</MenuItem>
        </TextField>

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
          disabled={isSubmitted || parseFloat(amount.replace(",", ".")) <= 0}
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
