import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredTransactionsByIdAccount } from "../../api/Transaction";
import { hideNotification, showNotification } from "../../Redux/slice/snackBarSlice";
import MySnackbar from "../../UI/MySnackBar";

const TransactionListDetails = ({ accountId }) => {
  const [loading, setLoading] = useState(true);
  const [haveTransactions, setHaveTransactions] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const transactionsPerPage = 10;
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [type, setType] = useState("");
  const [concept, setConcept] = useState("");
  const [expanded, setExpanded] = useState({});
  const [sendButton, setSendButton] = useState(false);
  const [documentNumberError, setDocumentNumberError] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const token = useSelector((state) => state.user.token);

  const formatDate = (dateArray) => {
    const [year, month, day, hour, minutes] = dateArray;
    return `${day}/${month}/${year} ${hour}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const fetchFilteredData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getFilteredTransactionsByIdAccount(
        accountId,
        token,
        currentPage,
        transactionsPerPage,
        min,
        max,
        type,
        concept
      );

      if (response !== "404") {
        const data = response.data;
        setTransactions(data.transactios);
        setTotalPages(data.countPages);
        setHaveTransactions(true);
      } else {
        setTotalPages(0);
        setHaveTransactions(false);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setLoading(false);
    }
  }, [accountId, token, currentPage, transactionsPerPage, type, concept, sendButton]);

  useEffect(() => {
    fetchFilteredData();
  }, [currentPage, type, concept, sendButton]);

  const handleChangePage = (event, page) => {
    setCurrentPage(page - 1);
  };

  const handleFilterChange = (e) => {
    if (max < min) {
      dispatch(
        showNotification({
          message: "El monto máximo no puede ser menor que el monto mínimo.",
          status: "error",
        })
      );
    } else {
      setCurrentPage(0);
      setSendButton(!sendButton);
    }
  };

  const toggleExpand = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  const handleInputRestriction =
    (allowedCharacters = "") =>
    (e) => {
      const isAllowedCharacter = new RegExp(`[^${allowedCharacters}]`).test(e.key);
      const isBackspace = e.key === "Backspace";
      const isTab = e.key === "Tab";

      if (isAllowedCharacter && !isBackspace && !isTab) {
        e.preventDefault();
      }
    };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Container
      disableGutters={true}
      sx={{ position: "relative", minHeight: "70vh" }}
    >
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
        <Box sx={{ marginTop: "2vh" }}>
          <Card
            sx={{
              backgroundColor: "#f5f5f5",
              padding: "16px",
              borderRadius: "8px",
              marginTop: "16px",
              marginBottom: "10vh",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "#4B56D2" }}
              >
                Últimos movimientos
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "16px",
                  marginTop: "24px",
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "#4B56D2", alignContent: "center" }}
                >
                  Filtrar por:
                </Typography>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <TextField
                    select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    label="Tipo"
                  >
                    <MenuItem value="">
                      <em>-----</em>
                    </MenuItem>
                    <MenuItem value="DEPOSIT">DEPOSITO</MenuItem>
                    <MenuItem value="INCOME">INGRESO</MenuItem>
                    <MenuItem value="PAYMENT">PAGO</MenuItem>
                  </TextField>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <TextField
                    select
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    label="Concepto"
                  >
                    <MenuItem value="">
                      <em>-----</em>
                    </MenuItem>
                    <MenuItem value="VARIOS">VARIOS</MenuItem>
                    <MenuItem value="ALQUILERES">ALQUILERES</MenuItem>
                    <MenuItem value="CUOTAS">CUOTAS</MenuItem>
                    <MenuItem value="EXPENSAS">EXPENSAS</MenuItem>
                    <MenuItem value="HONORARIOS">HONORARIOS</MenuItem>
                    <MenuItem value="FACTURAS">FACTURAS</MenuItem>
                    <MenuItem value="HABERES">HABERES</MenuItem>
                    <MenuItem value="PRESTAMOS">PRESTAMOS</MenuItem>
                    <MenuItem value="SEGUROS">SEGUROS</MenuItem>
                  </TextField>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <TextField
                    label="Monto Minimo"
                    name="min"
                    value={min}
                    autoComplete="min"
                    onChange={(e) => setMin(e.target.value)}
                    error={Boolean(documentNumberError)}
                    helperText={documentNumberError}
                    onKeyDown={handleInputRestriction("0-9")}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <TextField
                    label="Monto Máximo"
                    name="max"
                    value={max}
                    autoComplete="max"
                    onChange={(e) => setMax(e.target.value)}
                    error={Boolean(documentNumberError)}
                    helperText={documentNumberError}
                    onKeyDown={handleInputRestriction("0-9")}
                  />
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <Button
                    variant="contained"
                    sx={{ height: "56px" }}
                    onClick={handleFilterChange}
                  >
                    Filtrar
                  </Button>
                </FormControl>
              </Box>
              {haveTransactions ? (
                <List>
                  {transactions.map((transaction, index) => {
                    const formattedDate = formatDate(transaction.transactionDate);
                    return (
                      <Box key={index}>
                        <ListItem>
                          <ListItemText
                            primary={
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography style={{ fontWeight: "bold" }}>
                                  {transaction.type === "INCOME"
                                    ? "Ingreso"
                                    : transaction.type === "PAYMENT"
                                    ? "Pago"
                                    : "Depósito"}
                                </Typography>
                                <Typography>{transaction.amount}</Typography>
                              </Box>
                            }
                            secondary={
                              <Box component="span">
                                <Box
                                  component="span"
                                  sx={{
                                    color: "gray",
                                    fontSize: "0.875rem",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography component="span">
                                    Fecha: {formattedDate}
                                  </Typography>
                                  <IconButton
                                    onClick={() => toggleExpand(index)}
                                    aria-expanded={expanded[index]}
                                    aria-label="show more"
                                  >
                                    <ExpandMoreIcon />
                                  </IconButton>
                                </Box>
                                <Collapse
                                  in={expanded[index]}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  {transaction.destinationIdAccount && (
                                    <Typography component="div">
                                      Destino:{" "}
                                      {transaction.destinationIdAccount}
                                    </Typography>
                                  )}
                                  {transaction.concept && (
                                    <Typography component="div">
                                      Concepto: {transaction.concept}
                                    </Typography>
                                  )}
                                  {transaction.description &&
                                    transaction.description.trim() && (
                                      <Typography component="div">
                                        Descripción: {transaction.description}
                                      </Typography>
                                    )}
                                </Collapse>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < transactions.length - 1 && <Divider />}
                      </Box>
                    );
                  })}
                </List>
              ) : (
                <Typography sx={{ marginTop: "16px" }}>
                  No se encontraron transacciones.
                </Typography>
              )}
              <Pagination
                count={totalPages}
                page={currentPage + 1}
                onChange={handleChangePage}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "16px",
                }}
              />
            </CardContent>
          </Card>
        </Box>
      )}
      <MySnackbar
        open={notification.open}
        handleClose={handleSnackbarClose}
        message={notification.message}
        status={notification.status}
      />
    </Container>
  );
};

TransactionListDetails.propTypes = {
  accountId: PropTypes.string.isRequired,
};

export default TransactionListDetails;
