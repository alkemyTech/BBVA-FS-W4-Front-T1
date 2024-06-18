import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  ListItemText,
  useMediaQuery,
  Pagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getTransactionsByIdAccount } from "../../api/Transaction";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransactionListDetails = ({ accountId }) => {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const transactionsPerPage = 10;
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [type, setType] = useState("");
  const [concept, setConcept] = useState("");
  const [expanded, setExpanded] = useState({});

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const formatDate = (dateArray) => {
    const [year, month, day, hour, minutes] = dateArray;
    return `${day}/${month}/${year} ${hour}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const fetchData = async (page) => {
      setLoading(true);
      try {
        const data = await getTransactionsByIdAccount(accountId, token, page);
        console.log("DATA", data);
        setTransactions(data.transactios);
        setTotalPages(Math.ceil(data.total / transactionsPerPage)); // Suponiendo que `total` es el número total de transacciones
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData(currentPage);
  }, [accountId, token, navigate, currentPage]);

  const handleChangePage = (event, page) => {
    setCurrentPage(page - 1);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [minAmount, maxAmount, type, concept]);

  const sortedTransactions = transactions.sort((a, b) => {
    const dateA = new Date(
      a.transactionDate[0],
      a.transactionDate[1] - 1,
      a.transactionDate[2],
      a.transactionDate[3],
      a.transactionDate[4]
    );
    const dateB = new Date(
      b.transactionDate[0],
      b.transactionDate[1] - 1,
      b.transactionDate[2],
      b.transactionDate[3],
      b.transactionDate[4]
    );
    return dateB - dateA;
  });

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    const amountValid =
      (!minAmount || transaction.amount >= parseFloat(minAmount)) &&
      (!maxAmount || transaction.amount <= parseFloat(maxAmount));
    const typeValid = !type || transaction.type === type;
    const conceptValid = !concept || transaction.concept === concept;
    return amountValid && typeValid && conceptValid;
  });

  const toggleExpand = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };
 

  return (
    <>
      {loading ? (
        <CircularProgress />
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
                  gap: "8px",
                  marginBottom: "16px",
                  marginTop: "16px",
                }}
              >
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "#4B56D2", alignContent: "center" }}
                >
                  Filtrar por:
                </Typography>
                <TextField
                  label="Monto mínimo"
                  variant="outlined"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  sx={{ borderStyle: "#4B56D2" }}
                />
                <TextField
                  label="Monto máximo"
                  variant="outlined"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                />
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
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
                  </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                  <InputLabel>Concepto</InputLabel>
                  <Select
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
                  </Select>
                </FormControl>
              </Box>
              <List>
                {filteredTransactions.map((transaction, index) => {
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
                                    Destino: {transaction.destinationIdAccount}
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
                      {index < filteredTransactions.length - 1 && <Divider />}
                    </Box>
                  );
                })}
              </List>
            </CardContent>
            <Box justifyContent={"center"} display={"flex"}>
              <Pagination
                count={totalPages}
                page={currentPage + 1} // Sumamos 1 para que el componente Pagination muestre el número correcto
                onChange={handleChangePage}
              />
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
};

TransactionListDetails.propTypes = {
  accountId: PropTypes.number.isRequired,
};

export default TransactionListDetails;
