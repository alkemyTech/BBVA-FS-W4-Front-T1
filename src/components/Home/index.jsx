import { useState, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";
import BankAccountCard from "./AccountCard";
import TransactionList from "./TransactionList";
import { getAccountBalance } from "../../api/Account";
import MySnackbar from "../../UI/MySnackBar";
import { useSelector, useDispatch } from "react-redux";
import { hideNotification } from "../../Redux/slice/snackBarSlice";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);

  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
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
