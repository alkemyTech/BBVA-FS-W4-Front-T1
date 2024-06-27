import { Container, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router";
import ArrowBackComponent from "../../UI/ArrowBack";
import AccountDetailsCard from "./AccountDetails";
import TransactionListDetails from "./TransactionListDetails";
import { FlashOnRounded } from "@mui/icons-material";
const Account = () => {
  const location = useLocation();
  const { account } = location.state || {};

  console.log("Las props son:", account);

  return (
    <Container>
      <ArrowBackComponent/>    
      {account ? (      
        <Grid container justifyContent="center" > 
        <AccountDetailsCard account={account} showVerMovimientos={false}/>  
        <Grid item xs={12}>
        <TransactionListDetails account={account}/>  
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
    </Container>
  );
};

export default Account;
