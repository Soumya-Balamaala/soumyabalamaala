// import React from 'react'

"use client";

import { Box, Stack, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { NavData } from "@/mock/Navigations";

import Link from "next/link";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  return (
    <Header>
      {isMobile ? <Responsive>Responsive</Responsive> : null}
      <LogoContainer>Logo</LogoContainer>
      <Navlist>
        {NavData.map((item) => {
          if (!item.path) {
            console.warn(`Missing path for navigation item: ${item.title}`);
            return null; // Skip items without a path
          }

          return (
            <Navitem key={item.id}>
              <Navlink href={item.path}>{item.title}</Navlink>
            </Navitem>
          );
        })}
      </Navlist>
    </Header>
  );
}

export default Navbar;


const Header = styled("nav")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "80px",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000, // Ensure the navbar stays above other elements
  backdropFilter: "blur(12px)", // Blurring the background
  backgroundColor: "transparent", // Fully transparent background
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border for depth
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for elevation
  padding: "0 20px",
  transition: "all 0.3s ease-in-out",
  backdropSaturation: "180%", // Optional: Enhance saturation effect for more depth
}));





const Responsive = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "26px",
}));

const Navlist = styled("ul")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px",

  [theme.breakpoints.between("xs", "md")]: {
    top: "80px", display:"none"
  }
}));

const Navitem = styled("li")(({ theme }) => ({
  listStyle: "none",
  padding: "8px",
}));

const Navlink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

export const MainSection = styled("section")(({ theme, mainheight }) => ({
  width: "100%",
  height: mainheight,
  // backgroundColor: theme.palette.background.main,
  backdropFilter: "blur(8px)", // Blurring the background
  backgroundColor: "transparent", // Fully transparent background
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)", // Subtle border for depth
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow for elevation
  // padding: "0 20px",
  transition: "all 0.3s ease-in-out",
  backdropSaturation: "180%",
  display: "flex",
  alignItems: "center",
  justifyContent:"center"
  
}));
