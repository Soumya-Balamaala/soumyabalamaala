"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

function PrimaryButton({ buttonName, type }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <Button
      variant="contained"
      type={type}
      sx={{
        textTransform: "capitalize",
        width: isMobile ? "auto":"200px",
        
      }}
    >
      {buttonName}
    </Button>
  );
}

export default PrimaryButton;