import MenuIcon from "@mui/icons-material/Menu";
import { Grid, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../Redux/slice/userSlice";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <Grid
      item
      sx={{ marginBottom: "10vh" }}
    >
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#472183",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container className="container">
          <Grid container p={1}>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/*Logo*/}
              <Grid
                item
                variant="h6"
                component="a"
                href="/home"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  src="https://i.ibb.co/pQnLqjn/LOGO-SIN-FONDO-letras-blancas-POSTA.png"
                  style={{ maxWidth: "15vw" }}
                />
              </Grid>
              {/*Menu Hambur pantalla chica*/}
              <Grid
                item
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                {/*Menu Hambur icono*/}
                <IconButton
                  size="large"
                  onClick={handleOpenNavMenu}
                  sx={{ color: "white" }}
                >
                  <MenuIcon />
                </IconButton>
                {/*Menu Hambur opciones*/}
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  <Link
                    onClick={handleCloseNavMenu}
                    href="/transferencia"
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      pl: 1.5,
                      pr: 1.5,
                    }}
                    underline="none"
                  >
                    Transferencias{" "}
                  </Link>
                  <Link
                    onClick={handleCloseNavMenu}
                    href="/plazos-fijos"
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      pl: 1.5,
                      pr: 1.5,
                    }}
                    underline="none"
                  >
                    Plazo fijo{" "}
                  </Link>
                  <Link
                    onClick={handleCloseNavMenu}
                    href="/cargar-saldo"
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      pl: 1.5,
                      pr: 1.5,
                    }}
                    underline="none"
                  >
                    Deposito{" "}
                  </Link>
                  <Link
                    onClick={handleCloseNavMenu}
                    href="/cargar-pago"
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      pl: 1.5,
                      pr: 1.5,
                    }}
                    underline="none"
                  >
                    Pago{" "}
                  </Link>
                </Menu>
              </Grid>
              {/*Logo y nombre pantalla chica*/}
              <Grid
                item
                variant="h5"
                component="a"
                href="/Home"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <img
                  src="https://i.ibb.co/pQnLqjn/LOGO-SIN-FONDO-letras-blancas-POSTA.png"
                  style={{ maxWidth: "220px", width: "50vw" }}
                />
              </Grid>
              {/*Navbar opciones pantalla grande*/}
              <Grid
                item
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  justifyContent: "flex-end",
                  paddingRight: "80px",
                  textTransform: "uppercase",
                }}
              >
                <Link
                  onClick={handleCloseNavMenu}
                  href="/transferencia"
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    padding: "6px 30px",
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 5,
                    "&:hover": { backgroundColor: "#50298E", transition: "0.5s" },
                  }}
                  underline="none"
                >
                  Transferencias{" "}
                </Link>
                <Link
                  onClick={handleCloseNavMenu}
                  href="/plazos-fijos"
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    padding: "6px 30px",
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 5,
                    "&:hover": { backgroundColor: "#50298E", transition: "0.5s" },
                  }}
                  underline="none"
                >
                  Plazo fijo{" "}
                </Link>
                <Link
                  onClick={handleCloseNavMenu}
                  href="/cargar-saldo"
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    padding: "6px 30px",
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 5,
                    "&:hover": { backgroundColor: "#50298E", transition: "0.5s" },
                  }}
                  underline="none"
                >
                  Deposito{" "}
                </Link>
                <Link
                  onClick={handleCloseNavMenu}
                  href="/cargar-pago"
                  sx={{
                    my: 1,
                    color: "white",
                    display: "block",
                    padding: "6px 30px",
                    fontWeight: 600,
                    fontSize: 18,
                    borderRadius: 5,
                    "&:hover": { backgroundColor: "#50298E", transition: "0.5s" },
                  }}
                  underline="none"
                >
                  Pago{" "}
                </Link>
              </Grid>
              {/*Perfil usuario pantalla grande*/}
              <Grid item sx={{ flexGrow: 0 }}>
                {/*Foto perfil pantalla grande*/}
                <Tooltip title="Mi perfil">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ "&:hover": { backgroundColor: "rgb(130,130,130)", transition: "0.5s" } }} src="Imagen de usuario">{user.firstName[0]}</Avatar>
                  </IconButton>
                </Tooltip>
                {/*Menu usuario*/}
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Typography
                    sx={{
                      my: 1,
                      color: "grey",
                      display: "block",
                      padding: "10px 15px",
                    }}
                  >
                    {user.firstName + " " + user.lastName}
                  </Typography>
                  {/*Menu usuario opciones*/}
                  <Link
                    onClick={handleCloseUserMenu}
                    href="/perfil"
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      paddingLeft: "15px",
                    }}
                    underline="none"
                  >
                    Perfil
                  </Link>
                  <Link
                    onClick={handleCloseUserMenu}
                    href="/cuentas"
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      paddingLeft: "15px",
                    }}
                    underline="none"
                  >
                    Cuentas
                  </Link>
                  <Link
                    onClick={handleLogout}
                    sx={{
                      my: 1,
                      color: "black",
                      display: "block",
                      paddingLeft: "15px",
                      cursor: "pointer",
                    }}
                    underline="none"
                  >
                    Salir
                  </Link>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </Grid>
  );
}
