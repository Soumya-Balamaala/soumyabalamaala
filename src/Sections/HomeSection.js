import { Box, Stack } from "@mui/material";
import React from "react";
import container from "../styles/Container.module.css";

function HomeSection() {
  return (
    <Box className={container.contentcontainer} id="home">
      <Box className={container.extrapx} />
      Home
    </Box>
  );
}

export default HomeSection;
