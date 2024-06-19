import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import ArrowBackComponent from "../../UI/ArrowBack";

const Transferencia = () => {
  const location = useLocation();
  const { account } = location.state || {};
  console.log("Transferencia account", account);

  return (
    <Grid container >
      <Grid container className="container">
        <ArrowBackComponent />
        <Typography> Transferencia</Typography>
      </Grid>
    </Grid>
  );
};

export default Transferencia;
