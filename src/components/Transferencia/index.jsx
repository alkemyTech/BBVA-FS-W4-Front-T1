import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import MySnackbar from "../../UI/MySnackBar";
import { useNavigate, useLocation } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../UI/ArrowBack";
import "./index.css";
import { selectAccount } from "../../api/Account";
import { getThirdAccount } from "../../api/ThirdAccount";
import { clearSelectedDestination } from "../../Redux/slice/transferSlice";

const Transferencia = () => {
  const accountTypes = {
    USD: ["CAJA_AHORRO"],
    ARS: ["CAJA_AHORRO", "CUENTA_CORRIENTE"],
  };

  const [thirdAccounts, setThirdAccounts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getThirdAccount();
        setThirdAccounts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    dispatch(clearSelectedDestination());
    fetchData();
  }, [isLoading]);

  const handleNewDestiny = () => {
    navigate("/transferencia/nuevo-destino");
  };

  const handleSelectAccount = async (e) => {
    try {
      setIsLoading(true);
      await dispatch(selectAccount(e));
      navigate("/transferencia/enviar-dinero");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message ? error.message : "Error del servidor",
          status: "error",
        })
      );
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Grid container>
      <Grid container className="container">
        <ArrowBackComponent />
        <Grid container justifyContent="center" alignItems="center" rowSpacing={2}>
          <Grid item>
            <Typography variant="h4" component="h1">
              Transferir Dinero
            </Typography>
          </Grid>
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography variant="body1" component="h3" mb={1}>
              Seleccione el destino
            </Typography>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleNewDestiny}
                sx={{ backgroundColor: "#472183" }}
              >
                Nuevo destino
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <CircularProgress sx={{ color: "#472183" }} />
              </div>
            ) : thirdAccounts.length > 0 ? (
              thirdAccounts.map((account, index) => (
                <Grid key={index} item xs={4}>
                  <Card
                    sx={{
                      backgroundColor: "#D1D8C5",
                      color: "black",
                      width: "30vw",
                      padding: "0.4rem",
                      borderRadius: "8px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleSelectAccount(account.destinationAccountCbu)
                    }
                    raised="true"
                  >
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {account.destinationUserFirstName + " " + account.destinationUserLastName}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {account.nickname}
                      </Typography>
                      <Typography variant="body1" component="div">
                        {"CBU: " + account.destinationAccountCbu}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" component="div">
                No se encontraron contactos
              </Typography>
            )}
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

export default Transferencia;
