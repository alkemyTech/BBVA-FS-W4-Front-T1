import { Grid } from "@mui/material";
import { useLocation } from "react-router";
import ArrowBackComponent from "../../UI/ArrowBack";
import AccountDetailsCard from "./AccountDetails";
import TransactionListDetails from "./TransactionListDetails";
import SummaryBarChart from "./SummaryBarChart";
const Account = () => {
  const location = useLocation();
  const { account } = location.state || {};

  console.log("Las props son:", account);

  return (
    <Grid container className="container">
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
      {account ? (
        <Grid container justifyContent="center" pt={2}>
          <Grid item xs={12} lg={6}>
            <AccountDetailsCard account={account} showVerMovimientos={false} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <SummaryBarChart account={account} />
          </Grid>
          <Grid item xs={12}>
            <TransactionListDetails account={account} />
          </Grid>
          {/* <MySnackbar
            open={notification.open}
            handleClose={handleSnackbarClose}
            message={notification.message}
            status={notification.status}
          />*/}
        </Grid>
      ) : (
        <p>No se recibieron datos de la cuenta</p>
      )}
    </Grid>
  );
};

export default Account;
