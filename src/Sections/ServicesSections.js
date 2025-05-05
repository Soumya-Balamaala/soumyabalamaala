import React, { useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import services from "../styles/Services.module.css";
import container from "../styles/Container.module.css";
import button from "../styles/Buttons.module.css";
import text from "../styles/Typography.module.css";
import { NewServices } from "@/mock/ServicesData";

function ServicesSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex(
      (prev) => (prev + newDirection + NewServices.length) % NewServices.length
    );
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
  };

  const currentService = NewServices[index];

  return (
    <Box className={container.contentcontainer} id="services">
      <Box className={container.extrapx} />
      <Box className={container.innercontent}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
           
          }}
        >
          <Typography variant="h4" className={text.title}>
            What We Do Best
          </Typography>
        </Box>
        <Grid
          container
          className={services.gridcontainer}
          columnGap={1}
          rowGap={1}
        >
          {NewServices.map((i) => (
            <Grid item key={i.id} className={services.griditem} xs={12}>
              {i.icon}
              <Typography variant="h6">{i.title}</Typography>
              <Typography variant="body1">
                {i.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ServicesSection;
