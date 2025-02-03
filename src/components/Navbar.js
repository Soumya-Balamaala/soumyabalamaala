"use client";

import { Box, Stack, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { NavData } from "@/mock/Navigations";
import { useRef } from "react";
import Link from "next/link";

function Navbar({ sectionrefs }) {
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
      {isMobile && <Responsive>Responsive</Responsive>}
      <LogoContainer>Logo</LogoContainer>
      <Navlist>
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
}));

const Responsive = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px",
});

const LogoContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "26px",
});

const Navlist = styled("ul")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "18px",

  [theme.breakpoints.between("xs", "md")]: {
    display: "none",
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
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const MainSection = styled("section")(({ mainheight ,theme}) => ({
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
  flexDirection:'column'
}));
