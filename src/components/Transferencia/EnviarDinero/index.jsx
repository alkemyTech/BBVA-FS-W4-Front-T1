import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import MySnackbar from "../../../UI/MySnackBar";
import { useNavigate } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../../UI/ArrowBack";
import "../index.css";
import { getAccountBalance } from "../../../api/Account";
import { sendArs } from "../../../api/Transaction";

const EnviarDinero = () => {
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

  const [amount, setAmount] = useState("");
  const [accountOrigin, setAccountOrigin] = useState("");
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );

  const [accountOriginArs, setAccountOriginArs] = useState([]);
  const [accountOriginUsd, setAccountOriginUsd] = useState([]);
  const [accountDestination, setAccountDestination] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccountBalance();
        setAccountOriginArs(data.accountArs);
        setAccountOriginUsd(data.accountUsd);
        if (data.accountArs.length > 0) {
          setAccountOrigin(data.accountArs[0].idAccount);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDestination) {
      setAccountDestination(selectedDestination.idAccount);
    }
  }, [selectedDestination]);

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
      const transferData = {
        destinationIdAccount: accountDestination,
        amount: amountNumber,
        originIdAccount: accountOrigin,
        concept: concept,
        description: description,
      };

      try {
        setIsLoading(true);
        await sendArs(transferData);
        dispatch(
          showNotification({
            message: "Transferencia realizada con éxito",
            status: "success",
          })
        );
        navigate("/home");
      } catch (error) {
        dispatch(
          showNotification({
            message: error.message ? error.message : "Error del servidor",
            status: "error",
          })
        );
      } finally {
        setIsLoading(false);
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
    <Grid container>
      <Grid container className="container">
        <ArrowBackComponent />
        <Grid container direction="column" justifyContent="center">
          <Grid item alignSelf="center">
            <Typography variant="h4" component="h1">
              Enviar Dinero
            </Typography>
          </Grid>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress sx={{ color: "#472183" }} />
            </div>
          ) : (
            <Grid item>
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
                required
                disabled={isLoading}
              />
              <TextField
                select
                label="Concepto"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                fullWidth
                margin="normal"
                required
                disabled={isLoading}
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
                disabled={isLoading}
              />
              <TextField
                select
                label="Cuenta"
                value={accountOrigin}
                onChange={(e) => setAccountOrigin(e.target.value)}
                fullWidth
                margin="normal"
                required
                disabled={isLoading}
              >
                {accountOriginArs.map((option) => (
                  <MenuItem key={option.idAccount} value={option.idAccount}>
                    {option.accountType === "CAJA_AHORRO"
                      ? "Caja de Ahorro"
                      : "Cuenta Corriente"}{" "}
                    {option.currency}
                    {" - Balance: "}
                    {option.balance.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                  </MenuItem>
                ))}
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
                disabled={
                  isLoading || parseFloat(amount.replace(",", ".")) <= 0
                }
                onClick={handleSubmit}
              >
                {isLoading ? "Cargando..." : "Transferir"}
              </Button>
            </Grid>
          )}
          <MySnackbar
            open={notification.open}
            handleClose={handleSnackbarClose}
            message={notification.message}
            status={notification.status}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EnviarDinero;
