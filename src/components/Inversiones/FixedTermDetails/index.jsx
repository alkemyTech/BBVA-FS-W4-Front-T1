import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";
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
    navigate("/plazo-fijo");
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
        }}
      >
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm={9}>
              <Typography
                variant="h6"
                component="div"
                sx={{ marginBottom: "8px", color: "#472183" }}
              >
                Total Invertido
              </Typography>
              <Typography variant="h4" component="div" color="#000000">
                {formatCurrency(totalFixedTerms, "ARS")}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={3} sx={{ textAlign: { xs: "left", sm: "right" } }}>
              <Button
                variant="contained"
                sx={{
                  marginBottom: "2vh",
                  color: "#ffffff",
                  backgroundColor: "#4b56d2",
                  border: "1px solid #4b56d2",
                  padding: "1vh",
                  "&:hover": {
                    backgroundColor: "#3c4370", 
                    borderColor: "#3c4370", 
                  },
                }}
                onClick={handleCreateFixedTerm}
              >
                <b>Crear Plazo Fijo</b>
              </Button>
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
