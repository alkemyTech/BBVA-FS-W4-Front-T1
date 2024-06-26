import { Alert, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { putUpdateUser } from "../../api/User";

export default function EditarPerfil() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [birthDate, setBirthDate] = useState(dayjs(user.birthDate));
  const [gender, setGender] = useState(user.gender);
  const [documentNumber, setDocumentNumber] = useState(user.documentNumber);
  const [loading, setLoading] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [documentNumberError, setDocumentNumberError] = useState("");
  const [showAuthError, setShowAuthError] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      handleUpdate(e);
    }
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

  const validateLetters = (text) => {
    const re = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return re.test(String(text));
  };

  const validateNumbers = (number) => {
    const re = /^[0-9]+$/;
    return re.test(String(number));
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    let valid = true;

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
        setDocumentNumberError(
          "El número de documento debe contener solo números."
        );
        valid = false;
      } else if (documentNumber.length < 6 || documentNumber.length > 12) {
        setDocumentNumberError(
          "El número de documento debe contener entre 6 y 12 caracteres."
        );
        valid = false;
      } else {
        setDocumentNumberError("");
      }

      if (valid) {
        console.log({
          firstName: firstName,
          lastName: lastName,
          birthDate: birthDate,
          gender: gender,
          documentNumber: documentNumber,
        });
        setLoading(true);
        try {
            const response = await dispatch(
                putUpdateUser(
                    user.idUser,
                  firstName,
                  lastName,
                  birthDate,
                  gender,
                  documentNumber,
                )
              );
              if (response) {
                navigate("/perfil");
              }
            } catch (error) {
                setShowAuthError(true);
                setUpdateError(error.message)
                console.error("Error during update:", error);
              } finally {
                setLoading(false); // Finaliza la carga
              }
            }
  };
  return (
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
        marginTop: 3,
      }}
      //   onSubmit={handleRegister}
        onKeyDown={handleKeyEnter}
    >
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <Typography component="h1" variant="h5">
          Actualizar datos
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          required
          fullWidth
          label="Nombre/s"
          name="firstName"
          autoComplete="firstName"
          variant="standard"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={Boolean(firstNameError)}
          helperText={firstNameError}
          onKeyDown={handleInputRestriction("a-zA-ZáéíóúÁÉÍÓÚñÑ ")}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          required
          fullWidth
          label="Apellido/s"
          name="lastName"
          autoComplete="lastName"
          variant="standard"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
            error={Boolean(lastNameError)}
            helperText={lastNameError}
            onKeyDown={handleInputRestriction("a-zA-ZáéíóúÁÉÍÓÚñÑ ")}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <DatePicker
          label="Fecha de nacimiento"
          value={birthDate}
          onChange={(e) => setBirthDate(e)}
          slotProps={{
            textField: {
              required: true,
              fullWidth: true,
              variant: "standard",
            },
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          select
          required
          fullWidth
          label="Género"
          name="gender"
          autoComplete="gender"
          variant="standard"
          value={gender}
          onChange={(e) => setGender(e.target.value)}

        >
          <MenuItem value="FEMALE">Femenino</MenuItem>
          <MenuItem value="MALE">Masculino</MenuItem>
          <MenuItem value="NON_BINARY">No Aclara</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          select
          disabled
          fullWidth
          label="Tipo de documento"
          name="documentType"
          variant="standard"
          value={user.documentType}
        >
          <MenuItem value="DNI">DNI</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 3 }}>
        <TextField
          required
          fullWidth
          label="Número de documento"
          name="documentNumber"
          autoComplete="documentNumber"
          variant="standard"
          value={documentNumber}
          onChange={(e) => setDocumentNumber(e.target.value)}
            error={Boolean(documentNumberError)}
            helperText={documentNumberError}
            onKeyDown={handleInputRestriction("0-9")}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          disabled
          fullWidth
          label="Correo electronico"
          name="email"
          autoComplete="email"
          variant="standard"
          value={user.email}
        />
      </Grid>
      {showAuthError && (
        <Grid item xs={12}>
          <Alert severity="error">
            {updateError}
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleUpdate}
        >
          {loading ? "Cargando..." : "Actualizar"}
        </Button>
      </Grid>
    </Grid>
  );
}
