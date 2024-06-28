import { Container, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { hideNotification } from "../../Redux/slice/snackBarSlice";
import { clearUser } from "../../Redux/slice/userSlice";
import MySnackbar from "../../UI/MySnackBar";
import { getAccountBalance } from "../../api/Account";
import BankAccountCard from "./AccountCard";
import TransactionList from "./TransactionList";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAccountBalance();
        setAccountData(data);
        setLoading(false);
      } catch (error) {
        if (error.message == "Usuario no autenticado") {
          dispatch(clearUser());
          navigate("/");
        }
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  const expectedAccountCount = accountData
    ? accountData.accountArs.length +
      (accountData.accountUsd ? 1 : 0) +
      (accountData.fixedTerms.length > 0 ? 1 : 0)
    : 2;

  return (
    <Container sx={{ position: "relative", minHeight: "70vh" }}>
      {loading ? (
        <>
          <Grid container spacing={2} sx={{ marginTop: "5vh" }}>
            {[...Array(expectedAccountCount)].map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={100}
                  sx={{ borderRadius: "8px" }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid sx={{ borderRadius: "8px", marginTop: "16px" }}>
            <Grid>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={400}
                sx={{ borderRadius: "8px" }}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <BankAccountCard accountData={accountData} />
          <TransactionList accountData={accountData} />
          <MySnackbar
            open={notification.open}
            handleClose={handleSnackbarClose}
            message={notification.message}
            status={notification.status}
          />
        </>
      )}
    </Container>
  );
};

export default Home;
