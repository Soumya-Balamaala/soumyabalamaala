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
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20, // Start slightly below
  },
  visible: {
    opacity: 1,
    y: 0, // Move to its normal position
    transition: {
      duration: 0.8, // Adjust duration as needed
      ease: "easeInOut", // Adjust easing as needed
    },
  },
};

function MainHome({ ref, cref }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" : "100vh"} id="home">
      {/* <Stack sx={{height:"60px"}} /> */}
      {isMobile ? <Stack sx={{ height: "60px" }} /> : null}
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
          flexDirection: isMobile ? "column" : "row",
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
            component={motion.p}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Hello, I'm
          </Typography>
          {/* <TypewriterEffect text="Soumya Balamaala" /> */}
          <Typography
            component={motion.h2}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            // viewport={{ once: true }}
            variant="h3"
            color="primary.main"
            sx={{
              textAlign: isMobile ? "center" : "left",
              // fontSize: "40px",
            }}
          >
            Soumya Balamaala
          </Typography>
          <Typography
            component={isMobile ? motion.h5 : motion.h4}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            variant={isMobile ? "h5" : "h4"}
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Frontend Developer
          </Typography>
          <Typography
            variant="body1"
            component={motion.p}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
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
            component={motion.div} // Framer Motion wrapper for animation
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
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
                key={item.id}
                component={motion.div} // Animated item
                variants={itemVariants}
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
            mt:isMobile ? null: "50px",
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
              // mt:isMobile ? null :"40px",
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
