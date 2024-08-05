import { Grid, Typography } from "@mui/material";
import React from "react";

const Error: React.FC = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", backgroundColor: "#fff" }}
    >
      <Typography variant="h4" color="black">
        Error - 404 Not Found
      </Typography>
    </Grid>
  );
};

export default Error;
