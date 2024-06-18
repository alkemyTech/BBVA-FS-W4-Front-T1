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
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const AccountDetailsCard = ({ account }) => {
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };
  const navigate2 = useNavigate();

  const handleCardClick = (path, account) => {
    console.log("Transferir", account);
    navigate2(path, { state: { account } });
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          backgroundColor: "#f1f6f5",
          color: "#000000",
          borderRadius: "2vh",
          padding: "1vh",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          display:"centre"
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={12}sm={10}>
          <Typography
            variant="subtitle"
            component="div"
            sx={{ marginBottom: "8px", color: "#472183" }}
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
            sx={{ marginBottom: "0vh", color: "#4b56d2" }}
          >
            Balance disponible (a partir de hoy)
          </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            sx={{
              marginBottom: "2vh",
              color: "#ffffff",
              backgroundColor: "#4b56d2",
              border: "1px solid #4b56d2",
              padding: "1vh",
              maxWidth: "14vh",
              "&:hover": {
                backgroundColor: "#3c4370", // Color oscuro al pasar el mouse
                borderColor: "#3c4370", // Borde oscuro al pasar el mouse
              },
            }}
            onClick={() => handleCardClick("/transferencia", account)}
          >
            <b>Transferir</b>
          </Button>
          </Grid>

          <Grid item xs={12}>
          <Accordion
            sx={{
              boxShadow: "none",
              borderTop: "none",
              backgroundColor: "transparent",
              "&:before": { display: "none" },
            }}
            disableGutters
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ padding: 0 }} // Agrega esta línea para eliminar el padding
            >
              <Typography sx={{ color: "#609AF6" }}>
                Ver detalles de la cuenta
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              <Box>
                <Typography variant="subtitle1" component="div" color="#609AF6">
                  Alias:
                </Typography>
                <Typography variant="body1" component="div" color="#000000">
                  {account.alias}
                </Typography>
                <Typography variant="subtitle1" component="div" color="#609AF6">
                  CBU:
                </Typography>
                <Typography variant="body1" component="div" color="#000000">
                  {account.cbu}
                </Typography>
                <Typography variant="subtitle1" component="div" color="#609AF6">
                  Límite de Transacción:
                </Typography>
                <Typography variant="body1" component="div" color="#000000">
                  {formatCurrency(account.transactionLimit, account.currency)}
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          </Grid>
          </Grid>
        </CardContent>
      </Card>
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
