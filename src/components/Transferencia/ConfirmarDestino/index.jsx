import {
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedDestination,
  setConfirmedDestination,
} from "../../../Redux/slice/transferSlice";
import { useNavigate } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../../UI/ArrowBack";
import MySnackbar from "../../../UI/MySnackBar";
import { addThirdAccount } from "../../../api/ThirdAccount";

const ConfirmarDestino = () => {
  const [nickname, setNickname] = useState("");
  const [addToContacts, setAddToContacts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (addToContacts) {
        const newThirdAccount = {
          nickname: nickname,
          idDestinationAccount: selectedDestination.idAccount,
        };
        await addThirdAccount(newThirdAccount);
        dispatch(setConfirmedDestination());
        dispatch(
          showNotification({
            message: "Cuenta agregada con éxito",
            status: "success",
          })
        );
      } else {
        dispatch(setConfirmedDestination());
      }
      navigate("/transferencia/enviar-dinero");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message ? error.message : "Error del servidor",
          status: "error",
        })
      );
      setAddToContacts(false);
      setIsLoading(false);
    }
  };

  const handleCancelation = async (e) => {
    e.preventDefault();

    try {
      await dispatch(clearSelectedDestination());
      navigate("/transferencia");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message ? error.message : "Error del servidor",
          status: "error",
        })
      );
    }
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Grid container>
      <Grid container className="container">
        <ArrowBackComponent />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" component="h1">
              Confirmar nuevo destino
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography variant="body1" component="h4">
                Nombre y apellido:{" "}
                {selectedDestination.userFirstName +
                  " " +
                  selectedDestination.userLastName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                Tipo de documento: {selectedDestination.userDocumentType}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                Número de documento: {selectedDestination.userDocumentNumber}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                CBU: {selectedDestination.cbu}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                <b>Alias:</b> {selectedDestination.alias}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                Banco: {selectedDestination.bank}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                Tipo de Cuenta:{" "}
                {selectedDestination.accountType === "CAJA_AHORRO"
                  ? "Caja de Ahorro"
                  : "Cuenta Corriente"}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                Moneda: {selectedDestination.currency}
              </Typography>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={addToContacts}
                    onChange={(e) => setAddToContacts(e.target.checked)}
                    disabled={isLoading}
                  />
                }
                label="Agregar a la lista de contactos"
              />
            </Grid>
            {addToContacts && (
              <Grid item>
                <Typography variant="body2" component="h6" mb={1}>
                  Agrega una referencia de contacto (Opcional)
                </Typography>
                <TextField
                  label="Referencia"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  fullWidth
                  disabled={isLoading}
                />
              </Grid>
            )}
            <Grid item>
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleCancelation}
                sx={{
                  color: "black",
                  backgroundColor: "#D1D8C5",
                  "&:hover": { backgroundColor: "#c0c9b5" },
                  marginRight: "2.5vw",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#472183" }}
                disabled={isLoading}
                onClick={handleConfirmation}
              >
                {isLoading ? "Cargando..." : "Confirmar"}
              </Button>
            </Grid>
          </Grid>
          <MySnackbar
            open={notification.open}
            handleClose={handleSnackbarClose}
            message={notification.message}
            status={notification.status}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ConfirmarDestino;
