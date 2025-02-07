"use client";

import { MainSection, StyledButton } from "@/components/Navbar";
import { servicesdata } from "@/mock/ServicesData";
import PrimaryButton from "@/styles/Buttons/PrimaryButton";
import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function Services() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" : "100vh"} id="services">
      {isMobile ? (
        <Stack sx={{ height: "80px" }} />
      ) : (
        <Stack sx={{ height: "60px" }} />
      )}

      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            alignItems: isMobile ? "center" : "left",
            justifyContent: "center",
            flexDirection: "column",
            gap: "18px",
            // border: "1px solid blue",
            p: 2,
            textAlign:isMobile ? "center" :"left"
          }}
        >
          <Typography
            variant="h4"
            color="primary.main"
            component={motion.h4}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
                ease: "easeInOut",
              },
            }}
            sx={{ fontWeight: "bold" }}
          >
            Services I Provide
          </Typography>
          <Typography
            variant="h5"
            color="others.c3"
            component={motion.h5}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 1,
                ease: "easeInOut",
              },
            }}
            // sx={{ fontWeight: "bold" }}
          >
            Crafting Superior Applications with My Premium Services !
          </Typography>
          <Typography
            variant="body1"
            color="primary.main"
            component={motion.p}
            initial={{ y: 25, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 1.5,
                ease: "easeInOut",
              },
            }}
          >
            Elevate your projects with high-quality solutions, tailored to meet
            your needs.
          </Typography>

          <PrimaryButton
            type="button"
            buttonName="Lets Talk !"
            handleClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6.5}
          rowGap={1}
          columnGap={1}
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.5, ease: "easeInOut" },
            },
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // flexDirection:"column"
            flexWrap: "wrap",
          }}
        >
          {servicesdata.map((item) => (
            <Card
              key={item.id}
              sx={{
                width: "300px",
                height: "auto",
                display: "flex",
                alignItems: "left",
                justifyContent: "space-between",
                flexDirection: "column",
                bgcolor: "others.c3",
                color: "secondary.main",
                p: 1,
                gap: "4px",
              }}
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: "easeInOut" },
                },
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  padding: "8px",
                  bgcolor: "secondary.main",
                  width: "20px",
                  height: "20px",
                  color: "primary.main",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="h6" color="primary.main">
                {item.title}
              </Typography>

              <Typography variant="body1">{item.text}</Typography>

              {/* <StyledButton
                variant="contained"
                sx={{ width: "120px", textTransform: "capitalize" }}
              >
                Get Quote
              </StyledButton> */}
            </Card>
          ))}
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default Services;
