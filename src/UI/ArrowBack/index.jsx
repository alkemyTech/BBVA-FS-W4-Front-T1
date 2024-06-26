import { Box, Container, Tooltip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ArrowBackComponent = ({ disabled = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDestination = useSelector(
    (state) => state.transfer.selectedDestination
  );

  const handleClick = () => {
    if (disabled) return;
    if (location.pathname === "/transferencia" && !selectedDestination) {
      navigate(-2);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <Tooltip title="Ir atrás">
        <ArrowBack
          onClick={handleClick}
          style={{ cursor: disabled ? "default" : "pointer" }}
          fontSize="large"
        />
      </Tooltip>
    </>
  );
};

export default ArrowBackComponent;
