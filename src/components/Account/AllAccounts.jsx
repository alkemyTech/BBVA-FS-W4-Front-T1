import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAccountBalance } from "../../api/Account";
import { CircularProgress, Container, Grid } from "@mui/material";
import TransactionList from "../Home/TransactionList";
import MySnackbar from "../../UI/MySnackBar";
import AccountDetailsCard from "./AccountDetails";

const AllAccounts = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const data = await getAccountBalance();
        setAccountData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };
  console.log("ACCOUN DATA:", accountData);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginTop: "1vh" }}>
            {accountData.accountArs &&
              accountData.accountArs.map((account, index) => (
                <AccountDetailsCard account={account} />
              ))}
            {accountData.accountUsd && (
              <AccountDetailsCard account={accountData.accountUsd} />
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default AllAccounts;
