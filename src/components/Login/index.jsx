import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Alert, Divider, IconButton, InputAdornment } from "@mui/material";
import { postLogin } from "../../api/auth.js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        const response = await dispatch(postLogin(email, password));
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        setShowAuthError(true);
        setEmail("");
        setPassword("");
        setLoginError(error.message);
        console.error("Error during login:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    }
  };

  return (
    <Grid
      container
      rowSpacing={3}
      sx={{
        margin: "0 auto",
        bgcolor: "#fff",
        width: 480,
        p: 5,
        borderRadius: 5,
        boxShadow: 3,
        display: "flex",
      }}
      onSubmit={handleLogin}
      onKeyDown={handleKeyEnter}
    >
      <Grid item xs={12}>
        <img src="https://i.ibb.co/qn2SwBB/LOGO-SIN-FONDO.png" alt="Logo" />
      </Grid>
      <Grid item xs={12}>
        <Typography component="h1" variant="h5">
          Hola, Bienvenido 👋
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Correo electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
          disabled={loading}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Contraseña"
          name="password"
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
                  tabIndex={-1}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          disabled={loading}
        />
      </Grid>
      {showAuthError && (
        <Grid item xs={12}>
          <Alert severity="error">{loginError}</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs>
        <Typography variant="body1" textAlign={"center"}>
          ¿No tenés una cuenta?
        </Typography>
        <Typography variant="body1" textAlign={"center"}>
          <Link
            href="/register"
            variant="button"
            underline="none"
            sx={{ color: "#5B67E5" }}
          >
            Registrate
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
