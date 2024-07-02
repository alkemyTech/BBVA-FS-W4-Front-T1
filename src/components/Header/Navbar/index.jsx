import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Grid, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../../Redux/slice/userSlice";
import { useLocation } from "react-router";

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

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

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navLinkStyles = {
    color: "#E4E4E4",
    display: "block",
    marginRight: "50px",
    fontWeight: 600,
    fontSize: 18,
    textTransform: "uppercase",
    textShadow: "0px 0px 3px #000",
    transition: "0.2s",
    "&:hover": {
      color: "#FFF",
      textShadow: "0px 0px 9px #000",
      filter: "brightness(200%)",
    },
  };

  const activeNavLinkStyles = {
    ...navLinkStyles,
    color: "#FFF",
    textShadow: "0px 0px 9px #000",
    borderBottom: "3px solid #FFF",
    filter: "brightness(200%)",

  };

  return (
    <Grid item sx={{ marginBottom: "10vh" }}>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(90deg, #472183 0%, #7045B5 100%)",
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
                href="/inicio"
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
                  style={{
                    maxWidth: "15vw",
                    filter: "drop-shadow(2px 2px 4px #000) brightness(150%)",
                  }}
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
                href="/inicio"
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
                  height: "71px",
                  paddingRight: "70px",
                  textTransform: "uppercase",
                  alignItems: "center",
                }}
              >
                <Link
                  onClick={handleCloseNavMenu}
                  href="/transferencia"
                  sx={
                    isActive("/transferencia") ||
                    isActive("/transferencia/nuevo-destino") ||
                    isActive("/transferencia/confirmar-destino") ||
                    isActive("/transferencia/enviar-dinero")
                      ? activeNavLinkStyles
                      : navLinkStyles
                  }
                  underline="none"
                >
                  Transferencias{" "}
                </Link>
                <Link
                  onClick={handleCloseNavMenu}
                  href="/plazos-fijos"
                  sx={
                    isActive("/plazos-fijos") ||
                    isActive("/crear-plazo-fijo") ||
                    isActive("/simular-plazo-fijo")
                      ? activeNavLinkStyles
                      : navLinkStyles
                  }
                  underline="none"
                >
                  Plazo fijo{" "}
                </Link>
                <Link
                  onClick={handleCloseNavMenu}
                  href="/cargar-saldo"
                  sx={
                    isActive("/cargar-saldo")
                      ? activeNavLinkStyles
                      : navLinkStyles
                  }
                  underline="none"
                >
                  Depósito{" "}
                </Link>
                <Link
                  onClick={handleCloseNavMenu}
                  href="/cargar-pago"
                  sx={
                    isActive("/cargar-pago")
                      ? activeNavLinkStyles
                      : navLinkStyles
                  }
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
                    <Avatar
                      sx={{
                        width: 45,
                        height: 45,
                        backgroundColor: "#F3B36F",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        textShadow: "0px 2px 6px #000",
                        transition: "0.2s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                      src="Imagen de usuario"
                    >
                      {user.firstName[0]}
                    </Avatar>
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
                    <Divider />
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
                      backgroundColor: "#8EB052",
                      background:
                        "linear-gradient(90deg, #CED2FF 50%, #FFF 50%)",
                      backgroundSize: "200% 100%",
                      backgroundPosition: "100% 0",
                      transition: "background-position 0.5s",
                      "&:hover": {
                        backgroundPosition: "0 0",
                        backgroundColor: "#FFF",
                      },
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
                      backgroundColor: "#8EB052",
                      background:
                        "linear-gradient(90deg, #CED2FF 50%, #FFF 50%)",
                      backgroundSize: "200% 100%",
                      backgroundPosition: "100% 0",
                      transition: "background-position 0.5s",
                      "&:hover": {
                        backgroundPosition: "0 0",
                        backgroundColor: "#FFF",
                      },
                    }}
                    underline="none"
                  >
                    Cuentas
                  </Link>
                  <Link
                    onClick={handleLogout}
                    sx={{
                      cursor: "pointer",
                      my: 1,
                      color: "black",
                      display: "block",
                      paddingLeft: "15px",
                      backgroundColor: "#8EB052",
                      background:
                        "linear-gradient(90deg, #CED2FF 50%, #FFF 50%)",
                      backgroundSize: "200% 100%",
                      backgroundPosition: "100% 0",
                      transition: "background-position 0.5s",
                      "&:hover": {
                        backgroundPosition: "0 0",
                        backgroundColor: "#FFF",
                      },
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
