"use client"

import { MainSection } from "@/components/Navbar";
import { Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

function Contact() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" : "100vh"} id="contact">
      {isMobile ? <Stack sx={{ height: "80px" }} /> : null}

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
              md={5.5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              1
            </Grid>
            <Grid
              item
              xs={12}
              md={5.5}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              2
        </Grid>
        </Grid>
    </MainSection>
  );
}

export default Contact;
