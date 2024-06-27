import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router";

const FixedTermCard = ({ totalFixedTerms }) => {
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const navigate = useNavigate();

  const handleCreateFixedTerm = () => {
    navigate("/crear-plazo-fijo");
  };

  const handleSimulateFixedTerm = () => {
    navigate("/simular-plazo-fijo");
  };


  return (
    <Grid item xs={12}>
      <Card
        sx={{
          backgroundColor: "#f5f5f5",
          color: "#000000",
          borderRadius: "2vh",
          padding: "1vh",
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={6} sm={6}>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "8px", color: "#472183" }}
              >
                Total Invertido en Plazos fijos
              </Typography>
              <Typography variant="h4" component="div" color="#000000">
                {formatCurrency(totalFixedTerms, "ARS")}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ textAlign: "right" }}>
              <Grid container justifyContent="flex-end" columnSpacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      marginBottom: "2vh",
                      color: "#fff",
                      padding: "1vh",
                    }}
                    onClick={handleCreateFixedTerm}
                  >
                    <b>Crear Plazo Fijo</b>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    sx={{
                      marginBottom: "2vh",
                      color: "#fff",
                      padding: "1vh",
                    }}
                    onClick={handleSimulateFixedTerm}
                  >
                    <b>Simular Plazo Fijo</b>
                  </Button>
                </Grid>
              </Grid>
              </Grid>

          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

FixedTermCard.propTypes = {
  totalFixedTerms: PropTypes.number.isRequired,
};

export default FixedTermCard;
