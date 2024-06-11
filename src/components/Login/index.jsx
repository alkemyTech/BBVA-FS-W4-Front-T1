import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { postLogin } from "../../api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);

  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Por favor, ingrese un correo electrónico válido.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      //TODO: En el back tenemos como seeder user0, user1, ...
      setPasswordError("La contraseña debe tener al menos 4 caracteres.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      console.log({
        email: email,
        password: password,
      });
      setLoading(true);
      try {
        const response = await postLogin(email, password);
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        if (error.message === "Email o contraseña inválidos") {
          setSnackbarMessage(error.message);
          setSnackbarOpen(true);
          setEmail('');
          setPassword('');
        }
        console.error("Error during login:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        margin: "0 auto",
        bgcolor: "#fff",
        width: 500,
        p: 5,
        borderRadius: 5,
        boxShadow: 3,
        display: "flex",
      }}
    >
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <Avatar sx={{ margin: "0 auto", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <Typography component="h1" variant="h5">
          Hola, Bienvenido 👋
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
        />
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <TextField
          required
          fullWidth
          name="password"
          label="Contraseña"
          id="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(passwordError)}
          helperText={passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2, backgroundColor: "#472183"}}
          onClick={handleLogin}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <Divider />
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: "0px !important" }}>
        <Link href="#" variant="body2">
          {"¿No tienes una cuenta? Registrate"}
        </Link>
      </Grid>
      <Snackbar //TODO: change to MySnackBar when it is implemented
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Login;
