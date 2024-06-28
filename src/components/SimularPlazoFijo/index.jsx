import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  setSelectedDay,
  setSimulatedFixedTerm,
} from "../../Redux/slice/fixedTermSlice";
import ArrowBackComponent from "../../UI/ArrowBack";
import { simulateFixedTerm } from "../../api/FixedTerm";

const SimularPlazoFijo = () => {
  const [amount, setAmount] = useState("");
  const [selectedDays, setSelectedDays] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [closingDate, setClosingDate] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const today = new Date();
  const minDate = dayjs(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateFixedTerm = () => {
    const simulatedFixedTerm = {
      amount,
      closingDate,
    };
    dispatch(setSimulatedFixedTerm(simulatedFixedTerm));
    dispatch(setSelectedDay(Object.keys(selectedDays)[0]))
    navigate("/crear-plazo-fijo");
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
    handleDayClick("30")
  }, [])
  
  useEffect(() => {
    if (amount && closingDate) {
      fetchData();
    }
  }, [amount, closingDate]);

  return (
    <Container>
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
          <NumericFormat
            label="Monto"
            value={amount}
            onValueChange={({ floatValue }) =>
              setAmount(floatValue !== undefined ? floatValue.toFixed(2) : "")
            }
            customInput={TextField}
            thousandSeparator={"."}
            decimalSeparator={","}
            allowNegative={false}
            prefix={"$ "}
            decimalScale={2}
            fixedDecimalScale={true}
            fullWidth
            required
            error={parseFloat(amount.replace(",", ".")) <= 0}
            helperText={
              parseFloat(amount.replace(",", ".")) <= 0
                ? "El monto debe ser mayor a cero"
                : ""
            }
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
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", 
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", 
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
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
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
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
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
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
              color: "#5B67E5",
              borderColor: "#5B67E5",
              "&.MuiButton-contained": {
                bgcolor: "#5B67E5",
                color: "#ffffff", // or any other color you want for the text
              },
              "&.MuiButton-outlined": {
                bgcolor: "#ffffff",
                color: "#5B67E5", // or any other color you want for the text
              },
              "&:hover": {
                backgroundColor: "#5B67E5",
                borderColor: "#5B67E5",
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
          {!showDatePicker && closingDate && (
            <DatePicker
              sx={{ marginBottom: 1 }}
              disabled
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
                  $
                  {responseData.amountTotalToReceive.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
                  ${" "}
                  {responseData.interestTotal.toLocaleString("es-AR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
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
