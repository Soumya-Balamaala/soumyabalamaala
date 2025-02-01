"use client";

import { MainSection } from "@/components/Navbar";
import TypewriterEffect from "@/components/TypeWriteEffect";
import PrimaryButton from "@/styles/Buttons/PrimaryButton";
import {
  Button,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const commoncss = {};

function MainHome() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" :"100vh"}>
      {/* <Stack sx={{height:"cal"}} /> */}
      {isMobile ? <Stack sx={{height:"80px"}} /> : null}
      <Grid
        container
        rowGap={2}
        columnGap={2}
        sx={{
          width: "100%",
          padding: "16px",
          display: "flex",
          alignItems: "left",
          justifyContent: "center",
          height:isMobile ? "auto" : "inherit",
          flexDirection: isMobile ? "column-reverse" : "row",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            flexDirection: "column",
            // border: "1px solid blue",
            height: "auto ",
            padding: "20px",
            gap: "10px",
          }}
          xs={12}
          md={6.5}
        >
          <Typography variant="body1">Hello, I'm</Typography>
          <TypewriterEffect text="Soumya Balamaala" />
          <Typography variant="body1">
            I’m a React.js Developer with 3.4 years of experience in frontend
            development, specializing in React.js, Material UI, Next.js,
            TypeScript, Node.js, and Express. I’m excited to transition to
            full-stack development.
          </Typography>
          <PrimaryButton type="button" buttonName="Contact Me !" />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid blue",
            height: "auto",
          }}
          xs={12}
          md={4}
        >
          Soumya
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default MainHome;
