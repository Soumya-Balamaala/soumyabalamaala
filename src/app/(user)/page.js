// import { Metadata } from 'next'
"use client";

import Navbar from "@/components/Navbar";
import About from "@/Sections/About";
import Contact from "@/Sections/Contact";
import EduExp from "@/Sections/EduExp";
import MainHome from "@/Sections/MainHome";
import Services from "@/Sections/Services";
import { CustomTheme } from "@/styles/customTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useRef } from "react";
// import { CustomTheme } from "@/styles/customTheme";

export default function Home() {
  
  return (
    <ThemeProvider theme={CustomTheme}>
      <Navbar />
      <MainHome />
      <About  />
      <EduExp />
      <Services  />
      <Contact  />
    </ThemeProvider>
  );
}
