import React, { useState } from "react";
import { getAccountDetaileByCBU } from "../../api/Account";
import { Container } from "@mui/material";
import { useLocation } from "react-router";
import AccountDetailsCard from "./AccountDetails";
const Account = () => {
  const location = useLocation();
  const { account } = location.state || {};

  console.log("Las props son:", account);

  return (
    <Container>
      {account ? (       
        <AccountDetailsCard account={account}/>        
      ) : (
        <p>No se recibieron datos de la cuenta</p>
      )}
    </Container>
  );
};

export default Account;
