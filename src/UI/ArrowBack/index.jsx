import { Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ArrowBackComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );

  const handleClick = () => {
    if (location.pathname === "/transferencia" && !selectedDestination) {
      navigate(-2);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      onClick={handleClick}
      style={{ cursor: "pointer", position: "absolute", margin: "2.5vh" }}
    >
      <ArrowBack />
    </Box>
  );
};

export default ArrowBackComponent;
