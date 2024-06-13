import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { postRegister } from "../../api/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [documentNumberError, setDocumentNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateLetters = (text) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(String(text));
  };

  const validateNumbers = (number) => {
    const re = /^[0-9]+$/;
    return re.test(String(number));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Por favor, ingrese un correo electrónico válido.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validateLetters(firstName)) {
      setFirstNameError("El nombre debe contener solo letras.");
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!validateLetters(lastName)) {
      setLastNameError("El apellido debe contener solo letras.");
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!validateNumbers(documentNumber)) {
      setDocumentNumberError("El número de documento debe contener solo números.");
      valid = false;
    } else {
      setDocumentNumberError("");
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
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        gender: gender,
        documentType: documentType,
        documentNumber: documentNumber,
        email: email,
        password: password,
      });
      setLoading(true);
      try {
        const response = await postRegister(
          firstName,
          lastName,
          birthDate,
          gender,
          documentType,
          documentNumber,
          email,
          password
        );
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        if (
          error.message === "El email ingresado ya se encuentra registrado"
        ) {
          setShowAuthError(true);
          setEmail("");
          setPassword("");
        }
        console.error("Error during register:", error);
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
        width: 500,
        p: 5,
        borderRadius: 5,
        boxShadow: 3,
        display: "flex",
      }}
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
          label="Nombre/s"
          name="firstName"
          autoComplete="firstName"
          autoFocus
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={Boolean(firstNameError)}
          helperText={firstNameError}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Apellido/s"
          name="lastName"
          autoComplete="lastName"
          autoFocus
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={Boolean(lastNameError)}
          helperText={lastNameError}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="date"
          required
          fullWidth
          label="Fecha de nacimiento"
          name="birthDate"
          autoComplete="birthDate"
          autoFocus
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          onKeyDown={(e) => e.preventDefault()}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          required
          fullWidth
          label="Género"
          name="gender"
          autoComplete="gender"
          autoFocus
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="FEMALE">Femenino</MenuItem>
          <MenuItem value="MALE">Masculino</MenuItem>
          <MenuItem value="NON_BINARY">No Aclara</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          select
          required
          fullWidth
          label="Tipo de documento"
          name="documentType"
          autoComplete="documentType"
          autoFocus
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <MenuItem value="DNI">DNI</MenuItem>
          <MenuItem value="CUIT">CUIT</MenuItem>
          <MenuItem value="CUIL">CUIL</MenuItem>
          <MenuItem value="CDI">CDI</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Número de documento"
          name="documentNumber"
          autoComplete="documentNumber"
          autoFocus
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
          error={Boolean(documentNumberError)}
          helperText={documentNumberError}
        />
      </Grid>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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
      {showAuthError && (
        <Grid item xs={12}>
          <Alert severity="error">El email ingresado ya se encuentra registrado</Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, mb: 2, backgroundColor: "#472183" }}
          onClick={handleRegister}
        >
          {loading ? "Cargando..." : "Registrarse"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Link href="/" variant="body2">
          {"¿Ya tienes una cuenta? Inicia sesión"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default Register;
