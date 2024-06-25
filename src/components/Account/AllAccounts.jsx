import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAccountBalance } from "../../api/Account";
import { Box, CircularProgress, Container, Grid, Skeleton } from "@mui/material";
import TransactionList from "../Home/TransactionList";
import MySnackbar from "../../UI/MySnackBar";
import AccountDetailsCard from "./AccountDetails";
import { ArrowBack } from "@mui/icons-material";
import ArrowBackComponent from "../../UI/ArrowBack";

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
    <Container sx={{ position: "relative", minHeight: "70vh" }}>
      {loading ? (
        <Box sx={{ width: '100%', marginTop: '5vh' }}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ marginBottom: "16px", borderRadius: "8px" }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={200}
            sx={{ marginBottom: "16px", borderRadius: "8px" }}
          />
        </Box>
      ) : (
        <>
          <ArrowBackComponent />
          <Grid container spacing={2} sx={{ marginTop: "1vh" }}>
            {accountData.accountArs &&
              accountData.accountArs.map((account, index) => (
                <AccountDetailsCard key={index} account={account} />
              ))}
            {accountData.accountUsd && (
              <AccountDetailsCard account={accountData.accountUsd} />
            )}
          </Grid>
        </>
      )}
      <MySnackbar
        open={notification.open}
        handleClose={handleSnackbarClose}
        message={notification.message}
        status={notification.status}
      />
    </Container>
  );
};

export default AllAccounts;
