import { Grid, Box, Typography } from "@mui/material";
import "./index.css"
import React from "react";

const Footer = () => {
  return (
    <Grid container spacing={2} alignItems="center" className="footer-container">
      <Grid item xs={8}>
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <Typography variant="subtitle1">Redes sociales</Typography>
          <Typography variant="subtitle1">Contacto</Typography>
          <Typography variant="subtitle1">Mi cuenta</Typography>
        </Box>
      </Grid>      
      <Grid item xs={4}>
        <Box display="flex" justifyContent="flex-end">
          <img src="/path/to/logo.png" alt="Logo" style={{ height: "50px" }} />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <Typography variant="body2" align="center">
            Copyright © 2024 - Magic Dogs Alkywall
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Footer;