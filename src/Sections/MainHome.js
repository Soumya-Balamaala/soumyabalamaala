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
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MyImage from "@/assets/MyImage.png";

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

function MainHome({ NavSection }) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));

  const handleNav = (e, id) => {
    e.prevantDefault();
    console.log(id);
  };

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
            I am a professional React.js Developer with 3.4 years of experience,
            specializing in frontend development using React.js, Material UI,
            TypeScript and Next.js. I am also a beginner in Node.js, and React
            Native, with a strong desire to expand my skills in full-stack
            development.
          </Typography>
          <PrimaryButton
            buttonName="Hire Me"
            type="button"
            handleClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
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
            mt: isMobile ? null : "50px",
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
              overflow: "hidden",
              // mt:isMobile ? null :"40px",
            }}
            component={motion.div}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <Image
              src={MyImage}
              alt="Soumya Balamaala a React JS Developer"
              layout="intrinsic"
            />
          </Stack>
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default MainHome;
