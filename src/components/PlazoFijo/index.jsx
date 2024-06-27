import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  clearSelectedDay,
  clearSimulatedFixedTerm,
  setTotalInverted,
} from "../../Redux/slice/fixedTermSlice";
import {
  hideNotification,
  showNotification,
} from "../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../UI/ArrowBack";
import MySnackbar from "../../UI/MySnackBar";
import { getAccountBalance } from "../../api/Account";
import { fixedTerm } from "../../api/FixedTermDeposit";

export default function CrearPlazoFijo() {
  const [amount, setAmount] = useState("");
  const [closingDate, setClosingDate] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);
  const simulatedFixedTerm = useSelector(
    (state) => state.fixedTerm.data
  );
  const selectedDay = useSelector(
    (state) => state.fixedTerm.selectedDay
  );

  const totalInverted = useSelector(
    (state) => state.fixedTerm.totalInverted
  );

  useEffect(() => {
    setIsLoading(true);
    dispatch(hideNotification());
    if (simulatedFixedTerm) {
      console.log("SIMULADO", simulatedFixedTerm);
      setAmount(simulatedFixedTerm.amount);
      setClosingDate(simulatedFixedTerm.closingDate);
    }

    if (selectedDay) {
      handleDayClick(selectedDay);
    }
  }, []);

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

  const today = new Date();
  const minDate = dayjs(new Date(today.getTime() + 31 * 24 * 60 * 60 * 1000));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fechaActual = new Date();
    const fechaDeCierre = new Date(closingDate);
    const diferencia = (fechaDeCierre - fechaActual) / (1000 * 3600 * 24) + 1;

    if (parseFloat(amount) <= 0) {

      dispatch(
        showNotification({
          message: "El monto debe ser mayor a cero.",
          status: "error",
        })
      );
      setAmountError("El monto debe ser mayor a cero.");
      return;
    } else {
      setAmountError("");
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
      dispatch(clearSimulatedFixedTerm());
      dispatch(clearSelectedDay());
      dispatch(setTotalInverted(totalInverted+fixedTermData.amount));

      navigate("/plazos-fijos");
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

  const handleDayClick = (day) => {
    if (day === "Otro") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      const today = new Date();
      let closingDate;
      switch (day) {
        case "30":
          closingDate = dayjs(today.getTime() + 31 * 24 * 60 * 60 * 1000);
          break;
        case "60":
          closingDate = dayjs(today.getTime() + 61 * 24 * 60 * 60 * 1000);
          break;
        case "90":
          closingDate = dayjs(today.getTime() + 91 * 24 * 60 * 60 * 1000);
          break;
        default:
          closingDate = null;
      }
      setClosingDate(closingDate);
    }
    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = { ...prevSelectedDays };
      Object.keys(newSelectedDays).forEach((key) => {
        newSelectedDays[key] = false;
      });
      newSelectedDays[day] = true;
      return newSelectedDays;
    });
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

  return (
    <Container sx={{ marginBottom: 3, marginTop: 2 }}>
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
          <Typography variant="h6">
            Balance actual:{" "}
            {accountData
              ? formatCurrency(accountData.balance, accountData.currency) +
                " " +
                accountData.currency
              : "Cargando..."}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Typography variant="h7">¿Cuanto queres invertir?</Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <NumericFormat
            label="Monto"
            value={amount}
            onValueChange={({ floatValue }) =>
              setAmount(floatValue !== undefined ? floatValue.toFixed(2) : "")
            }
            customInput={TextField}
            thousandSeparator={"."}
            decimalSeparator={","}
            allowNegative={false}
            prefix={"$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            fullWidth
            required
            error={parseFloat(amount.replace(",", ".")) <= 0}
            helperText={
              parseFloat(amount.replace(",", ".")) <= 0
                ? "El monto debe ser mayor a cero"
                : ""
            }
            disabled={simulatedFixedTerm}
          />
          {/* <TextField
            label="Monto"
            value={amount}
            fullWidth
            disabled={simulatedFixedTerm}
            error={Boolean(amountError)}
            helperText={amountError}
            onChange={(e) => setAmount(e.target.value)}
            required
            onKeyDown={handleInputRestriction("0-9")}
          /> */}
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Typography variant="h7">¿A cuantos dias?</Typography>
        </Grid>
        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            onClick={() => handleDayClick("30")}
            disabled={simulatedFixedTerm}
            variant={selectedDays["30"] ? "contained" : "outlined"}
            sx={{
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
                color: "#ffffff",
              },
            }}
          >
            30 dias
          </Button>
        </Grid>

        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            disabled={simulatedFixedTerm}
            onClick={() => handleDayClick("60")}
            variant={selectedDays["60"] ? "contained" : "outlined"}
            sx={{
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
                color: "#ffffff",
              },
            }}
          >
            60 dias
          </Button>
        </Grid>

        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            disabled={simulatedFixedTerm}
            onClick={() => handleDayClick("90")}
            variant={selectedDays["90"] ? "contained" : "outlined"}
            sx={{
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
                color: "#ffffff",
              },
            }}
          >
            90 dias
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            fullWidth
            disabled={simulatedFixedTerm}
            onClick={() => handleDayClick("Otro")}
            variant={selectedDays["Otro"] ? "contained" : "outlined"}
            sx={{
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
                color: "#ffffff",
              },
            }}
          >
            Otro
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 1 }}>
          {showDatePicker && (
            <DatePicker
              sx={{ marginBottom: 1 }}
              required
              disabled={simulatedFixedTerm}
              label="Fecha de Cierre"
              value={closingDate}
              onChange={(e) => setClosingDate(e)}
              minDate={minDate}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                },
              }}
            />
          )}
          {!showDatePicker && closingDate && (
            <DatePicker
              sx={{ marginBottom: 1 }}
              disabled
              label="Fecha de Cierre"
              value={closingDate}
              onChange={(e) => setClosingDate(e)}
              minDate={minDate}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                },
              }}
            />
          )}
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
