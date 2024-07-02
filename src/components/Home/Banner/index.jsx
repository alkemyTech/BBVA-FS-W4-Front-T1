import Slider from "react-slick";
import { Typography, Grid, Link } from "@mui/material";
import "./index.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          opacity: 1,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          opacity: 1,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: "10px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="banner-slider" style={{ borderRadius: "32px" }}>
      <Slider className="banner-slider" {...settings}>
        <Link href="/cargar-pago" underline="none">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              background: "linear-gradient(90deg, #9678cd 0%, #E0D3F7 100%)",
              borderRadius: 8,
              height: "134px",
              textShadow: "0px 0px 5px #000",
            }}
          >
            <Typography variant="h5" color="white">
              ¡Durante la Copa América 10% de reintegro en tus pagos!
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
    </div>
  );
};

export default Banner;
