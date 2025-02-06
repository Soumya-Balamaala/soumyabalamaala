"use client";

import { MainSection } from "@/components/Navbar";
import { education, experience } from "@/mock/Eduexp";
import {
  Box,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

function EduExp() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" : "100vh"} id="expedu">
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
          height: isMobile ? "auto" : "450px",
          // border: "1px solid blue",
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
            // border: "1px solid blue",
          }}
        >
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
            Experience
          </Typography>

          <Stack
            direction="column"
            alignItems="left"
            justifyContent="left"
            spacing={1.2}
            sx={{ mt: "10px" }}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.3, ease: "easeInOut" },
              },
            }}
          >
            {experience.map((item) => (
              <Stack
                key={item.id}
                direction="column"
                alignItems="left"
                justifyContent="left"
                spacing={0.5}
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Stack
                  direction={isMobile ? "column" : "row"}
                  alignItems={isMobile ? "left" : "center"}
                  justifyContent={isMobile ? "left" : "space-between"}
                  sx={{ width: "100%" }}
                >
                  <Typography variant="h6" color="primary.main">
                    {item.company}
                  </Typography>
                  <Box
                    sx={{
                      width: "auto",
                      height: "auto",
                      padding: "5px",
                      borderRadius: "10px",
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" color="secondary.main">
                      {item.duration}
                    </Typography>
                  </Box>
                </Stack>

                {item.formerly && (
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    ({item.formerly})
                  </Typography>
                )}
                <Typography variant="body1">{item.role}</Typography>
                <Typography variant="body1">{item.duration}</Typography>
                <Typography variant="body1">{item.location}</Typography>
              </Stack>
            ))}
          </Stack>
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
            height: isMobile ? "auto" : "450px",
          }}
        >
          <Typography
            variant="h5"
            color="others.c3"
            sx={{ fontWeight: "bold" }}
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
          >
            Education
          </Typography>

          <Stack
            direction="column"
            alignItems="left"
            justifyContent="left"
            spacing={1.2}
            sx={{ mt: "10px" }}
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.8, ease: "easeInOut" },
              },
            }}
          >
            {education.map((item) => (
              <Stack
                direction="column"
                alignItems="left"
                justifyContent="left"
                spacing={0.5}
                key={item.id}
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
                <Stack
                  direction={isMobile ? "column" : "row"}
                  alignItems={isMobile ? "left" : "center"}
                  justifyContent={isMobile ? "left" : "space-between"}
                  sx={{ width: "100%" }}
                  spacing={1}
                >
                  <Typography variant="h6" color="primary.main">
                    {item.course}
                  </Typography>
                  <Box
                    sx={{
                      width: isMobile ? "100px" : "auto",
                      height: "auto",
                      padding: "5px",
                      borderRadius: "10px",
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Typography variant="body2" color="secondary.main">
                      {item.year}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: isMobile ? "100px" : "auto",
                      height: "auto",
                      padding: "5px",
                      borderRadius: "10px",
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Typography variant="body2" color="secondary.main">
                      {item.result}
                    </Typography>
                  </Box>
                </Stack>

                {item.branch ? (
                  <Typography variant="body2" sx={{ fontStyle: "italic" }}>
                    {item.branch}
                  </Typography>
                ) : null}
                <Typography variant="body1">{item.college}</Typography>
                <Typography variant="body1">{item.location}</Typography>
                <Typography variant="body1">{item.year}</Typography>
              </Stack>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default EduExp;
