"use client";

import { MainSection } from "@/components/Navbar";
import {
  Box,
  Grid,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Contactus from "@/assets/Illustations/contact.jpg";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ContactData, SocialMedia } from "@/mock/Contact";
import ContactForm from "@/forms/user/ContactForm";

function Contact() {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  return (
    <MainSection mainheight={isMobile ? "auto" : "100vh"} id="contact">
      <Stack sx={{ height: "80px" }} />

      <Grid
        container
        columnGap={1}
        rowGap={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // border: "1px solid blue",
          width: "90%",
        }}
      >
        <Grid
          item
          xs={12}
          md={4}
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
          sx={{
            display: "flex",
            alignItems: isMobile ? "center" : "left",
            justifyContent: "space-between",
            // border: "1px solid blue",
            flexDirection: "column",
            p: 1,
            gap: "12px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            color="primary.main"
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
            Your Next Project Starts Here!
          </Typography>
          <Typography
            variant="body1"
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
            Feel free to reach out! Whether you have a project in mind, a
            question, or just want to connect—drop a message, and I’ll get back
            to you soon!
          </Typography>
          {ContactData.map((item) => (
            <Stack
              key={item.id}
              direction="column"
              alignItems={isMobile ? "center" : "left "}
              justifyContent="center"
              // spacing={2}
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: "others.c3" }}
              >
                {item.icon}
                <Typography variant="h6" color="others.c3">
                  {item.title}
                </Typography>
              </Stack>

              <ContactLink href={item.path || "/"}>{item.text}</ContactLink>
            </Stack>
          ))}
          {SocialMedia.map((item) => (
            <Stack
              key={item.id}
              direction="column"
              alignItems={isMobile ? "center" : "left"}
              justifyContent="center"
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ color: "others.c3" }}
              >
                <Typography variant="h6" color="others.c3">
                  {item.title}
                </Typography>
                {item.icon}
              </Stack>

              <ContactLink href={item.path || "/"} target="blank">
                {item.text}
              </ContactLink>
              <Stack direction="row" alignItems="center" spacing={1}>
                {item.sm.map((item) => (
                  <SMLink
                    key={item.id}
                    component={Link}
                    href={item.path || "/"}
                    target="blank"
                  >
                    {item.icon}
                  </SMLink>
                ))}
              </Stack>
            </Stack>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            // width: "100%",
            textAlign: "left",
          }}
        >
          <ContactForm />
        </Grid>
      </Grid>
    </MainSection>
  );
}

export default Contact;

const ContactLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
}));

const SMLink = styled(Box)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
  fontSize: "20px",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "50%",

  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
}));
