"use client";

import { Button } from "@mui/material";
import React from "react";

function PrimaryButton({ buttonName, type }) {
  return (
    <Button
      variant="contained"
      type={type}
      sx={{
        textTransform: "capitalize",
        width:"200px",
        
      }}
    >
      {buttonName}
    </Button>
  );
}

export default PrimaryButton;