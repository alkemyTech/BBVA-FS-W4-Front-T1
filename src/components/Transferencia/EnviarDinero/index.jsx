import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  CircularProgress,
  Divider,
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
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={5}
            ml={4}
            position="relative"
          >
            <Grid item position="absolute">
              <ArrowBackComponent />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              margin: "0 auto",
              backgroundColor: "#fff",
              width: 480,
              minHeight: "583px",
              borderRadius: 5,
              rowGap: 3,
              boxShadow: 3,
              p: 5,
            }}
          >
            <Grid item xs alignSelf="flex-start">
              <Typography variant="h4" component="h1">
                Enviar dinero
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
              <Grid
                container
                sx={{
                  rowGap: 3,
                }}
              >
                <TextField
                  label="Destinatario"
                  type="text"
                  value={
                    selectedDestination.userFirstName +
                    " " +
                    selectedDestination.userLastName +
                    " / " +
                    selectedDestination.bank +
                    " - " +
                    selectedDestination.currency
                  }
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  readOnly
                  disabled={isLoading}
                />
                <TextField
                  label="Monto"
                  value={amount}
                  onChange={onChangeAmount}
                  fullWidth
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
                  disabled={isLoading}
                />
                <TextField
                  select
                  label="Cuenta"
                  value={accountOrigin}
                  onChange={(e) => setAccountOrigin(e.target.value)}
                  fullWidth
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
                <Grid item>
                  <Button
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      color: "black",
                      backgroundColor: "#D1D8C5",
                      "&:hover": { backgroundColor: "#c0c9b5" },
                      marginRight: "2.5vw",
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button variant="contained" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Confirmar"}
                  </Button>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={
                    isLoading || parseFloat(amount.replace(",", ".")) <= 0
                  }
                  onClick={handleSubmit}
                >
                  {isLoading ? "Cargando..." : "Transferir"}
                </Button>
              </Grid>
            )}
          </Grid>

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
