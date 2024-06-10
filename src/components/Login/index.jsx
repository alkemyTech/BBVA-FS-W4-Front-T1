import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, IconButton, InputAdornment, Paper } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { postLogin } from "../../backend";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log({
      email: email,
      password: password,
    });
    postLogin(email, password);
    navigate("/")
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 5, width: "100%", maxWidth: 400, justifyContent: "center" }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
          </Box>
          <Typography component="h1" variant="h5">
            <span>Hola, Bienvenido</span> <span>👋</span>
          </Typography>
          <Grid component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 3 }} />
          </Grid>
          <Grid item>
            {/* TODO: Redireccionar a /register */}
            <Link href="#" variant="body2">
              {"¿No tienes una cuenta? Registrate"}
            </Link>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
