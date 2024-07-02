import { Grid, Box, Typography, Link } from "@mui/material";
import "./index.css";
import { Copyright } from "@mui/icons-material";
import { useSelector } from "react-redux";

const Footer = () => {
  const token = useSelector((state) => state.user.token);

  return (
    <>
      {token && (
        <Grid minHeight={"25vh"}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            className="footer-container"
            height={"25vh"}
          >
            <Grid container className="container">
              <Grid container p={1}>
                <Grid item xs={8}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                  >
                    <Link sx={{ color: "#FFF" }} underline="none">
                      <Typography
                        variant="subtitle1"
                        sx={{ textShadow: "0 0 5px black" }}
                      >
                        Redes sociales
                      </Typography>
                    </Link>
                    <Link sx={{ color: "#FFF" }} underline="none">
                      <Typography
                        variant="subtitle1"
                        sx={{ textShadow: "0 0 5px black" }}
                      >
                        Contacto
                      </Typography>
                    </Link>
                    <Link
                      sx={{ color: "#FFF" }}
                      href="/perfil"
                      underline="none"
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ textShadow: "0 0 5px black" }}
                      >
                        Mi cuenta
                      </Typography>
                    </Link>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box display="flex" justifyContent="flex-end">
                    <img
                      src="https://i.ibb.co/nwf2QBf/patita-blanca.png"
                      alt="Logo"
                      style={{
                        height: "75px",
                        filter:
                          "drop-shadow(2px 2px 4px #000) brightness(150%)",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} pt={2}>
                  <Box display="flex" justifyContent="center">
                    <Typography
                      variant="body2"
                      align="center"
                      sx={{ textShadow: "0 0 5px black" }}
                    >
                      Copyright © 2024 - Magic Dogs Alkywall
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}{" "}
      {!token && (
        <Grid
          container
          alignItems="center"
          className="footer-container"
          sx={{
            background: "#F1F6F5",
            color: "#472183",
            minHeight: "10vh",
          }}
          height={"10vh"}
        >
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              <Copyright sx={{ fontSize: 20 }} />
              Copyright © 2024 - Magic Dogs Alkywall
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Footer;
