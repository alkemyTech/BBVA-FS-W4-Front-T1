import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
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
import { getAccountBalance } from "../../api/Account";
import { payment } from "../../api/Transaction";
import { NumericFormat } from "react-number-format";

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

const Pago = () => {
  const [amount, setAmount] = useState("");
  const [concept, setConcept] = useState(transactionConcepts[0]);
  const [description, setDescription] = useState("");
  const [accountType, setAccountType] = useState("CAJA_AHORRO");
  const [currency, setCurrency] = useState("ARS");
  const [isLoading, setIsLoading] = useState(false);
  const [balances, setBalances] = useState({
    USD: { CAJA_AHORRO: 0 },
    ARS: { CAJA_AHORRO: 0, CUENTA_CORRIENTE: 0 },
  });
  const [balance, setBalance] = useState(0);
  const [isFetchingBalance, setIsFetchingBalance] = useState(true);
  const [loadingDots, setLoadingDots] = useState(".");
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
  }, [currency, accountType, balances]);

  useEffect(() => {
    setBalance(balances[currency][accountType] || 0);
  }, [currency, accountType, balances]);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      setIsFetchingBalance(true);
      try {
        const accountData = await getAccountBalance();
        const newBalances = {
          USD: {
            CAJA_AHORRO: accountData.accountUsd
              ? accountData.accountUsd.balance
              : 0,
          },
          ARS: {
            CAJA_AHORRO:
              accountData.accountArs.find(
                (acc) => acc.accountType === "CAJA_AHORRO"
              )?.balance || 0,
            CUENTA_CORRIENTE:
              accountData.accountArs.find(
                (acc) => acc.accountType === "CUENTA_CORRIENTE"
              )?.balance || 0,
          },
        };
        setBalances(newBalances);
        setBalance(newBalances[currency][accountType]);
      } catch (error) {
        console.error("Error fetching account balances: ", error);
        dispatch(
          showNotification({
            message: "Error al obtener saldos de las cuentas",
            status: "error",
          })
        );
      } finally {
        setIsFetchingBalance(false);
      }
    };

    fetchAccountBalance();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prevDots) =>
        prevDots.length < 3 ? prevDots + "." : "."
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

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
    if (amountNumber <= balance && amountNumber > 0) {
      const paymentData = {
        amount: amountNumber * 0.9,
        concept,
        description,
        accountType,
        currency,
        date: new Date().toISOString(),
      };

      try {
        setIsLoading(true);
        setIsSubmitted(true);
        await payment(paymentData);
        dispatch(
          showNotification({
            message: "Pago realizado con éxito",
            status: "success",
          })
        );
        navigate("/inicio");
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Error del servidor";
        let status = "error";
        dispatch(
          showNotification({
            message: errorMessage,
            status,
          })
        );
      } finally {
        setIsLoading(false);
        setIsSubmitted(false);
      }
    } else {
      dispatch(
        showNotification({
          message: "Saldo insuficiente o monto inválido",
          status: "error",
        })
      );
    }
  };

  const calculateDiscountedAmount = () => {
    if (amount !== '') {
      const originalAmount = parseFloat(amount.replace(',', '.'));
      const discountedAmount = originalAmount * 0.9; // Aplica un descuento del 10%
      return discountedAmount.toFixed(2);
    }
    return '';
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
        position="relative"
      >
        <Grid item ml={5}>
          <ArrowBackComponent disabled={isSubmitted} />
        </Grid>
      </Grid>
          <Box>
            <Card
              sx={{
                margin: "0 auto",
                bgcolor: "#fff",
                width: 480,
                p: 5,
                borderRadius: 5,
                boxShadow: 3,
                "@media (max-width: 500px)": { maxWidth: "90%" },
              }}
            >
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom>
                  Cargar Pago
                </Typography>
                <Typography variant="body1" component="p" mb={2} sx={{color:"#9678cd"}}>
                  ¡10% de descuento hasta el Domingo 14 de Julio!
                </Typography>
                <form onSubmit={handleSubmit}>
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
                    error={
                      parseFloat(amount.replace(",", ".")) <= 0 ||
                      parseFloat(amount.replace(",", ".")) > balance
                    }
                    helperText={
                      parseFloat(amount.replace(",", ".")) <= 0
                        ? "El monto debe ser mayor a cero"
                        : parseFloat(amount.replace(",", ".")) > balance
                        ? "Saldo insuficiente"
                        : ""
                    }
                    disabled={isSubmitted}
                    InputProps={
                      amount > 0
                        ? {
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography variant="body1" color="textSecondary">
                                  Descuento 10%: ${calculateDiscountedAmount()}
                                </Typography>
                              </InputAdornment>
                            ),
                          }
                        : {}
                    }
                  />
                      <Typography
                        variant="body2"
                        component="div"
                        color="textSecondary"
                        sx={{ textAlign: "right" }}
                      >
                        Saldo actual:{" "}
                        {isFetchingBalance ? (
                          loadingDots
                        ) : (
                          <>
                            {currency === "ARS" && (
                              <>
                                $
                                {balance.toLocaleString("es-AR", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </>
                            )}
                            {currency === "USD" &&
                         
                          accountType === "CAJA_AHORRO" && (
                                  <>
                                    US$
                                    {balance.toLocaleString("es-AR", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </>
                                )}
                          </>
                        )}
                        <br />
                        Saldo restante:{" "}
                        {isFetchingBalance ? (
                          loadingDots
                        ) : (
                          <>
                            {currency === "ARS" && (
                              <>
                                $
                                {typeof balance === "number" &&
                                parseFloat(amount.replace(",", "."))
                                  ? (
                                      balance - (parseFloat(amount.replace(",", ".")) * 0.9)
                                    ).toLocaleString("es-AR", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })
                                  : balance.toLocaleString("es-AR", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                              </>
                            )}
                            {currency === "USD" &&
                         
                          accountType === "CAJA_AHORRO" && (
                                  <>
                                    US$
                                    {typeof balance === "number" &&
                                    parseFloat(amount.replace(",", "."))
                                      ? (
                                          balance -
                                   
                                    parseFloat(amount.replace(",", "."))
                                        ).toLocaleString("es-AR", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })
                                      : balance.toLocaleString("es-AR", {
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2,
                                        })}
                                  </>
                                )}
                          </>
                        )}
                      </Typography>

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
                    label="Tipo de cuenta"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
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
                    {accountTypes[currency].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option === "CAJA_AHORRO"
                          ? "Caja de Ahorro"
                          : "Cuenta Corriente"}
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
                          borderColor: "#4B56D2",
                        },
                      },
                    }}
                    required
                    disabled={isSubmitted}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="ARS">ARS</MenuItem>
                  </TextField>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      //   backgroundColor: "#d1d8c5",
                      //   "&:hover": { backgroundColor: "#c0c9b5" },
                      //   color: "#000000",
                    }}
                    disabled={
                      isLoading ||
                      parseFloat(amount.replace(",", ".")) > balance ||
                      parseFloat(amount.replace(",", ".")) <= 0 ||
                      isSubmitted
                    }
                  >
                    {isLoading ? "Pagando..." : "Pagar"}
                  </Button>
                </form>
                <MySnackbar
                  open={notification.open}
                  handleClose={handleSnackbarClose}
                  message={notification.message}
                  status={notification.status}
                />
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Pago;
