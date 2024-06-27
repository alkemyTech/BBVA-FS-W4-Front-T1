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
  LinearProgress,
} from "@mui/material";
import MySnackbar from "../../../UI/MySnackBar";
import { useNavigate } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../../UI/ArrowBack";
import { getAccountBalance } from "../../../api/Account";
import { sendArs, sendUsd } from "../../../api/Transaction";
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
  const [amountError, setAmountError] = useState("");
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingBar, setLoadingBar] = useState(false);

  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );

  const [accountOrigin, setAccountOrigin] = useState("");
  const [accountOriginError, setAccountOriginError] = useState("");
  const [accountOriginArs, setAccountOriginArs] = useState([]);
  const [accountOriginUsd, setAccountOriginUsd] = useState("");
  const [accountDestination, setAccountDestination] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

  const [progress, setProgress] = useState(0);
  let progressInterval;

  const startProgress = (duration) => {
    setProgress(0);
    const increment = 100 / (duration / 100);
    progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100));
    }, 100);
  };

  const completeProgress = () => {
    clearInterval(progressInterval);
    setProgress(100);
    setTimeout(() => setLoadingBar(false), 500); // Small delay for smooth completion
  };

  useEffect(() => {
    if (selectedDestination) {
      setAccountDestination(selectedDestination.idAccount);
    }

    const fetchData = async () => {
      try {
        const data = await getAccountBalance();

        if (!data) {
          if (selectedDestination.currency === "ARS") {
            setAccountOriginArs([]);
            setAccountOrigin("No posees cuentas en pesos");
          } else if (selectedDestination.currency === "USD") {
            setAccountOriginUsd(null);
            setAccountOrigin("No posees cuentas en dólares");
          }
        } else {
          if (selectedDestination.currency === "ARS") {
            setAccountOriginArs(data.accountArs || []);
            setAccountOrigin(
              data.accountArs
                ? data.accountArs[0].idAccount
                : "No posees cuentas en pesos"
            );
          } else if (selectedDestination.currency === "USD") {
            setAccountOriginUsd(data.accountUsd || null);
            setAccountOrigin(
              data.accountUsd
                ? data.accountUsd.idAccount
                : "No posees cuentas en dólares"
            );
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenConfirmationDialog = () => {
    setOpenConfirmationDialog(true);
    setIsLoading(true);
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountNumber = parseFloat(amount.replace(",", "."));

    if (!accountOrigin || isNaN(accountOrigin)) {
      setAccountOriginError("No posees una cuenta");
    } else if (amountNumber <= 0 || !amountNumber) {
      setAmountError("El monto debe ser mayor que cero");
    } else if (
      selectedDestination.currency === "USD" &&
      accountOriginUsd.balance <= 0
    ) {
      setAccountOriginError("No tiene saldo disponible");
    } else if (
      selectedDestination.currency === "ARS" &&
      accountOriginArs.find((acc) => acc.idAccount === accountOrigin).balance <=
        0
    ) {
      setAccountOriginError("No tiene saldo disponible");
    } else {
      setAmountError("");
      setAccountOriginError("");
      handleOpenConfirmationDialog();
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
    setIsLoading(true);
    setLoadingBar(true);
    startProgress(5500);

    try {
      if (selectedDestination.currency === "USD") {
        await sendUsd(transferData);
      } else {
        await sendArs(transferData);
      }
      dispatch(
        showNotification({
          message: "Transferencia realizada con éxito",
          status: "success",
        })
      );
      completeProgress();
      navigate("/home");
    } catch (error) {
      completeProgress();
      if (error.message != "Balance insuficiente") {
        dispatch(
          showNotification({
            message: error.message ? error.message : "Error del servidor",
            status: "error",
          })
        );
      } else {
        setAmountError(true)
        setAccountOriginError("Saldo insuficiente");
      }
    } finally {
      setIsLoading(false);
      setLoadingBar(false);
      completeProgress();
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
            ml={5}
            position="relative"
          >
            <Grid item>
              <ArrowBackComponent disabled={loadingBar} />
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
                  prefix={
                    selectedDestination.currency === "USD" ? "US$ " : "$ "
                  }
                  decimalScale={2}
                  fixedDecimalScale={true}
                  fullWidth
                  required
                  error={Boolean(amountError)}
                  helperText={amountError}
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
                  error={Boolean(accountOriginError)}
                  helperText={accountOriginError}
                  disabled={isLoading}
                >
                  {selectedDestination.currency === "USD" ? (
                    accountOriginUsd ? (
                      <MenuItem
                        key={accountOriginUsd.idAccount}
                        value={accountOriginUsd.idAccount}
                      >
                        {accountOriginUsd.accountType === "CAJA_AHORRO"
                          ? "Caja de Ahorro"
                          : "Cuenta Corriente"}{" "}
                        {accountOriginUsd.currency}
                        {" - Balance: "}
                        {accountOriginUsd.balance.toLocaleString("es-AR", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                      </MenuItem>
                    ) : (
                      <MenuItem value={"No posees cuentas en dólares"} disabled>
                        No posees cuentas en dólares
                      </MenuItem>
                    )
                  ) : accountOriginArs.length > 0 ? (
                    accountOriginArs.map((option) => (
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
                    ))
                  ) : (
                    <MenuItem value={"No posees cuentas en pesos"} disabled>
                      No posees cuentas en pesos
                    </MenuItem>
                  )}
                </TextField>

                {loadingBar ? (
                  <Grid
                    item
                    alignSelf={"center"}
                    display={"grid"}
                    alignItems={"center"}
                    mt={1}
                    sx={{ width: "75%", minHeight: "45px" }}
                  >
                    <LinearProgress variant="determinate" value={progress} />
                  </Grid>
                ) : (
                  <Grid
                    item
                    alignSelf={"center"}
                    mt={1}
                    sx={{ minHeight: "45px" }}
                  >
                    <Button
                      variant="contained"
                      disabled={isLoading}
                      sx={{
                        color: "#FFF",
                        backgroundColor: "#C62E2E",
                        "&:hover": { backgroundColor: "#BA3131" },
                        marginRight: "2rem",
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
                      Transferir
                    </Button>
                  </Grid>
                )}
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
            PaperProps={{
              sx: { p: 3, borderRadius: 5, mr: 6 },
            }}
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
                  currency:
                    selectedDestination.currency === "USD" ? "USD" : "ARS",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
              {accountOrigin &&
                (selectedDestination.currency === "USD" ? (
                  accountOriginUsd ? (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      <b>Cuenta origen:</b>{" "}
                      {accountOriginUsd.accountType === "CAJA_AHORRO"
                        ? "Caja de Ahorro"
                        : "Cuenta Corriente"}{" "}
                      {accountOriginUsd.currency} - Balance:{" "}
                      {accountOriginUsd.balance.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  ) : (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      No posees cuentas en dólares
                    </Typography>
                  )
                ) : accountOriginArs.length > 0 ? (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    <b>Cuenta origen:</b>{" "}
                    {accountOriginArs.map(
                      (option) =>
                        option.idAccount === accountOrigin && (
                          <span key={option.idAccount}>
                            {option.accountType === "CAJA_AHORRO"
                              ? "Caja de Ahorro"
                              : "Cuenta Corriente"}{" "}
                            {option.currency} - Balance:{" "}
                            {option.balance.toLocaleString("es-AR", {
                              style: "currency",
                              currency: "ARS",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        )
                    )}
                  </Typography>
                ) : (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    No posees cuentas en pesos
                  </Typography>
                ))}
            </DialogContent>
            <DialogActions sx={{ justifyContent: "center" }}>
              <Button
                onClick={handleCloseConfirmationDialog}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#C62E2E",
                  "&:hover": { backgroundColor: "#BA3131" },
                  marginRight: "2rem",
                  p: 1.2,
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleConfirmTransfer}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#8EB052",
                  "&:hover": { backgroundColor: "#94B758" },
                  p: 1.2,
                }}
              >
                Confirmar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EnviarDinero;
