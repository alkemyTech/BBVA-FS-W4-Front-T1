import { Tooltip } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ArrowBackComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Tooltip title="Ir atrás">
      <ArrowBack
        onClick={handleClick}
        style={{ cursor: "pointer" }}
        fontSize="large"
      />
    </Tooltip>
  );
};

export default ArrowBackComponent;
