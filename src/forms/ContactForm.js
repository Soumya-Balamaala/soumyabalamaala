"use client";

import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledButton } from "@/components/Navbar";
import { FormInputData } from "@/mock/Contact";
import TextInput from "@/formcomponents/Inputtext";
import MultilineInput from "@/formcomponents/MultilineInput";
import AutoCompleteInput from "@/formcomponents/AutoCompleteInput";
import { motion } from "framer-motion";
import { apiUContact } from "./api/UserApis";

// Validation
const validationSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  cname: yup.string().required("Company Name is required"),
  // location: yup.string().required("Location is required"),
  // ccode: yup.string().required("Location is required"),
  phone: yup.string().required("Mobile Number is required"),
  services: yup
    .string()
    .required("Please fill in the field. If not applicable, enter 'NA'."),
  details: yup.string(),
});

const defaultValues = {
  fullname: "",
  email: "",
  cname: "",
  phone: "",
  services: "",
  details: "",
};

function ContactForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    apiUContact(data)
      .then((res) => {
        console.log(res);
        reset()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <Grid item xs={12}>
            <motion.div variants={childVariants}>
              <Typography variant="body1" color="primary.main">
                Please enter 'NA' if the value is not applicable, as all fields
                are mandatory.
              </Typography>
            </motion.div>
          </Grid>

          {FormInputData.map((form) => (
            <Grid key={form.id} item xs={form.xswidth} md={form.mdwidth}>
              <motion.div variants={childVariants}>
                {form.type === "multiline" ? (
                  <MultilineInput
                    autocomplete={false}
                    multiline
                    name={form.name}
                    control={methods.control}
                    label={form.label}
                    rows={2}
                  />
                ) : form.type === "list" ? (
                  <AutoCompleteInput
                    name={form.name}
                    control={methods.control}
                    label={form.label}
                    options={form.serviceslist || []}
                    rules={form.rules}
                  />
                ) : (
                  <TextInput
                    autocomplete={false}
                    name={form.name}
                    control={methods.control}
                    label={form.label}
                    type={form.type}
                  />
                )}
              </motion.div>
            </Grid>
          ))}

          <Grid item xs={12}>
            <motion.div variants={childVariants}>
              <StyledButton type="submit" variant="contained">
                Send Message
              </StyledButton>
            </motion.div>
          </Grid>
        </Grid>
      </form>
    </motion.div>
  );
}

export default ContactForm;
