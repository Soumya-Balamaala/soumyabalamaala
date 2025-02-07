// import { Metadata } from 'next'
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import About from "@/Sections/About";
import Contact from "@/Sections/Contact";
import EduExp from "@/Sections/EduExp";
import MainHome from "@/Sections/MainHome";
import Services from "@/Sections/Services";
import { CustomTheme } from "@/styles/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useRef, useState } from "react";
// import { CustomTheme } from "@/styles/customTheme";

export default function Home() {
  const [toggle, setToggle] = useState(false);

  const handleResponsiveMenu = () => setToggle(!toggle);

  const handleCloseResponsiveMenu = () => setToggle(false);

  return (
    <ThemeProvider theme={CustomTheme}>
      <Navbar
        click={toggle}
        openMenu={handleResponsiveMenu}
        closeMenu={handleCloseResponsiveMenu}
      />
      <MainHome />
      <EduExp />
      <Services />
      <Contact />
      <Footer />
    </ThemeProvider>
  );
}
