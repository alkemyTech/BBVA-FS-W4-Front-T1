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
import { setConfirmedDestination } from "../../../Redux/slice/transferSlice";
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

  const handleKeyEnterConfirmation = (e) => {
    if (e.key === "Enter") {
      handleConfirmation(e);
    }
  };

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
        await dispatch(setConfirmedDestination());
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
    navigate("/transferencia");
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
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
              <ArrowBackComponent disabled={isLoading} />
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{
              margin: "0 auto",
              backgroundColor: "#fff",
              width: 480,
              borderRadius: 5,
              rowGap: 2,
              p: 5,
              boxShadow: 3,
            }}
          >
            <Grid item mb={1}>
              <Typography variant="h4" component="h1">
                Confirmar destino
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                <b>Nombre y apellido:</b>{" "}
                {selectedDestination.userFirstName +
                  " " +
                  selectedDestination.userLastName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                <b>Tipo y número de documento:</b>{" "}
                {selectedDestination.userDocumentType +
                  " " +
                  selectedDestination.userDocumentNumber}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                <b>CBU:</b> {selectedDestination.cbu}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                <b>Alias:</b> {selectedDestination.alias}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" component="h4">
                <b>Cuenta:</b>{" "}
                {selectedDestination.accountType === "CAJA_AHORRO"
                  ? "Caja de Ahorro"
                  : "Cuenta Corriente"}{" "}
                {selectedDestination.currency +
                  " - " +
                  selectedDestination.bank}
              </Typography>
            </Grid>
            <Grid item alignSelf="center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={addToContacts}
                    onChange={(e) => setAddToContacts(e.target.checked)}
                    disabled={isLoading}
                  />
                }
                label="Agregar a la lista de contactos"
                sx={{ mr: 0 }}
              />
            </Grid>
            {addToContacts && (
              <Grid item alignSelf="center">
                <Typography variant="body2" component="h6" mt={-2} mb={2}>
                  Agregue una referencia de contacto (Opcional)
                </Typography>
                <TextField
                  label="Referencia"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  fullWidth
                  disabled={isLoading}
                  onKeyDown={handleKeyEnterConfirmation}
                />
              </Grid>
            )}
            <Grid item mb={1} alignSelf="center">
              <Button
                variant="text"
                disabled={isLoading}
                onClick={handleCancelation}
                sx={{
                  fontWeight: "600",
                  color: "grey",
                  background: "#FFF",
                  backgroundColor: "#FFF",
                  "&:hover": { backgroundColor: "#FFF" },
                  marginRight: "2rem",
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleConfirmation}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#8EB052",
                  background:
                    "linear-gradient(90deg, #94B758 50%, #8EB052 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "100% 0",
                  transition: "background-position 0.5s",
                  "&:hover": {
                    backgroundPosition: "0 0",
                    backgroundColor: "#FFF",
                  },
                }}
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
