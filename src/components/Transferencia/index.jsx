import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  ListItemButton,
  Skeleton,
  Tooltip,
  Avatar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
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
import Zoom from "@mui/material/Zoom";

const Transferencia = () => {
  const [thirdAccounts, setThirdAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
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

  const handleDetailClick = (event, account) => {
    event.stopPropagation();
    setCurrentAccount(account);
    setOpenDetailDialog(true);
  };

  const handleKeyEnterConfirmationEdit = (e) => {
    if (e.key === "Enter") {
      handleEditConfirm();
    }
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
        <Grid container direction="column" justifyContent="center" alignItems="center">
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
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              backgroundColor: "#fff",
              maxWidth: "800px",
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
                maxWidth: "800px",
                minHeight: "88px",
                borderRadius: 5,
                p: 4,
                boxShadow: 3,
              }}
            >
              {thirdAccounts.length > 0 ? (
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
                        handleSelectAccount(
                          account.destinationAccountCbu,
                          index
                        )
                      }
                      sx={{
                        borderBottom: "1px solid #F1F6F5",
                        minWidth: "100%",
                        p: 1,
                        paddingTop: 1.2,
                        "&:hover": { backgroundColor: "#F9F9F9" },
                        ...(index === 0
                          ? { borderTop: "1px solid #F9F9F9" }
                          : {}),
                        pointerEvents:
                          selectedAccountIndex !== null ? "none" : "auto",
                      }}
                      fullWidth
                    >
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={
                          account.destinationUserFirstName +
                          " " +
                          account.destinationUserLastName
                        }
                        placement="bottom-end"
                        disableInteractive
                      >
                        <IconButton size="small" sx={{ p: 0, m: 0, mr: 2 }}>
                          <Avatar
                            sx={{
                              width: 42,
                              height: 42,
                              backgroundColor:
                                account.destinationAccountCurrency === "ARS"
                                  ? "#35B1FF" // Use theme colors for "ARS"
                                  : "#8EB052", // Use theme colors for other currencies
                            }}
                            alt={account.destinationUserFirstName.charAt(0)}
                            src="Imagen de usuario"
                          />
                        </IconButton>
                      </Tooltip>
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
                              color: "#72C9FF",
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
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Editar referencia"
                        placement="bottom-end"
                        disableInteractive
                      >
                        <IconButton
                          onMouseDown={(e) => handleEditClick(e, account)}
                          sx={{
                            color: "#72C9FF",
                            "&:hover": { color: "#88D1FF" },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Eliminar contacto"
                        placement="bottom"
                        disableInteractive
                      >
                        <IconButton
                          onMouseDown={(e) =>
                            handleDeleteClick(e, account.idThirdAccount)
                          }
                          sx={{
                            color: "#C62E2E",
                            "&:hover": { color: "#BA3131" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title="Detalle de contacto"
                        placement="bottom-start"
                        disableInteractive
                      >
                        <IconButton
                          onMouseDown={(e) => handleDetailClick(e, account)}
                          sx={{
                            color: "#E68D00",
                            "&:hover": { color: "#ED9406" },
                          }}
                        >
                          <PersonIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemButton>
                  ))}
                </>
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
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            PaperProps={{
              sx: { p: 3, borderRadius: 6, mr: 6 },
            }}
          >
            <DialogTitle>
              Confirmar Eliminación
              <IconButton
                onClick={() => setOpenDeleteDialog(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "grey",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                ¿Estás seguro de que quieres eliminar este contacto?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeleteConfirm}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#C62E2E",
                  "&:hover": { backgroundColor: "#BA3131" },
                  p: 1.2,
                }}
                disabled={loading}
              >
                Si, eliminar
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
            PaperProps={{
              sx: { p: 3, borderRadius: 5 },
            }}
          >
            <DialogTitle>
              Editar referencia{" "}
              <IconButton
                onClick={() => setOpenEditDialog(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "grey",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Ingresa nueva referencia para el contacto:
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
                onKeyDown={handleKeyEnterConfirmationEdit}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleEditConfirm}
                sx={{
                  color: "#FFF",
                  backgroundColor: "#72C9FF",
                  "&:hover": { backgroundColor: "#88D1FF" },
                  p: 1,
                }}
                disabled={loading}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
          {/* Detail Account */}
          <Dialog
            open={openDetailDialog}
            onClose={() => setOpenDetailDialog(false)}
            PaperProps={{
              sx: { p: 3, borderRadius: 5 },
            }}
          >
            <DialogTitle>
              Detalle de contacto{" "}
              <IconButton
                onClick={() => setOpenDetailDialog(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "grey",
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            {currentAccount && (
              <DialogContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>Nombre y apellido:</b>{" "}
                  {`${currentAccount.destinationUserFirstName} ${currentAccount.destinationUserLastName}`}
                </Typography>
                {currentAccount.nickname && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <b>Referencia:</b> {currentAccount.nickname}
                  </Typography>
                )}
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>Tipo y número de documento:</b>{" "}
                  {currentAccount.destinationUserDocumentType +
                    " " +
                    currentAccount.destinationUserDocumentNumber}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>CBU:</b> {currentAccount.destinationAccountCbu}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <b>Alias:</b> {currentAccount.destinationAccountAlias}
                </Typography>
                <Typography variant="body1">
                  <b>Cuenta:</b>{" "}
                  {currentAccount.destinationAccountAccountType ===
                  "CAJA_AHORRO"
                    ? "Caja de Ahorro"
                    : "Cuenta Corriente"}{" "}
                  {currentAccount.destinationAccountCurrency === "ARS"
                    ? "$"
                    : "US$"}{" "}
                  {" / " + currentAccount.destinationAccountBank + " - "}
                  {currentAccount.destinationAccountCurrency}
                </Typography>
              </DialogContent>
            )}
          </Dialog>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Transferencia;
