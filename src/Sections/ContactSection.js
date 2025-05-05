import { Box } from "@mui/material";
import React from "react";
import container from "../styles/Container.module.css";

function ContactSection() {
  return (
    <Box className={container.contentcontainer} id="contact">
      <Box className={container.extrapx} />
      <Box className={container.innercontent}>Contact</Box>
    </Box>
  );
}

export default ContactSection;
