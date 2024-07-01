import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import {
  Alert,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { postRegister } from "../../api/Auth.js";
import { useDispatch } from "react-redux";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [gender, setGender] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [documentTypeError, setDocumentTypeError] = useState("");
  const [documentNumberError, setDocumentNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const birthDateRef = useRef();
  const genderRef = useRef();
  const documentTypeRef = useRef();
  const documentNumberRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      handleRegister(e);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateLetters = (text) => {
    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return re.test(String(text));
  };

  const validateNumbers = (number) => {
    const re = /^[0-9]+$/;
    return re.test(String(number));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    let valid = true;
    let firstInvalidRef = null;

    if (!firstName) {
      setFirstNameError("El nombre es obligatorio.");
      if (!firstInvalidRef) firstInvalidRef = firstNameRef;
      valid = false;
    } else if (!validateLetters(firstName)) {
      setFirstNameError("El nombre debe contener solo letras.");
      if (!firstInvalidRef) firstInvalidRef = firstNameRef;
      valid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("El apellido es obligatorio.");
      if (!firstInvalidRef) firstInvalidRef = lastNameRef;
      valid = false;
    } else if (!validateLetters(lastName)) {
      setLastNameError("El apellido debe contener solo letras.");
      if (!firstInvalidRef) firstInvalidRef = lastNameRef;
      valid = false;
    } else {
      setLastNameError("");
    }

    if (!birthDate) {
      setBirthDateError("La fecha de nacimiento es obligatoria.");
      if (!firstInvalidRef) firstInvalidRef = birthDateRef;
      valid = false;
    } else {
      setBirthDateError("");
    }

    if (!gender) {
      setGenderError("El género es obligatorio.");
      if (!firstInvalidRef) firstInvalidRef = genderRef;
      valid = false;
    } else {
      setGenderError("");
    }

    if (!documentType) {
      setDocumentTypeError("El tipo de documento es obligatorio.");
      if (!firstInvalidRef) firstInvalidRef = documentTypeRef;
      valid = false;
    } else {
      setDocumentTypeError("");
    }

    if (!documentNumber) {
      setDocumentNumberError("El número de documento es obligatorio.");
      if (!firstInvalidRef) firstInvalidRef = documentNumberRef;
      valid = false;
    } else if (!validateNumbers(documentNumber)) {
      setDocumentNumberError(
        "El número de documento debe contener solo números."
      );
      if (!firstInvalidRef) firstInvalidRef = documentNumberRef;
      valid = false;
    } else if (documentNumber.length < 6 || documentNumber.length > 12) {
      setDocumentNumberError(
        "El número de documento debe contener entre 6 y 12 caracteres."
      );
      if (!firstInvalidRef) firstInvalidRef = documentNumberRef;
      valid = false;
    } else {
      setDocumentNumberError("");
    }

    if (!email) {
      setEmailError("El correo electrónico es obligatorio.");
      if (!firstInvalidRef) firstInvalidRef = emailRef;
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Por favor, ingrese un correo electrónico válido.");
      if (!firstInvalidRef) firstInvalidRef = emailRef;
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("La contraseña es obligatoria.");
      if (!firstInvalidRef) firstInvalidRef = passwordRef;
      valid = false;
    } else if (
      !/^(?=.*[A-Z])(?=.*[@#.!¡?¿$%^&+=])(?=.*\d).{8,}$/.test(password) ||
      password.length < 8
    ) {
      setPasswordError(
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo."
      );
      if (!firstInvalidRef) firstInvalidRef = passwordRef;
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("La contraseña es obligatoria.");
      if (!firstInvalidRef) firstInvalidRef = confirmPasswordRef;
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden.");
      if (!firstInvalidRef) firstInvalidRef = confirmPasswordRef;
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (valid) {
      setLoading(true);
      try {
        const response = await dispatch(
          postRegister(
            firstName,
            lastName,
            birthDate,
            gender,
            documentType,
            documentNumber,
            email,
            password
          )
        );
        if (response) {
          navigate("/inicio");
        }
      } catch (error) {
        setShowAuthError(true);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRegisterError(error.message);
        console.error("Error during register:", error);
      } finally {
        setLoading(false); // Finaliza la carga
      }
    } else {
      // Redirige al primer campo inválido
      firstInvalidRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstInvalidRef.current.focus();
    }
  };

  return (
    <Grid container sx={{backgroundColor: "#F1F6F5", padding:5}}>
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
        onSubmit={handleRegister}
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
            label="Nombre/s"
            name="firstName"
            autoComplete="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={Boolean(firstNameError)}
            helperText={firstNameError}
            inputRef={firstNameRef}
            onKeyDown={handleInputRestriction("a-zA-ZáéíóúÁÉÍÓÚñÑ ")}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Apellido/s"
            name="lastName"
            autoComplete="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={Boolean(lastNameError)}
            helperText={lastNameError}
            inputRef={lastNameRef}
            onKeyDown={handleInputRestriction("a-zA-ZáéíóúÁÉÍÓÚñÑ ")}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Fecha de nacimiento"
            value={birthDate}
            maxDate={dayjs()}
            onChange={(e) => setBirthDate(e)}
            slotProps={{
              textField: {
                required: true,
                fullWidth: true,
                error: Boolean(birthDateError),
                helperText: birthDateError,
                inputRef: birthDateRef,
              },
            }}
            disabled={loading}
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
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            error={Boolean(genderError)}
            helperText={genderError}
            inputRef={genderRef}
            disabled={loading}
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
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            error={Boolean(documentTypeError)}
            helperText={documentTypeError}
            inputRef={documentTypeRef}
            disabled={loading}
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
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            error={Boolean(documentNumberError)}
            helperText={documentNumberError}
            inputRef={documentNumberRef}
            onKeyDown={handleInputRestriction("0-9")}
            disabled={loading}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(emailError)}
            helperText={emailError}
            inputRef={emailRef}
            onKeyDown={handleInputRestriction("0-9a-zA-ZñÑ.@_-")}
            disabled={loading}
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
            inputRef={passwordRef}
            onKeyDown={handleInputRestriction("0-9a-zA-ZñÑ._-@#$%^&+=")}
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
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Repetir Contraseña"
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="current-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={Boolean(confirmPasswordError)}
            helperText={confirmPasswordError}
            inputRef={confirmPasswordRef}
            onKeyDown={handleInputRestriction("0-9a-zA-ZñÑ._-@#$%^&+=")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            disabled={loading}
          />
        </Grid>
        {showAuthError && (
          <Grid item xs={12}>
            <Alert severity="error">{registerError}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            {loading ? "Cargando..." : "Registrarse"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs>
          <Typography variant="body1" textAlign={"center"}>
            ¿Ya tenés una cuenta?
          </Typography>
          <Typography variant="body1" textAlign={"center"}>
            <Link
              href="/"
              variant="button"
              underline="none"
              sx={{ color: "#5B67E5" }}
            >
              Iniciá sesión
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
