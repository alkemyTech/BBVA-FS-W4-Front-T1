import { Grid, IconButton, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setTotalInverted } from "../../../Redux/slice/fixedTermSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const AccountCard = ({ accountData }) => {
  const [showAmount, setShowAmount] = useState(false);


  const handleClickShowAmount = () => {
    setShowAmount(!showAmount);
  };

  const handleMouseDownAmount = (event) => {
    event.preventDefault();
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency,
    }).format(amount);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (path, account) => {
    console.log("Account", account);
    navigate(path, { state: { account } });
  };

  const today = new Date();
  const totalFixedTerms = accountData.fixedTerms
    .filter((term) => {
      const [year, month, day] = term.closingDate;
      const closingDate = new Date(year, month - 1, day); // Los meses son 0-indexed en JavaScript
      return closingDate >= today;
    })
    .reduce((total, term) => total + term.amount, 0);

  dispatch(setTotalInverted(totalFixedTerms));

  return (
    <>
      <Grid
        container
        alignItems="center"
        sx={{
          marginTop: "2vh",
          display: "flex",
          position: "relative",
        }}
      >
        <Typography marginRight={1}>
          {showAmount ? "Ocultar saldos" : "Mostrar saldos"}
        </Typography>

        <IconButton
          onClick={handleClickShowAmount}
          onMouseDown={handleMouseDownAmount}
        >
          {showAmount ? <VisibilityOff /> : <Visibility />}{" "}
        </IconButton>
      </Grid>
      <Grid container spacing={2}>
        {accountData.accountArs.map((account, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                backgroundColor:
                  // account.accountType === "CAJA_AHORRO" ? "#5E35B1" : "#6b77ff",
                  account.accountType === "CAJA_AHORRO" ? "#5361F8" : "#6b77ff",

                color: "#ffffff",
                // padding: "16px",
                borderRadius: "8px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
                boxShadow: 6,
                transform: "scale(1)",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: 180,
                  height: 150,
                  background:
                    // account.accountType === "CAJA_AHORRO" ? "#4527A0" : "#5260ff",
                    account.accountType === "CAJA_AHORRO"
                      ? "#3a4af7"
                      : "#5260ff",

                  borderRadius: "50%",
                  top: -85,
                  right: -95,
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: 150,
                  height: 170,
                  background:
                    // account.accountType === "CAJA_AHORRO" ? "#4527A0" : "#5260ff",
                    account.accountType === "CAJA_AHORRO"
                      ? "#3a4af7"
                      : "#5260ff",
                  borderRadius: "50%",
                  top: -125,
                  right: -15,
                  opacity: 0.5,
                },
              }}
              onClick={() => handleCardClick(`/account`, account)}
            >
              <CardContent sx={{ position: "relative", zIndex: 1 }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ textShadow: "0px 0px 1px #000" }}
                    >
                      <strong>
                        {showAmount
                          ? formatCurrency(account.balance, account.currency)
                          : "$ ***"}
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container justifyContent="flex-end">
                      <Typography variant="h6" component="div">
                        <strong>{account.currency}</strong>
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textShadow: "0px 0px 1px #000" }}
                    >
                      {account.accountType === "CAJA_AHORRO"
                        ? "Caja de Ahorro"
                        : "Cuenta Corriente"}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {accountData.accountUsd && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100px",
                cursor: "pointer",
                boxShadow: 6,
                backgroundColor: "#609af6",
                // backgroundColor: "#8259cb",
                color: "#ffffff",
                // padding: "16px",
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                transform: "scale(1)",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: 180,
                  height: 150,
                  // background: "#673ab7",
                  background: "#488bf5",
                  borderRadius: "50%",
                  top: -85,
                  right: -95,
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: 150,
                  height: 170,
                  // background: "#673ab7",
                  background: "#488bf5",
                  borderRadius: "50%",
                  top: -125,
                  right: -15,
                  opacity: 0.5,
                },
              }}
              onClick={() =>
                handleCardClick(`/account`, accountData.accountUsd)
              }
            >
              <CardContent sx={{ position: "relative", zIndex: 1 }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ textShadow: "0px 0px 1px #000" }}
                    >
                      <strong>
                        {showAmount
                          ? formatCurrency(
                              accountData.accountUsd.balance,
                              accountData.accountUsd.currency
                            )
                          : "U$D ***"}
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container justifyContent="flex-end">
                      <Typography variant="h6" component="div">
                        <strong>USD</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textShadow: "0px 0px 1px #000" }}
                    >
                      Caja de Ahorro
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}

        {totalFixedTerms > 0 && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                height: "100px",
                flexDirection: "column",
                justifyContent: "center",
                cursor: "pointer",
                // backgroundColor: "#B39DDB",
                backgroundColor: "#7DAFFF",

                color: "#ffffff",
                // padding: "16px",
                borderRadius: "8px",
                display: "flex",
                boxShadow: 6,

                overflow: "hidden",
                position: "relative",
                transform: "scale(1)",
                transition: "0.2s",
                "&:hover": { transform: "scale(1.05)" },
                "&:after": {
                  content: '""',
                  position: "absolute",
                  width: 180,
                  height: 150,
                  // background: "#9678cd",
                  background: "#649fff",
                  borderRadius: "50%",
                  top: -85,
                  right: -95,
                },
                "&:before": {
                  content: '""',
                  position: "absolute",
                  width: 150,
                  height: 170,
                  // background: "#9678cd",
                  background: "#649fff",
                  borderRadius: "50%",
                  top: -125,
                  right: -15,
                  opacity: 0.5,
                },
              }}
              onClick={() =>
                handleCardClick(`/plazos-fijos`, accountData.fixedTerms)
              }
            >
              <CardContent sx={{ position: "relative", zIndex: 1 }}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ textShadow: "0px 0px 1px #000" }}
                    >
                      <strong>
                        {showAmount
                          ? formatCurrency(totalFixedTerms, "ARS")
                          : "$ ***"}
                      </strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Grid container justifyContent="flex-end">
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ display: "inline-block" }}
                      >
                        <strong>ARS</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ textShadow: "0px 0px 1px #000" }}
                    >
                      Total Invertido en Plazos Fijos
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </>
  );
};

AccountCard.propTypes = {
  accountData: PropTypes.shape({
    accountArs: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.number.isRequired,
        accountType: PropTypes.string.isRequired,
        currency: PropTypes.string.isRequired,
      })
    ).isRequired,
    accountUsd: PropTypes.shape({
      balance: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
    fixedTerms: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        closingDate: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default AccountCard;
