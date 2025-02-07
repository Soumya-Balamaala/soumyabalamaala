"use client";

import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { NavData } from "@/mock/Navigations";
import { useRef } from "react";
import Link from "next/link";
import Mylogo from "@/assets/MyLogo.png";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar({ click, openMenu, closeMenu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "sm"));

  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Header>
      {isMobile && (
        <Responsive onClick={openMenu}>
          {click ? <FiX /> : <FiMenu />}
        </Responsive>
      )}
      <LogoContainer>
        <Image
          src={Mylogo}
          alt="Best React js developer in the Town : Soumya Balamaala"
          width={65}
          height={65}
        />
      </LogoContainer>
      <Navlist toggle={click}>
        {NavData?.length > 0 ? (
          NavData.map((item) => {
            if (!item.path) {
              console.warn(`Missing path for navigation item: ${item.title}`);
              return null; // Skip items without a path
            }

            return (
              <Navitem key={item.id}>
                <Navlink
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.aid);
                    closeMenu();
                  }}
                >
                  {item.title}
                </Navlink>
              </Navitem>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </Navlist>
    </Header>
  );
}

export default Navbar;

// Styled Components
const Header = styled("nav")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "60px",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000,
  backdropFilter: "blur(12px)",
  backgroundColor: theme.palette.background.main || "rgba(0, 0, 0, 0.3)", // Default background
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
  padding: "0 20px",
  transition: "all 0.3s ease-in-out",
  // border:'1px solid blue'
}));

const Responsive = styled("ul")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
  cursor: "pointer",
  fontSize: "30px",
  color: theme.palette.primary.main,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "26px",
}));

const Navlist = styled("ul")(({ theme, toggle }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px",

  [theme.breakpoints.between("xs", "md")]: {
    position: "fixed",
    top: "60px",
    flexDirection: "column",
    backgroundColor: theme.palette.background.main,
    left: toggle ? 0 : "-200%",
    width: "100%",
    height: "calc(100vh - 60px)",
    alignItems: "flex-start",
    justifyContent: "start",
    transition: "1s all easeInOut",
  },
}));

const Navitem = styled("li")({
  listStyle: "none",
  padding: "8px",
});

const Navlink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main || "#fff",
  cursor: "pointer",
}));

export const MainSection = styled("section")(({ mainheight, theme }) => ({
  width: "100%",
  height: mainheight || "100vh",
  backdropFilter: "blur(8px)",
  backgroundColor: theme.palette.background.main,
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",

  [theme.breakpoints.between("md", "lg")]: {
    height: "auto",
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
}));
