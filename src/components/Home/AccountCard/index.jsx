import { Grid, Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setTotalInverted } from "../../../Redux/slice/fixedTermSlice";

const AccountCard = ({ accountData }) => {
  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    return `${day}/${month}/${year} `;
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
    <Grid container spacing={2} sx={{ marginTop: "5vh" }}>
      {accountData.accountArs.map((account, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor:
                account.accountType === "CAJA_AHORRO" ? "#5361F8" : "#6b77ff",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: 6,
              transform:"scale(1)",
              transition: "0.2s",
              "&:hover":{transform:"scale(1.05)"},
            }}
            onClick={() => handleCardClick(`/account`, account)}
          >
            <CardContent>
              <Typography variant="h6" component="div" sx={{textShadow: '0px 0px 1px #000'}}>
                <strong>
                  {formatCurrency(account.balance, account.currency)}
                </strong>
              </Typography>
              <Typography variant="subtitle1" component="div" sx={{textShadow: '0px 0px 1px #000'}}>
                {account.accountType === "CAJA_AHORRO"
                  ? "Caja de Ahorro"
                  : "Cuenta Corriente"}
              </Typography>
              <Typography variant="body2" component="div" sx={{textShadow: '0px 0px 1px #000'}}>
                {account.currency}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {accountData.accountUsd && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor: "#609af6",
              color: "#ffffff",
              padding: "16px",
              borderRadius: "8px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: 6,
              transform:"scale(1)",
              transition: "0.2s",
              "&:hover":{transform:"scale(1.05)"},
            }}
            onClick={() => handleCardClick(`/account`, accountData.accountUsd)}
          >
            <CardContent>
              <Typography variant="h6" component="div" sx={{textShadow: '0px 0px 1px #000'}}>
                <strong>
                  {formatCurrency(
                    accountData.accountUsd.balance,
                    accountData.accountUsd.currency
                  )}
                </strong>
              </Typography>
              <Typography variant="subtitle1" component="div"sx={{textShadow: '0px 0px 1px #000'}}>
                Caja de Ahorro
              </Typography>
              <Typography variant="body2" component="div"sx={{textShadow: '0px 0px 1px #000'}}>
                {accountData.accountUsd.currency}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}

      {totalFixedTerms > 0 && (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{
              backgroundColor: "#7DAFFF",
              color: "#FFFFFF",
              padding: "16px",
              borderRadius: "8px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: 6,
              transform:"scale(1)",
              transition: "0.2s",
              "&:hover":{transform:"scale(1.05)"},
            }}
            onClick={() =>
              handleCardClick(`/plazos-fijos`, accountData.fixedTerms)
            }
          >
            <CardContent>
              <Typography variant="h6" component="div" sx={{textShadow: '0px 0px 1px #000'}}>
                <strong>{formatCurrency(totalFixedTerms, "ARS")}</strong>
              </Typography>
              <Typography variant="subtitle1" component="div" sx={{textShadow: '0px 0px 1px #000'}}>
                Total Invertido en Plazos Fijos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
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
