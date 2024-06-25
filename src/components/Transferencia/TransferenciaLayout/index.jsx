import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import { clearSelectedDestination } from "../../../Redux/slice/transferSlice";

const TransferenciaLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSelectedDestination());
    };
  }, [dispatch]);

  return (
    <Grid container>
      <Outlet />
    </Grid>
  );
};

export default TransferenciaLayout;
