import { Tooltip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ArrowBackComponent = ({ disabled = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (disabled) return;
    navigate(-1);
  };

  return (
    <>
      <Tooltip title="Ir atrás">
        <ArrowBack
          onClick={handleClick}
          style={{
            cursor: disabled ? "default" : "pointer",
            opacity: disabled ? 0.5 : 1,
          }}
          fontSize="large"
        />
      </Tooltip>
    </>
  );
};

export default ArrowBackComponent;
