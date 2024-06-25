import React, { useEffect, useState } from "react";
import ArrowBackComponent from "../../UI/ArrowBack";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { simulateFixedTerm } from "../../api/FixedTerm";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedDay, setSimulatedFixedTerm } from "../../Redux/slice/fixedTermSlice";

const SimularPlazoFijo = () => {
  const [amount, setAmount] = useState("");
  const [selectedDays, setSelectedDays] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [closingDate, setClosingDate] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [amountError, setAmountError] = useState("");

  const today = new Date();
  const minDate = dayjs(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputRestriction =
    (allowedCharacters = "") =>
    (e) => {
      const isAllowedCharacter = new RegExp(`[^${allowedCharacters}]`).test(
        e.key
      );
      const isBackspace = e.key === "Backspace";
      const isTab = e.key === "Tab"; // Check for Tab key

      if (isAllowedCharacter && !isBackspace && !isTab) {
        e.preventDefault();
      }
    };

    const handleCreateFixedTerm = () => {
      const simulatedFixedTerm = {
        amount,
        closingDate
      }
      dispatch(setSimulatedFixedTerm(simulatedFixedTerm));
      navigate("/plazo-fijo");
    };

  const handleDayClick = (day) => {
    if (day === "Otro") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      const today = new Date();
      let closingDate;
      switch (day) {
        case "30":
          closingDate = dayjs(today.getTime() + 31 * 24 * 60 * 60 * 1000);
          break;
        case "60":
          closingDate = dayjs(today.getTime() + 61 * 24 * 60 * 60 * 1000);
          break;
        case "90":
          closingDate = dayjs(today.getTime() + 91 * 24 * 60 * 60 * 1000);
          break;
        default:
          closingDate = null;
      }
      setClosingDate(closingDate);
    }
    dispatch(setSelectedDay(day));

    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = { ...prevSelectedDays };
      Object.keys(newSelectedDays).forEach((key) => {
        newSelectedDays[key] = false;
      });
      newSelectedDays[day] = true;
      return newSelectedDays;
    });
  };

  const formatDate = (dateArray) => {
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    return `${day}/${month}/${year}`;
  };

  const fetchData = async () => {
    try {
      const fixedTermData = {
        amount: parseFloat(amount.replace(",", ".")).toFixed(2),
        closingDate,
      };
      const response = await simulateFixedTerm(fixedTermData);
      setResponseData(response);

      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (amount <= 0 && amount != "") {
      setAmountError("El monto debe ser mayor a cero.");
    } else {
      setAmountError("");
    }
    if (amount && closingDate) {
      fetchData();
    }
  }, [amount, closingDate]);

  return (
    <Container sx={{ marginBottom: 3 }}>
      <ArrowBackComponent />
      <Grid
        container
        sx={{
          margin: "0 auto",
          bgcolor: "#fff",
          width: 480,
          p: 5,
          borderRadius: 5,
          boxShadow: 3,
          display: "flex",
        }}
        // onSubmit={handleSubmit}
        //   onKeyDown={handleKeyEnter}
      >
        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Simular Plazo Fijo
          </Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Typography variant="h7">¿Cuanto queres invertir?</Typography>
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 2 }}>
          <TextField
            label="Monto"
            value={amount}
            fullWidth
            // margin="normal"
            error={Boolean(amountError)}
            helperText={amountError}
            onChange={(e) => setAmount(e.target.value)}
            required
            onKeyDown={handleInputRestriction("0-9")}
          />
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <Typography variant="h7">¿A cuantos dias?</Typography>
        </Grid>

        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            onClick={() => handleDayClick("30")}
            variant={selectedDays["30"] ? "contained" : "outlined"}
            sx={{
              color: "#472183",
              borderColor: "#472183",
              "&.MuiButton-contained": {
                bgcolor: "#472183",
                color: "#ffffff", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#472183",
                borderColor: "#472183",
                color: "#ffffff",
              },
            }}
          >
            30 dias
          </Button>
        </Grid>

        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            onClick={() => handleDayClick("60")}
            variant={selectedDays["60"] ? "contained" : "outlined"}
            sx={{
              color: "#472183",
              borderColor: "#472183",
              "&.MuiButton-contained": {
                bgcolor: "#472183",
                color: "#ffffff", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#472183",
                borderColor: "#472183",
                color: "#ffffff",
              },
            }}
          >
            60 dias
          </Button>
        </Grid>

        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            onClick={() => handleDayClick("90")}
            variant={selectedDays["90"] ? "contained" : "outlined"}
            sx={{
              color: "#472183",
              borderColor: "#472183",
              "&.MuiButton-contained": {
                bgcolor: "#472183",
                color: "#ffffff", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#472183",
                borderColor: "#472183",
                color: "#ffffff",
              },
            }}
          >
            90 dias
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ marginBottom: 2 }}>
          <Button
            fullWidth
            onClick={() => handleDayClick("Otro")}
            variant={selectedDays["Otro"] ? "contained" : "outlined"}
            sx={{
              color: "#472183",
              borderColor: "#472183",
              "&.MuiButton-contained": {
                bgcolor: "#472183",
                color: "#ffffff", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#472183",
                borderColor: "#472183",
                color: "#ffffff",
              },
            }}
          >
            Otro
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 1, marginBottom: 2 }}>
          {showDatePicker && (
            <DatePicker
              required
              label="Fecha de Cierre"
              value={closingDate}
              onChange={(e) => setClosingDate(e)}
              minDate={minDate}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                },
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid container sx={{ borderRadius: 2, marginTop: 1, padding: 2 }}>
          <Typography> Al final del plazo fijo, recibís</Typography>
          {responseData && amount && closingDate && (
            <Grid container sx={{ marginTop: 1 }}>
              <Grid item xs={12} sx={{ marginTop: 1 }}>
                <Typography variant="h5">
                  ${responseData.amountTotalToReceive}
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ marginTop: 1 }}>
                <Typography variant="caption">Hasta el</Typography>
              </Grid>
              <Grid item xs={4} sx={{ marginTop: 1 }}>
                <Typography variant="caption">Interes ganado</Typography>
              </Grid>
              <Grid item xs={4} sx={{ marginTop: 1 }}>
                <Typography variant="caption">Tasa de interes</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{formatDate(responseData.closingDate)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  $ {responseData.interestTotal.toFixed(2)}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography>{responseData.interest}%</Typography>
              </Grid>
            </Grid>
          )}
          {(!responseData || !amount) && (
            <Grid container sx={{ marginTop: 1 }}>
              <Grid item xs={12} sx={{ marginTop: 1 }}>
                <Typography variant="h5">$0</Typography>
              </Grid>

              <Grid item xs={4} sx={{ marginTop: 1 }}>
                <Typography variant="caption">Hasta el</Typography>
              </Grid>
              <Grid item xs={4} sx={{ marginTop: 1 }}>
                <Typography variant="caption">Interes ganado</Typography>
              </Grid>
              <Grid item xs={4} sx={{ marginTop: 1 }}>
                <Typography variant="caption">Tasa de interes</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>dd/mm/aaaa</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>$ 0</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography>0%</Typography>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
        <Button
            type="submit"
            disabled={!responseData}
            variant="contained"
            fullWidth
            onClick={handleCreateFixedTerm}
            sx={{
              mt: 2,
              color: "#fff",
            }}
          >
          Crear Plazo fijo
          </Button>
        </Grid>

      </Grid>
    </Container>
  );
};

export default SimularPlazoFijo;
