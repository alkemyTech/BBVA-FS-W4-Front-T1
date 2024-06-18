import React, { useState } from "react";
import { getAccountDetaileByCBU } from "../../api/Account";
import { Container, Grid } from "@mui/material";
import { useLocation } from "react-router";
import AccountDetailsCard from "./AccountDetails";
import TransactionListDetails from "./TransactionListDetails";
import ArrowBackComponent from "../../UI/ArrowBack";
const Account = () => {
  const location = useLocation();
  const { account } = location.state || {};

  console.log("Las props son:", account);

  return (
    <Container>
      <ArrowBackComponent/>    
      {account ? (      
        <Grid container justifyContent="center" sx={{ marginTop: "2vh" }}> 
        <AccountDetailsCard account={account}/>  
        <Grid item xs={12}>
        <TransactionListDetails accountId={account.idAccount}/>  
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
