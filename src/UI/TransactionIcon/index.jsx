import { Box } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';

const TransactionIcon = ({ type }) => {
  const getColor = () => {
    if (type === "INCOME" || type === "DEPOSIT") {
      return "#4CAF50"; // Verde para success
    } else if (type === "PAYMENT") {
      return "#F44336"; // Rojo para error
    }
    return "#000"; // Color por defecto
  };

  const rgbaColor = (hex, alpha) => {
    // Convierte un color hex a rgba
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const borderColor = getColor();
  const backgroundColor = rgbaColor(borderColor, 0.2); // Fondo con opacidad del 20%

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "-8px",
        marginRight: "16px",
        padding: "4px", // Espacio interno para el icono
        backgroundColor, // Fondo con opacidad
      }}
    >
      <CreditCardIcon sx={{ color: borderColor }} />
    </Box>
  );
};

export default TransactionIcon;
