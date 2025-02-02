"use client";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function PrimaryButton({ buttonName, type }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <Button
      component={motion.button}
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
      variant="contained"
      type={type}
      sx={{
        textTransform: "capitalize",
        width: isMobile ? "auto" : "200px",
        "&:hover": {
          backgroundColor:"primary.main"
        }
      }}
    >
      {buttonName}
    </Button>
  );
}

export default PrimaryButton;
