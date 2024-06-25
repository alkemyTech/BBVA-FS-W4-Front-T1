import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  Pagination,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FixedTermsList = ({
  fixedTerms,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

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

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return (
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
            variant="h5"
            component="div"
            sx={{ color: "#472183", marginBottom: "16px" }}
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
                      {isDateInTheFuture(fixedTerm.closingDate)
                        ? "Total a recibir: "
                        : "Total recibido: "}{" "}
                      {formatCurrency(fixedTerm.amountTotalToReceive, "ARS")}
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
                        variant="standard"
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
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default FixedTermsList;
