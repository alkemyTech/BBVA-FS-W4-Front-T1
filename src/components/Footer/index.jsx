import { Grid, Box, Typography } from "@mui/material";
import "./index.css";
import React from "react";
import { Copyright } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Footer = () => {
  const token = useSelector((state) => state.user.token);

  return (
    <>
      {token && (
        <Grid
          container
          spacing={2}
          alignItems="center"
          className="footer-container"
        >
          <Grid item xs={8}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography variant="subtitle1">Redes sociales</Typography>
              <Typography variant="subtitle1">Contacto</Typography>
              <Typography variant="subtitle1">Mi cuenta</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="flex-end">
              <img
                src="https://i.ibb.co/nwf2QBf/patita-blanca.png"
                alt="Logo"
                style={{ height: "75px" }}
              />
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
      )} {!token && (
        <Grid
          container
          alignItems="center"
          className="footer-container"
          sx={{ backgroundColor: "#F1F6F5", color: "#472183" }}
        >
          <Grid item xs={12} >
            <Typography variant="body2" align="center">
              <Copyright sx={{ fontSize: 20 }} />
              Copyright © 2024 - Magic Dogs Alkywall
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Footer;


