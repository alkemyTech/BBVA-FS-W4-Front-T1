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
  }, [loading, token]);

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
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
