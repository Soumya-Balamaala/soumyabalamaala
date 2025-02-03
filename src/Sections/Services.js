"use client";

import { MainSection } from "@/components/Navbar";
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
            alignItems: "left",
            justifyContent: "center",
            flexDirection: "column",
            gap: "18px",
            // border: "1px solid blue",
            p: 2,
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
            sx={{ fontWeight: "bold" }}
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

          <PrimaryButton type="button" buttonName="Lets Talk !" />
        </Grid>
        <Grid
          item
          xs={12}
          md={6.5}
          rowGap={1}
          columnGap={1}
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
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  padding: "8px",
                  bgcolor: "secondary.main",
                  width: "20px",
                  height: "20px",
                  color: "others.c3",
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

              {/* <PrimaryButton
                  type="button"
                  buttonName="Lets Talk !"
                  color="secondary.main"
                /> */}

              <Button
                variant="contained"
                sx={{ width: "120px", textTransform: "capitalize" }}
              >
                Get Quote
              </Button>
            </Card>
          ))}
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default Services;
