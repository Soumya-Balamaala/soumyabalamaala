"use client";

import { Box, Stack } from "@mui/material";
import container from "../../../styles/Container.module.css";
import nav from "../../../styles/Navbar.module.css";
import UserNavbar from "@/components/Navbars/UserNavbar";
import { useState } from "react";
import HomeSection from "@/Sections/HomeSection";
import ServicesSection from "@/Sections/ServicesSections";
import Experience from "@/Sections/Experience";
import ContactSection from "@/Sections/ContactSection";
import USP from "@/Sections/minisections/USP";
import Clients from "@/Sections/minisections/Clients";

export default function HomePage() {
  const [toggle, setToggle] = useState(false);

  const handleResponsiveMenu = () => setToggle(!toggle);

  const handleCloseResponsiveMenu = () => setToggle(false);
  return (
    <Box className={container.maincontainer}>
      <UserNavbar
        click={toggle}
        openMenu={handleResponsiveMenu}
        closeMenu={handleCloseResponsiveMenu}
      />
      <Box className={container.sectioncontainer}>
        <HomeSection />
        <Experience />
        <Clients />
        <ServicesSection />
        <USP />
        <ContactSection />
      </Box>
    </Box>
  );
}
