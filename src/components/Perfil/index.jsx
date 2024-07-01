import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import ArrowBackComponent from "../../UI/ArrowBack";

const Perfil = () => {
  // Selecciona los datos del perfil desde el estado de Redux
  const { firstName, lastName, email } = useSelector((state) => state.user);

  // Hook para manejar la navegación
  const navigate = useNavigate();

  // Función para manejar el clic en el botón de editar
  const handleEditClick = () => {
    navigate("/editar-perfil"); // Cambia '/editar-perfil' por la ruta correcta
  };

  return (
    <Grid container>
      <Grid container className="container">
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            position="relative"
          >
            <Grid item ml={5}>
              <ArrowBackComponent />
            </Grid>
          </Grid>
          <Box
            sx={{
              padding: 4,
              backgroundColor: "#f1f6f5",
              borderRadius: 2,
              boxShadow: 3,
              maxWidth: 600,
              margin: "auto",
            }}
          >
            <Typography
              variant="h4"
              component="h4"
              gutterBottom
              sx={{
                color: "#4b56d2",
                textAlign: "center",
              }}
            >
              Perfil del Usuario
            </Typography>

            <Card sx={{ boxShadow: 1, backgroundColor: "#DDDDDD" }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Avatar
                      sx={{ bgcolor: deepPurple[500], width: 72, height: 72 }}
                    >
                      {firstName[0]}
                      {lastName[0]}
                    </Avatar>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="h6" sx={{ color: "#4b56d2" }}>
                      <strong>Nombre:</strong> {firstName} {lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center">
                    <Typography variant="body1" sx={{ color: "#609af6" }}>
                      <strong>Email:</strong> {email}
                    </Typography>
                  </Grid>
                  {/* Agrega más campos según los datos disponibles en tu estado */}
                  <Grid item xs={12} textAlign="center" sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEditClick}
                    >
                      Editar datos
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Perfil;
