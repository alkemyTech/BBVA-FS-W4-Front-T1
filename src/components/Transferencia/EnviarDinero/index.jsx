import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Skeleton,
} from "@mui/material";
import MySnackbar from "../../../UI/MySnackBar";
import { useNavigate } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../../UI/ArrowBack";
import { getAccountBalance } from "../../../api/Account";
import { sendArs } from "../../../api/Transaction";
import { NumericFormat } from "react-number-format";

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

  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );

  const [accountOrigin, setAccountOrigin] = useState("");
  const [accountOriginArs, setAccountOriginArs] = useState([]);
  const [accountOriginUsd, setAccountOriginUsd] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accountDestination, setAccountDestination] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

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

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNumber = parseFloat(amount.replace(",", "."));

    if (amountNumber > 0) {
      handleOpenConfirmationDialog();
    } else {
      dispatch(
        showNotification({
          message: "El monto debe ser mayor que cero",
          status: "error",
        })
      );
    }
  };

  const handleConfirmTransfer = async () => {
    handleCloseConfirmationDialog();
    const amountNumber = parseFloat(amount.replace(",", "."));
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
  };

  const handleCancelation = async (e) => {
    e.preventDefault();
    navigate("/transferencia");
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
            mt={2}
            ml={5}
            position="relative"
          >
            <Grid item>
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
              <>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ borderRadius: "4px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ borderRadius: "4px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ borderRadius: "4px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ borderRadius: "4px" }}
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={56}
                  sx={{ borderRadius: "4px" }}
                />
                <Grid container spacing={1} justifyContent="center">
                  <Grid item xs={4} sx={{ marginRight: "2.5vw" }}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={36}
                      sx={{ borderRadius: "4px" }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={36}
                      sx={{ borderRadius: "4px" }}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid
                container
                direction={"column"}
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
                  fullWidth
                  required
                  readOnly
                  disabled={isLoading}
                />
                <NumericFormat
                  label="Monto"
                  value={amount}
                  onValueChange={({ floatValue }) =>
                    setAmount(
                      floatValue !== undefined ? floatValue.toFixed(2) : ""
                    )
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
                      {option.charAt(0) + option.slice(1).toLowerCase()}
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
                  label="Cuenta origen"
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
                <Grid item alignSelf={"center"} mt={1}>
                  <Button
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      color: "#FFF",
                      backgroundColor: "#696969",
                      "&:hover": { backgroundColor: "#585858" },
                      marginRight: "2.5vw",
                    }}
                    onClick={handleCancelation}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={
                      isLoading || parseFloat(amount.replace(",", ".")) <= 0
                    }
                    onClick={handleSubmit}
                  >
                    {isLoading ? "Cargando..." : "Transferir"}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Grid>

          <MySnackbar
            open={notification.open}
            handleClose={handleSnackbarClose}
            message={notification.message}
            status={notification.status}
          />
          <Dialog
            open={openConfirmationDialog}
            onClose={handleCloseConfirmationDialog}
            TransitionComponent={Slide}
            sx={{ alignContent: "center" }}
          >
            <DialogTitle>Confirmar Transferencia</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1">
                ¿Está seguro de que desea transferir el siguiente monto?
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <b>Destinatario:</b>{" "}
                {`${selectedDestination.userFirstName} ${selectedDestination.userLastName} / ${selectedDestination.bank} - ${selectedDestination.currency}`}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                <b>Monto:</b>{" "}
                {parseFloat(amount.replace(",", ".")).toLocaleString("es-AR", {
                  style: "currency",
                  currency: "ARS",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseConfirmationDialog}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#696969",
                  "&:hover": { backgroundColor: "#585858" },
                  p: 1.2,
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmTransfer}
                sx={{
                  color: "#FFF",
                  p: 1.2,
                }}
              >
                Confirmar Transferencia
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EnviarDinero;
