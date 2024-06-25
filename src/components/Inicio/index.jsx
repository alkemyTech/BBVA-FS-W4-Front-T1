import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
} from "@mui/material";
import Login from "../Login";
import { useSelector } from "react-redux";

const Inicio = () => {
  const navigate = useNavigate();  
  const token = useSelector((state) => state.user.token);
  console.log("Token:", token);
  useEffect(() => {
    if (token) {   
         navigate("/home");          
    }
  }, [token, navigate]);

  return (
    <>
      {!token && 
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
            </Box>
          </Grid>
        </Grid>
      }
    </>
  );
};

export default Inicio;
