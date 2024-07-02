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
import { MotionPhotosAuto } from "@mui/icons-material";

const Perfil = () => {
  // Selecciona los datos del perfil desde el estado de Redux
  const { firstName, lastName, email, birthDate, gender, documentNumber } =
    useSelector((state) => state.user);

  // Hook para manejar la navegación
  const navigate = useNavigate();

  // Función para manejar el clic en el botón de editar
  const handleEditClick = () => {
    navigate("/editar-perfil"); // Cambia '/editar-perfil' por la ruta correcta
  };
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minutes] = dateArray;
    return `${day}/${month < 10 ? "0" + month : month}/${year}`;
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
              backgroundColor: "#ffffff",
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
                color: "#000",
                textAlign: "center",
                marginBottom: 2,
              }}
            >
              Perfil del Usuario
            </Typography>

            <Grid container alignItems="center" rowSpacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    backgroundColor: "#F3B36F",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                    textShadow: "0px 2px 6px #000",
                    transition: "0.2s",
                  }}
                  src="Imagen de usuario"
                >
                  {firstName[0]}
                </Avatar>
              </Grid>
              <Grid item xs={12} sx={{ pl: "8vh" }}>
                <Typography variant="h6">
                  <strong>Nombre:</strong> {firstName} {lastName}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pl: "8vh" }}>
                <Typography variant="h6">
                  <strong>Email:</strong> {email}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pl: "8vh" }}>
                <Typography variant="h6">
                  <strong>Fecha de Nacimiento:</strong> {formatDate(birthDate)}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pl: "8vh" }}>
                <Typography variant="h6">
                  <strong>Género:</strong> {gender}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pl: "8vh" }}>
                <Typography variant="h6">
                  <strong>Número de Documento:</strong> {documentNumber}
                </Typography>
              </Grid>
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
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Perfil;
