import React from "react";
import nav from "../../styles/Navbar.module.css";
import { Box } from "@mui/material";
import Link from "next/link";
import { NavData } from "@/mock/Navigations";
import { FiMenu, FiX } from "react-icons/fi";

const UserNavbar = ({ click, openMenu, closeMenu }) => {
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box component="header" className={nav.header}>
      <Box component="nav" className={nav.navdata}>
        <Box>Logo</Box>
        <Box
          component="ul"
          className={click ? `${nav.navlist} ${nav.navlistopen}` : nav.navlist}
        >
          {NavData.map((item) => {
            return (
              <Box key={item.id} component="li" className={nav.navitem}>
                <Link
                  href={item.path || "/"}
                  className={nav.navlink}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.aid);
                    closeMenu();
                  }}
                >
                  {item.title}
                </Link>
              </Box>
            );
          })}
        </Box>
        <Box className={nav.menubars} onClick={openMenu}>
          {click ? <FiX /> : <FiMenu />}
        </Box>
      </Box>
    </Box>
  );
};

export default UserNavbar;
