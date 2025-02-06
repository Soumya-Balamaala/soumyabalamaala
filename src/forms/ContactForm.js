"use client";

import { Button, Grid, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledButton } from "@/components/Navbar";
import { FormInputData } from "@/mock/Contact";
import TextInput from "@/formcomponents/Inputtext";
import { motion } from "framer-motion";

const validationSchema = yup.object({
  fullname: yup
    .string()
    .required("Full name is required")
    .required("Email is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  cname: yup.string().required("Company Name is required"),
  phone: yup.string().required("Mobile Number is required"),
  services: yup
    .string()
    .required("Please fill in the field. If not applicable, enter 'NA'."),
});

const defaultValues = {};

function ContactForm() {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <motion.div
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
      <Grid
        columnGap={1}
        rowGap={1}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          // flexDirection:"column",
          flexWrap: "wrap",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="body1"
          color="primary.main"
          component={motion.p}
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
          Please enter 'NA' if the value is not applicable, as all fields are
          mandatory.
        </Typography>
        {FormInputData.map((form) => (
          <Grid key={form.id} item xs={form.xswidth} md={form.mdwidth}>
            <TextInput
              name={form.name}
              control={methods.control}
              label={form.label}
              type={form.type}
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            />
          </Grid>
        ))}

        <StyledButton
          variant="contained"
          component={motion.div}
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
          Send Message
        </StyledButton>
      </Grid>
    </motion.div>
  );
}

export default ContactForm;
