"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function TypewriterEffect({
  text = "Soumya Balamaala",
  speed = 50,
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false); // Track typing completion
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));

  useEffect(() => {
    let timeout;
    let charIndex = 0;

    const type = () => {
      if (charIndex < text.length) {
        setDisplayedText(text.substring(0, charIndex + 1));
        charIndex++;
        timeout = setTimeout(type, speed);
      } else {
        setTypingComplete(true); // Set flag when typing is done
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [text, speed]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h3" color="primary.main" sx={{textAlign:isMobile ?"center" : "left"}}>
          {displayedText}
        </Typography>
       {!isMobile ? <Typography
          variant="h3"
          color="primary.main"
          component={motion.span}
          initial={{ opacity: 1 }}
          animate={typingComplete ? { opacity: [1, 0, 1] } : { opacity: 1 }} // Conditional animation
          transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          sx={{ fontWeight: "normal" }} // Always show cursor, animate opacity
        >
          |
        </Typography> : null}
      </Stack>
    </motion.div>
  );
}
