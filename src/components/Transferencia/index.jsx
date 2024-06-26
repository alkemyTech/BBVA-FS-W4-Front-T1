import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import MySnackbar from "../../UI/MySnackBar";
import { useNavigate } from "react-router";
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

    fetchData();
    dispatch(clearSelectedDestination());
  }, []);

  const handleNewDestiny = () => {
    navigate("/transferencia/nuevo-destino");
  };

  const handleSelectAccount = async (account) => {
    setIsLoading(true);

    try {
      if (account) {
        await dispatch(selectAccount(account));
        console.log(account);
      }
      navigate("/transferencia/enviar-dinero");
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
            ml={5}
            position="relative"
          >
            <Grid item>
              <ArrowBackComponent />
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
              mb: 2
            }}
          >
            <Grid item>
              <Typography variant="h4" component="h1" mb={1}>
                Transferir Dinero
              </Typography>
            </Grid>
            <Typography variant="body1" component="h3" mb={2}>
              Seleccione el destino
            </Typography>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                onClick={handleNewDestiny}
              >
                Nuevo destino
              </Button>
            </Grid>
          </Grid>

          {isLoading ? (
            <Skeleton
              animation="wave"
              variant="rectangular"
              sx={{
                margin: "0 auto",
                width: "50vw",
                minHeight: "88px",
                borderRadius: 5,
                p: 4,
                boxShadow: 3,
              }}
            />
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                margin: "0 auto",
                backgroundColor: "#fff",
                width: "50vw",
                minHeight: "88px",
                borderRadius: 5,
                p: 4,
                boxShadow: 3,
              }}
            >
              {thirdAccounts.length > 0 ? (
                thirdAccounts.map((account, index) => (
                  <Grid
                    item
                    key={index}
                    onClick={() =>
                      handleSelectAccount(account.destinationAccountCbu)
                    }
                    sx={{
                      cursor: "pointer",
                      borderBottom: "1px solid #F1F6F5",
                      minWidth: "40vw",
                      p: 1,
                      "&:hover": { backgroundColor: "#F1F6F5" },
                    }}
                  >
                    <Typography variant="body1" component="div">
                      {account.destinationUserFirstName +
                        " " +
                        account.destinationUserLastName}
                      <span
                        style={{
                          fontWeight: "300",
                          fontSize: "0.9rem",
                          color: "#4B4B4B",
                        }}
                      >
                        {account.nickname
                          ? " - (" + account.nickname + ")"
                          : account.nickname}
                      </span>
                    </Typography>
                    <Typography variant="body2" component="div">
                      {account.destinationAccountBank +
                        " - " +
                        account.destinationAccountCurrency}
                    </Typography>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" component="div">
                  No se encontraron contactos
                </Typography>
              )}
            </Grid>
          )}

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
