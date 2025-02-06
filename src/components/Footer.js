"use client";

import { Stack, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        height: "60px",
        color: "secondary.main",
      }}
    >
      <Typography> Developed by Soumya Balamaala</Typography>
    </Stack>
  );
}

export default Footer;
