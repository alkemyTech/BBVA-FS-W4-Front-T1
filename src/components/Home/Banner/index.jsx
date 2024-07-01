import React from "react";
import Slider from "react-slick";
import { Typography, Grid, Link, Fade } from "@mui/material";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  return (
    <Slider {...settings}>
      <Link href="/cargar-pago" underline="none">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: "#9678cd",
            borderRadius: 8,
            height: "134px",
          }}
        >
          <Typography variant="h5" color="white">
            ¡Durante la Copa América pagá con descuentos!
          </Typography>
          <img
            src="src\assets\toppng.com-copa-america-usa-2024-official-logo-4006x3355.png"
            alt=""
            style={{ maxWidth: "160px" }}
          />
        </Grid>
      </Link>
      <Link href="/crear-plazo-fijo" underline="none">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            background:
              "linear-gradient(180deg, #74ACDF 0%, #74ACDF 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #74ACDF 66.66%, #74ACDF 100%)",
            borderRadius: 8,
            height: "134px",
          }}
        >
          <Typography variant="h5" color="black">
            ¡Hacé como el diez e invertí en Magic Dogs!
          </Typography>
          <img
            src="src\assets\pngwing.com (1).png"
            alt=""
            style={{ marginLeft: 25, maxWidth: "120px" }}
          />
        </Grid>
      </Link>
    </Slider>
  );
};

export default Banner;
