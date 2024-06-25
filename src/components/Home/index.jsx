import { useState, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";
import BankAccountCard from "./AccountCard";
import TransactionList from "./TransactionList";
import { getAccountBalance } from "../../api/Account";
import MySnackbar from "../../UI/MySnackBar";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../../Redux/slice/snackBarSlice";
import { useNavigate } from "react-router";
import { clearUser } from "../../Redux/slice/userSlice";

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
            window.location.reload();
            navigate("/")
          }
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Container sx={{ position: "relative", minHeight: "70vh" }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <CircularProgress sx={{ color: "#472183" }} />
        </div>
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
