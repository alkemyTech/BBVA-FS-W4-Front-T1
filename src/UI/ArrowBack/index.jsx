import React from "react";
import { Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ArrowBackComponent = ({ disabled }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!disabled) {
      navigate("/home");
    }
  };

  return (
    <Box
      onClick={handleClick}
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        margin: "1vh",
        color: disabled ? "grey" : "inherit",
      }}
    >
      <ArrowBack />
    </Box>
  );
};

export default ArrowBackComponent;
