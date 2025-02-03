"use client"

import { createTheme } from "@mui/material";

export const CustomTheme = createTheme({
  palette: {
    primary: {
      main: "#4b0082",
    },  
    secondary: {
      main: "#f1e3d3",
    },
    background: {
      main: "#f9f3e3",
    },
    others: {
      c1: "#c58c6d",
      c2: "#ddbea9",
      c3: "#24AE70",
    },
  },
  typography: {
    fontFamily:["poppins","serif"].join()
  },
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1250,
    xs: 1500,
  },
});
