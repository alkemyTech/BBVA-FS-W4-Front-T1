import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

const AccountDetailsCard = ({ account }) => {
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return (
    <Grid container justifyContent="center" sx={{ marginTop: "2vh" }}>
      <Grid item xs={12}>
        <Card
          sx={{
            backgroundColor: "#f1f6f5",
            color: "#000000",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "16px", color: "#472183" }}
            >
              {account.accountType === "CAJA_AHORRO"
                ? "Caja de Ahorro"
                : "Cuenta Corriente"}
            </Typography>
            <Typography variant="h4" component="div" color="#000000">
              {formatCurrency(account.balance, account.currency)}
              {account.currency}
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ marginBottom: "16px", color: "#4b56d2" }}
            >
              Balance disponible (a partir de hoy)
            </Typography>
            <Accordion
              sx={{ boxShadow: "none", backgroundColor: "transparent" }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ padding: 0 }} // Agrega esta línea para eliminar el padding
              >
                <Typography sx={{ color: "#82c3ec" }}>
                  Ver detalles de la cuenta
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0 }}>
                {" "}
                {/* Agrega esta línea para eliminar el padding */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="#4b56d2"
                  >
                    Alias:
                  </Typography>
                  <Typography variant="body1" component="div" color="#000000">
                    {account.alias}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="#4b56d2"
                  >
                    CBU:
                  </Typography>
                  <Typography variant="body1" component="div" color="#000000">
                    {account.cbu}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    color="#4b56d2"
                  >
                    Límite de Transacción:
                  </Typography>
                  <Typography variant="body1" component="div" color="#000000">
                    {formatCurrency(account.transactionLimit, account.currency)}                    
                  </Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{marginTop:"2vh"}}>
        <Card
          sx={{
            backgroundColor: "#f1f6f5",
            color: "#000000",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ marginBottom: "5px", color: "#472183" }}
            >
              Transacciones
            </Typography>
            <Divider
              sx={{ backgroundColor: "#472183", marginBottom: "16px" }}
            />
            <Typography variant="body2" component="div" color="#4b56d2">
              No hay transacciones disponibles.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

AccountDetailsCard.propTypes = {
  account: PropTypes.shape({
    accountType: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    cbu: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    transactionLimit: PropTypes.number.isRequired,
  }).isRequired,
};

export default AccountDetailsCard;
