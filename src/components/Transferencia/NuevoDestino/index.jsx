import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Button, Typography } from "@mui/material";
import MySnackbar from "../../../UI/MySnackBar";
import { useNavigate } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../../UI/ArrowBack";
import { searchAccount } from "../../../api/Account";

const NuevoDestino = () => {
  const [accountSearch, setAccountSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  const handleKeyEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await dispatch(searchAccount(accountSearch));
      navigate("/transferencia/confirmar-destino");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message ? error.message : "Error del servidor",
          status: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
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
            alignItems="center"
            sx={{
              margin: "0 auto",
              backgroundColor: "#fff",
              width: "50vw",
              borderRadius: 5,
              p: 4,
              boxShadow: 3,
            }}
            onKeyDown={handleKeyEnterSearch}
          >
            <Grid item xs mb={1}>
              <Typography variant="h4" component="h1">
                Ingrese nuevo destino
              </Typography>
            </Grid>
            <Grid
              item
              style={{ maxWidth: "28vw", minWidth: "16rem", width: "100%" }}
              mt={2}
            >
              <TextField
                label="CBU o Alias del destinatario"
                value={accountSearch}
                onChange={(e) => setAccountSearch(e.target.value)}
                fullWidth
                disabled={isLoading}
              />
            </Grid>
            <Grid
              item
              style={{ maxWidth: "12vw", minWidth: "7rem", width: "100%" }}
              mt={3}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                onClick={handleSearch}
                fullWidth
              >
                {isLoading ? "Cargando..." : "Buscar"}
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

export default NuevoDestino;
