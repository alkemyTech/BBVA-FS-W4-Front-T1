import { ThemeProvider } from "@emotion/react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from "../Login";
import { Copyright } from "@mui/icons-material";

const Inicio = () => {

  return (
    <div>
        <Grid container component="main" >
          <Grid
            item
            xs={false}
            sm={false}
            md={7}
            sx={{
              backgroundImage: "url(https://i.ibb.co/RTq0Fv9/PERRO-ANIMADO-SIN-FONDO.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid item xs={12} sm={8} md={5} /*component={Paper}*/ elevation={6}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Login />
             {/* <Copyright sx={{ mt: 5 }} />*/}
            </Box>
          </Grid>
        </Grid>
    </div>
  );
};

export default Inicio;
