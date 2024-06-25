import {
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showNotification,
  hideNotification,
} from "../../Redux/slice/snackBarSlice";
import MySnackbar from "../../UI/MySnackBar";
import { fixedTerm } from "../../api/FixedTermDeposit";
import { getAccountBalance } from "../../api/Account";
import { useNavigate } from "react-router";
import ArrowBackComponent from "../../UI/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function PlazoFijo() {
  const [amount, setAmount] = useState("");
  const [closingDate, setClosingDate] = useState(null);
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
        const accountArs = data.accountArs.find(
          (account) => account.accountType === "CAJA_AHORRO"
        );
        setAccountData(accountArs);
        setIsLoading(false);
      } catch (error) {
        console.log();
        setIsLoading(false);
      }
    };

    fetchBalance();
  }, [isLoading]);

  const handleInputRestriction =
    (allowedCharacters = "") =>
    (e) => {
      const isAllowedCharacter = new RegExp(`[^${allowedCharacters}]`).test(
        e.key
      );
      const isBackspace = e.key === "Backspace";
      const isTab = e.key === "Tab"; // Check for Tab key

      if (isAllowedCharacter && !isBackspace && !isTab) {
        e.preventDefault();
      }
    };

  const today = new Date();
  const minDate = dayjs(new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaActual = new Date();
    const fechaDeCierre = new Date(closingDate);
    const diferencia = (fechaDeCierre - fechaActual) / (1000 * 3600 * 24) + 1;

    if (!validateNumbers(parseFloat(amount)) || parseFloat(amount) <= 0) {
      dispatch(
        showNotification({
          message: "El monto ingresado debe ser un numero mayor a cero",
          status: "error",
        })
      );
      return;
    }
    if (parseFloat(amount) > accountData.balance) {
      dispatch(
        showNotification({
          message: "El monto no puede ser mayor que el balance de la cuenta",
          status: "error",
        })
      );
      return;
    }
    if (!acceptTerms) {
      dispatch(
        showNotification({
          message: "Debe aceptar los términos y condiciones",
          status: "error",
        })
      );
      return;
    }
    if (diferencia < 30) {
      dispatch(
        showNotification({
          message:
            "La fecha de cierre mínima debe ser de 30 días a partir de hoy",
          status: "error",
        })
      );
      return;
    }

    const fixedTermData = {
      amount: parseFloat(amount.replace(",", ".")),
      closingDate,
    };

    try {
      setIsLoading(true);
      await fixedTerm(fixedTermData);
      dispatch(
        showNotification({
          message: "Plazo fijo realizado con éxito",
          status: "success",
        })
      );

      navigate("/inversiones");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.response ? error.response.data : "Error del servidor",
          status: "error",
        })
      );
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

  return (
    <Container sx={{ marginBottom: 3 }}>
      <ArrowBackComponent />

      <Grid
        container
        sx={{
          margin: "0 auto",
          bgcolor: "#fff",
          width: 480,
          p: 5,
          borderRadius: 5,
          boxShadow: 3,
          display: "flex",
        }}
      >
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Crear Plazo Fijo
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" component="h7" gutterBottom>
            Balance actual:{" "}
            {accountData
              ? formatCurrency(accountData.balance, accountData.currency) +
                " " +
                accountData.currency
              : "Cargando..."}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <TextField
            label="Monto"
            value={amount}
            fullWidth
            marg
            onChange={(e) => setAmount(e.target.value)}
            required
            onKeyDown={handleInputRestriction("0-9")}
          />
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <DatePicker
            required
            label="Fecha de Cierre"
            value={closingDate}
            minDate={minDate}
            onChange={(e) => setClosingDate(e)}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
            }
            label="Acepto los términos y condiciones"
          />
          <Typography variant="body2">
            Términos y condiciones: No se puede mover este dinero hasta que no
            cumpla la fecha estipulada.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 2,
              backgroundColor: "#d1d8c5",
              "&:hover": { backgroundColor: "#c0c9b5" },
              color: "#000000",
            }}
          >
            {isLoading ? "Cargando..." : "Crear"}
          </Button>
        </Grid>
      </Grid>

      <MySnackbar
        open={notification.open}
        handleClose={handleSnackbarClose}
        message={notification.message}
        status={notification.status}
      />
    </Container>
  );
}
