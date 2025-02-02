"use client";

import { MainSection } from "@/components/Navbar";
import { experience } from "@/mock/Eduexp";
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

function EduExp() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" : "100vh"} id="expedu">
      {isMobile ? (
        <Stack sx={{ height: "80px" }} />
      ) : (
        <Stack sx={{ height: "80px" }} />
      )}
      <Typography variant="h4" color="primary.main">
        From Classroom to Code : My Journey
      </Typography>

      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: "450px",
          border: "1px solid blue",
        }}
      >
        <Grid
          item
          xs={12}
          md={5.5}
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            flexDirection: "column",
            padding: "10px",
            gap: "4px",
            position: "relative",
            border: "1px solid blue",
          }}
        >
          <Typography variant="h5">Experience</Typography>

          {experience.map((item) => (
            <Stack
              direction="column"
              alignItems="left"
              justifyContent="left"
              spacing={1}
            >
             

              <Stack
                direction="column"
                alignItems="left"
                justifyContent="left"
                spacing={0.5}
                sx={{ width: "auto" }}
              >
                 <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">{item.company}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    justifyContent: "center",
                    width: "auto",
                    px: "10px",

                    borderRadius: "40px",
                    bgcolor: "primary.main",
                    position: "relative",
                  }}
                >
                  <Typography
                    variant="body1"
                    color="secondary.main"
                    bgcolor="inherit"
                  >
                    {item.duration}
                  </Typography>
                </Box>
              </Stack>
                {item.formerly ? (
                  <Typography variant="subtitle">({item.formerly})</Typography>
                ) : null}
                <Typography variant="body1">{item.role}</Typography>
                <Typography variant="body1">{item.location}</Typography>
              </Stack>
            </Stack>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "center",
            flexDirection: "column",
            padding: "16px",
          }}
        >
          <Typography variant="h5">Education</Typography>
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default EduExp;
