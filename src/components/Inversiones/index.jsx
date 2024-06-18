import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Container,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Chip,
  IconButton,
  Grid,
  Divider,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { getFixedTerms } from "../../api/FixedTerm";

const Inversiones = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Página inicial
  const [fixedTerms, setFixedTerms] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [totalPages, setTotalPages] = useState(0);

  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  const formatDate = (dateArray) => {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    return `${day}/${month}/${year}`;
  };

  const isDateInTheFuture = (dateArray) => {
    const today = new Date();
    const closingDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    return closingDate > today;
  };

  const toggleExpand = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const data = await getFixedTerms(page);
      setFixedTerms(data.fixedTerms);
      setTotalPages(data.countPages); // Establecemos el total de páginas desde el backend
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchData(currentPage);
  }, [token, navigate, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  return (
    <Container>
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
                sx={{ color: "#4B56D2", marginBottom: "16px" }}
              >
                Plazos fijos
              </Typography>
              {fixedTerms.map((fixedTerm, index) => (
                <Accordion
                  sx={{
                    boxShadow: "none",
                    borderTop: "none",
                    backgroundColor: "transparent",
                  }}
                  key={index}
                  expanded={expanded[index]}
                  onChange={() => toggleExpand(index)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={6}>
                        <Typography>
                          Monto: {formatCurrency(fixedTerm.amount, "ARS")}
                        </Typography>
                        <Typography>
                          Total a recibir:{" "}
                          {formatCurrency(
                            fixedTerm.amountTotalToReceive,
                            "ARS"
                          )}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            width: "100%", 
                          }}
                        >
                          <Chip
                            sx={{ marginRight: "8px" }}
                            label={`Fecha de vencimiento: ${formatDate(
                              fixedTerm.closingDate
                            )}`}
                            color={
                              isDateInTheFuture(fixedTerm.closingDate)
                                ? "success"
                                : "error"
                            }
                            variant="outlined"
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ width: "100%" }}>
                      <Typography variant="body2" color="textSecondary">
                        Fecha de creación: {formatDate(fixedTerm.creationDate)}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Interés: {fixedTerm.interest}%
                      </Typography>
                      {isDateInTheFuture(fixedTerm.closingDate) && (
                        <Typography variant="body2" color="textSecondary">
                          Interés ganado hoy:{" "}
                          {formatCurrency(fixedTerm.interestTodayWin, "ARS")}
                        </Typography>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        Interés total:{" "}
                        {formatCurrency(fixedTerm.interestTotal, "ARS")}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
              {totalPages > 0 && (
                <Box
                  sx={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={currentPage + 1}
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
};

export default Inversiones;
