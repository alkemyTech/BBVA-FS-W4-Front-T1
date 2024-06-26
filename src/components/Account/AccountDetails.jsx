import { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { editAccountAlias } from "../../api/Account";
//import editAccountAlias from '../../api/Account.js';
const AccountDetailsCard = ({ account, showVerMovimientos }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newAlias, setNewAlias] = useState(account.alias);
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };

  const navigate2 = useNavigate();

  const handleCardClick = (path, account) => {
    console.log("Transferir", account);
    navigate2(path, { state: { account } });
  };

  const handleCardClick2 = (path, account) => {
    console.log("VER MOVIMIENTOS", showVerMovimientos);
    navigate2(path, { state: { account, booleanProp: true } });
  };

  const handleEditClick = (event, account) => {
    event.stopPropagation();
    setOpenEditDialog(true);
  };

  const handleEditConfirm = async () => {
    // Aquí deberías hacer la conexión con el backend para actualizar el alias
    console.log("Nuevo alias:", newAlias);
    console.log("ID ACCOUNT:", account.idAccount);

    try {
      //await editAccountAlias
      //(account.idAccount, newAlias); // Asegúrate de que los parámetros se pasen correctamente
      await editAccountAlias(account.idAccount, newAlias);
      setOpenEditDialog(false);
      // Aquí puedes añadir la lógica para actualizar el alias en el estado si es necesario
    } catch (error) {
      console.error("Error al actualizar el alias:", error.message);
    } finally {
      console.log("LLEGO AL FINALLY");
    }
  };

  return (
    <Grid item xs={12}>
      <Card
        sx={{
          backgroundColor: "#ffffff",
          color: "#000000",
          borderRadius: "2vh",
          padding: "1vh",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        }}
      >
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={10}>
              <Typography
                variant="subtitle"
                component="div"
                sx={{ marginBottom: "8px", color: "#472183" }}
              >
                {account.accountType === "CAJA_AHORRO"
                  ? "Caja de Ahorro"
                  : "Cuenta Corriente"}
              </Typography>
              <Typography variant="h4" component="div" color="#000000">
                {formatCurrency(account.balance, account.currency)}
                {account.currency}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{ marginBottom: "0vh", color: "#4b56d2" }}
              >
                Balance disponible (a partir de hoy)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2} container direction="column" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#656ED4",
                    border: "1px solid #656ED4",
                    padding: "1vh",
                    "&:hover": {
                      backgroundColor: "#3c4370", // Color oscuro al pasar el mouse
                      borderColor: "#3c4370", // Borde oscuro al pasar el mouse
                    },
                  }}
                  onClick={() => handleCardClick("/transferencia", account)}
                >
                  <b>Transferir</b>
                </Button>
              </Grid>
              {showVerMovimientos && (
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={!showVerMovimientos} // Deshabilitar el botón si showVerMovimientos es false
                    sx={{
                      color: "#ffffff",
                      backgroundColor: "#656ED4",
                      border: "1px solid #656ED4",
                      padding: "1vh",
                      "&:hover": {
                        backgroundColor: "#3c4370", // Color oscuro al pasar el mouse
                        borderColor: "#3c4370", // Borde oscuro al pasar el mouse
                      },
                    }}
                    onClick={() => handleCardClick2("/account", account)}
                  >
                    <b>Ver movimientos</b>
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12}>
              <Accordion
                sx={{
                  boxShadow: "none",
                  borderTop: "none",
                  backgroundColor: "transparent",
                  "&:before": { display: "none" },
                }}
                disableGutters
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ padding: 0 }}
                >
                  <Typography sx={{ color: "#609AF6" }}>
                    Ver detalles de la cuenta
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography
                            variant="subtitle1"
                            component="div"
                            color="#609AF6"
                          >
                            Alias:
                          </Typography>
                        </Grid>
                        <Grid item xs={12} display="flex" alignItems="center">
                          <Typography
                            variant="body1"
                            component="div"
                            color="#000000"
                          >
                            {account.alias}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={(e) => handleEditClick(e, account)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="#609AF6"
                      >
                        CBU:
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        color="#000000"
                      >
                        {account.cbu}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        component="div"
                        color="#609AF6"
                      >
                        Límite de Transacción:
                      </Typography>
                      <Typography
                        variant="body1"
                        component="div"
                        color="#000000"
                      >
                        {formatCurrency(
                          account.transactionLimit,
                          account.currency
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        PaperProps={{
          sx: { p: 3, borderRadius: 5 },
        }}
      >
        <DialogTitle>Editar Alias</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ingresa el nuevo alias para la cuenta:
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            label="Alias"
            type="text"
            fullWidth
            variant="standard"
            value={newAlias}
            onChange={(e) => setNewAlias(e.target.value)}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenEditDialog(false)}
            sx={{
              color: "#FFF",
              backgroundColor: "#FF0000", // Color rojo
              "&:hover": { backgroundColor: "#D00000" }, // Color rojo oscuro al pasar el mouse
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
              backgroundColor: "#008000", // Color verde
              "&:hover": { backgroundColor: "#006400" }, // Color verde oscuro al pasar el mouse
              p: 1.2,
            }}
            disabled={loading}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

AccountDetailsCard.propTypes = {
  account: PropTypes.shape({
    accountType: PropTypes.string.isRequired,
    alias: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    cbu: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    transactionLimit: PropTypes.number.isRequired,
  }).isRequired,
  showVerMovimientos: PropTypes.bool.isRequired,
};

export default AccountDetailsCard;
