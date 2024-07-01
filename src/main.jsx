import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

const theme = createTheme({
  typography: {
    fontFamily: "Outfit, sans serif",
  },
  components: {
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: "#472183", // Color de la barra de progreso
        },
        colorPrimary: {
          backgroundColor: "#A280D8", // Color de fondo de la barra de progreso
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "#FFF",
          background: "linear-gradient(90deg, #5B67E5 50%, #6B77FF 50%)",
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0",
          transition: "background-position 0.5s",
          "&:hover": {
            backgroundPosition: "0 0",
            backgroundColor: "#FFF", // Esto es necesario para mantener el color de fondo
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#5B67E5",
          "--TextField-brandBorderHoverColor": "#6B77FF",
          "--TextField-brandBorderFocusedColor": "#6B77FF",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          "&::before, &::after": {
            borderBottom: "1px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "1px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottom: "1px solid var(--TextField-brandBorderColor)",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "1px solid var(--TextField-brandBorderHoverColor)",
          },
          "&.Mui-focused:after": {
            borderBottom: "2px solid var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"es"}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </LocalizationProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
