"use client";

import { MainSection } from "@/components/Navbar";
import TypewriterEffect from "@/components/TypeWriteEffect";
import { programmingLanguages } from "@/mock/Navigations";
import PrimaryButton from "@/styles/Buttons/PrimaryButton";
import Image from "next/image";
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
    <MainSection mainheight={isMobile ? "auto" : "100vh"}>
      {/* <Stack sx={{height:"60px"}} /> */}
      {isMobile ? <Stack sx={{ height: "80px" }} /> : null}
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
          height: isMobile ? "auto" : "inherit",
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
            padding: "12px",
            gap: "10px",
            mt: isMobile ? null : "60px",
          }}
          xs={12}
          md={6.5}
        >
          <Typography
            variant="body1"
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Hello, I'm
          </Typography>
          <TypewriterEffect text="Soumya Balamaala" />
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Frontend Developer
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: isMobile ? "justify" : "left" }}
          >
            I’m a React.js Developer with 3.4 years of experience in frontend
            development, specializing in React.js, Material UI, Next.js,
            TypeScript, Node.js, and Express. I’m excited to transition to
            full-stack development.
          </Typography>
          <PrimaryButton type="button" buttonName="Hire Me" />
          <Grid
            item
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              flexWrap: "wrap",
              mt: "20px",
            }}
          >
            {programmingLanguages.map((item) => (
              <Grid
                sx={{
                  height: "auto",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width="60px"
                  height="60px"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "1px solid blue",
            height: "auto",
            mt: "50px",
          }}
          xs={12}
          md={4}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: isMobile ? "300px" : "400px",
              height: isMobile ? "300px" : "400px",
              overflow: "hidder",
              bgcolor: "primary.main",
              borderRadius: "50%",
              mt: "40px",
            }}
          >
            Image
          </Stack>
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default MainHome;
