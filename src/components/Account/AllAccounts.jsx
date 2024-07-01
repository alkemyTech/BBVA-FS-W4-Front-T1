import { Box, Container, Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ArrowBackComponent from "../../UI/ArrowBack";
import { getAccountBalance } from "../../api/Account";
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
      </Grid>{" "}
      {loading ? (
        <Box sx={{ width: "100%", pt: 2 }}>
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
            sx={{ borderRadius: "8px" }}
          />
        </Box>
      ) : (
        <>
          <Grid container spacing={2} pt={2}>
            {accountData.accountArs &&
              accountData.accountArs.map((account, index) => (
                <AccountDetailsCard
                  account={account}
                  showVerMovimientos={true}
                />
              ))}
            {accountData.accountUsd && (
              <AccountDetailsCard
                account={accountData.accountUsd}
                showVerMovimientos={true}
              />
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default AllAccounts;
