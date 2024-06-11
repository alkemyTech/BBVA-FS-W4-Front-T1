import { Grid, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AccountCard = ({ accountData }) => {
  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year} `;
  };

  return (
    <Grid container spacing={2}>
      {accountData.accountArs.map((account, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor: "#472183",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                <strong>${account.balance.toFixed(2)}</strong>
              </Typography>
              <Typography variant="subtitle1" component="div">
                {account.accountType === "CAJA_AHORRO"
                  ? "Caja de Ahorro"
                  : "Cuenta Corriente"}{" "}
                en AR$
              </Typography>
              <Link to="#" style={{ color: "#ffffff", textDecoration: "none" }}>
                <strong>Transferir</strong>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {accountData.accountUsd && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor: "#4B56D2",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                <strong>
                  {" "}
                  U$S {accountData.accountUsd.balance.toFixed(2)}
                </strong>
              </Typography>
              <Typography variant="subtitle1" component="div">
                Cuenta en U$D
              </Typography>
              <Link to="#" style={{ color: "#ffffff", textDecoration: "none" }}>
                <strong>Transferir</strong>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      )}

      {accountData.fixedTerms.map((term, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor: "#82C3EC",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                <strong>${term.amount}</strong>
              </Typography>
              <Typography variant="subtitle1" component="div">
                Plazo fijo
              </Typography>
              <Typography variant="body2" component="div">
                Fecha de cierre: {formatDate(term.closingDate)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

AccountCard.propTypes = {
  accountData: PropTypes.shape({
    accountArs: PropTypes.arrayOf(
      PropTypes.shape({
        balance: PropTypes.number.isRequired,
        accountType: PropTypes.string.isRequired,
      })
    ).isRequired,
    accountUsd: PropTypes.shape({
      balance: PropTypes.number.isRequired,
    }),
    fixedTerms: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default AccountCard;
