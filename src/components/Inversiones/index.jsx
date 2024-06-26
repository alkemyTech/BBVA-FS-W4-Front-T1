import React, { useEffect, useState } from "react";
import { Container, CircularProgress, Grid, Skeleton, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getFixedTerms } from "../../api/FixedTerm";
import FixedTermsList from "./FixedTermsList"; // Asegúrate de que la ruta sea correcta
import FixedTermDetails from "./FixedTermDetails";
import ArrowBackComponent from "../../UI/ArrowBack";
import MySnackbar from "../../UI/MySnackBar";
import { hideNotification } from "../../Redux/slice/snackBarSlice";

const PlazosFijos = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Página inicial
  const [fixedTerms, setFixedTerms] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalFixedTerms, setTotalFixedTerms] = useState(0);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  const totalMoney = (fixedTerms) => {
    const today = new Date();
    return fixedTerms
      .filter((term) => {
        const [year, month, day] = term.closingDate;
        const closingDate = new Date(year, month - 1, day); // Los meses son 0-indexed en JavaScript
        return closingDate >= today;
      })
      .reduce((total, term) => total + term.amount, 0);
  };

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  const totalInvertedFixedTerms = useSelector(
    (state) => state.fixedTerm.totalInverted
  );
  useEffect(() => {
    setTotalFixedTerms(totalInvertedFixedTerms);
  }, [])
  
  

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const data = await getFixedTerms(page);
      setFixedTerms(data.fixedTerms);
      setTotalPages(data.countPages); // Establecemos el total de páginas desde el backend
      // console.log(totalMoney(data.fixedTerms));
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    fetchData(currentPage);
  }, [token, navigate, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value - 1);
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <ArrowBackComponent />
      {loading ? (
        <Box sx={{ width: '100%', marginTop: '5vh' }}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={150}
            sx={{ marginBottom: "16px", borderRadius: "8px" }}
          />
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ marginBottom: "16px", borderRadius: "8px" }}
          />
        </Box>
      ) : (
        <>
          <Grid container justifyContent="center" sx={{ marginTop: "2vh" }}>
            <FixedTermDetails totalFixedTerms={totalFixedTerms} />
            <Grid item xs={12}>
              <FixedTermsList
                fixedTerms={fixedTerms}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            </Grid>
          </Grid>
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

export default PlazosFijos;
