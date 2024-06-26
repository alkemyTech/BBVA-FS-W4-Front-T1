import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ListItemButton,
  Skeleton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MySnackbar from "../../UI/MySnackBar";
import { useNavigate } from "react-router";
import {
  showNotification,
  hideNotification,
} from "../../Redux/slice/snackBarSlice";
import ArrowBackComponent from "../../UI/ArrowBack";
import { selectAccount } from "../../api/Account";
import {
  getThirdAccount,
  deleteThirdAccount,
  updateThirdAccount,
} from "../../api/ThirdAccount";
import { clearSelectedDestination } from "../../Redux/slice/transferSlice";

const Transferencia = () => {
  const [thirdAccounts, setThirdAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const [loading, setLoading] = useState(false);

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
  }, [dispatch]);

  const handleNewDestiny = () => {
    navigate("/transferencia/nuevo-destino");
  };

  const handleSelectAccount = async (account, index) => {
    try {
      if (account) {
        setSelectedAccountIndex(index);
        await dispatch(selectAccount(account));
      }
      navigate("/transferencia/enviar-dinero");
    } catch (error) {
      dispatch(
        showNotification({
          message: error.message ? error.message : "Error del servidor",
          status: "error",
        })
      );
    }
  };

  const handleDeleteClick = (event, account) => {
    event.stopPropagation();
    setCurrentAccount(account);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (event, account) => {
    event.stopPropagation();
    setCurrentAccount(account);
    setNewNickname(account.nickname);
    setOpenEditDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await deleteThirdAccount(currentAccount);
      const data = await getThirdAccount();
      setThirdAccounts(data);
      setOpenDeleteDialog(false);
      dispatch(
        showNotification({
          message: "Cuenta eliminada correctamente",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(showNotification({ message: error.message, status: "error" }));
    } finally {
      setLoading(false);
    }
  };

  const handleEditConfirm = async () => {
    try {
      setLoading(true);
      const updatedAccount = { ...currentAccount, nickname: newNickname };
      await updateThirdAccount(updatedAccount);
      setThirdAccounts(
        thirdAccounts.map((acc) =>
          acc.idThirdAccount === updatedAccount.idThirdAccount
            ? updatedAccount
            : acc
        )
      );
      setOpenEditDialog(false);
      dispatch(
        showNotification({
          message: "Referencia del contacto actualizada correctamente",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(showNotification({ message: error.message, status: "error" }));
    } finally {
      setLoading(false);
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
              backgroundColor: "#fff",
              width: "50vw",
              borderRadius: 5,
              p: 4,
              boxShadow: 3,
              mb: 2,
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
              <>
                <Grid item mb={2}>
                  <Typography variant="h6" component="h4">
                    Contactos
                  </Typography>
                </Grid>
                {thirdAccounts.map((account, index) => (
                  <ListItemButton
                    key={index}
                    onClick={() =>
                      handleSelectAccount(account.destinationAccountCbu, index)
                    }
                    sx={{
                      borderBottom: "1px solid #F1F6F5",
                      minWidth: "40vw",
                      p: 1,
                      paddingTop: 1.2,
                      "&:hover": { backgroundColor: "#F9F9F9" },
                      ...(index === 0
                        ? { borderTop: "1px solid #F9F9F9" }
                        : {}),
                      pointerEvents:
                        selectedAccountIndex !== null ? "none" : "auto",
                    }}
                  >
                    <Grid item mr={"auto"}>
                      <Typography
                        variant="body1"
                        component="div"
                        textAlign={"start"}
                      >
                        {account.destinationUserFirstName +
                          " " +
                          account.destinationUserLastName}
                        <span
                          style={{
                            fontWeight: "300",
                            fontSize: "0.9rem",
                            color: "#639EC3",
                            marginLeft: "8px",
                          }}
                        >
                          {account.nickname
                            ? "(" + account.nickname + ")"
                            : account.nickname}
                        </span>
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        textAlign={"start"}
                      >
                        {account.destinationAccountBank +
                          " - " +
                          account.destinationAccountCurrency}
                      </Typography>
                    </Grid>
                    <IconButton
                      onMouseDown={(e) => handleEditClick(e, account)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onMouseDown={(e) =>
                        handleDeleteClick(e, account.idThirdAccount)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemButton>
                ))}
              </>
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
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
          >
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que quieres eliminar este contacto?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDeleteDialog(false)}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#696969",
                  "&:hover": { backgroundColor: "#585858" },
                  p: 1.2,
                }}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                sx={{
                  color: "#FFF",
                  p: 1.2,
                }}
                disabled={loading}
              >
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
          >
            <DialogTitle>Editar Nickname</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ingresa la nueva referencia para el contacto:
              </DialogContentText>
              <TextField
                autoFocus
                margin="normal"
                label="Referencia"
                type="text"
                fullWidth
                variant="standard"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                disabled={loading}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenEditDialog(false)}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#696969",
                  "&:hover": { backgroundColor: "#585858" },
                  p: 1.2,
                }}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditConfirm}
                sx={{
                  color: "#FFF",
                  p: 1.2,
                }}
                disabled={loading}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Transferencia;
