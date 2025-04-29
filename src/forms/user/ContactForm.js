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
import { apiUContact } from "../api/user/UserApis";
import { useEffect, useState } from "react";
import { getCountries } from "../api/global/global";
import CountryCode, { Countries } from "@/formcomponents/CountriesComponent";
import MultiSelectInput from "@/formcomponents/MultiSelectInput";

// Validation
const validationSchema = yup.object({
  fullname: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  cname: yup.string().required("Company Name is required"),
  location: yup.string().required("Location is required"),
  ccode: yup.string().required("Location is required"),
  phone: yup.string().required("Mobile Number is required"),
  services: yup
    .array()
    .min(1, "Please select at least one service")
    .required("Please select at least one service"),
  details: yup.string(),
});

const defaultValues = {
  fullname: "",
  email: "",
  cname: "",
  location: null,
  ccode: null,
  phone: "",
  services: [],
  details: "",
};

function ContactForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between("xs", "md"));
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries()
      .then((res) => {
        console.log(res);
        setCountries(res.data.countries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data) => {
    console.log("Form Data:", data);

    const updateddata = {
      fullname: data.fullname,
      email: data.email,
      cname: data.cname,
      location: data.location,
      phone: `${data.ccode} ${data.phone}`,
      services: data.services,
      details: data.details,
    };

    apiUContact(updateddata)
      .then((res) => {
        console.log(res);
        reset(defaultValues);
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
                ) : form.type === "country" ? (
                  <Countries
                    name="location"
                    control={methods.control}
                    label="Location"
                    options={countries}
                  />
                ) : form.type === "code" ? (
                  <CountryCode
                    name="ccode"
                    control={methods.control}
                    label="Code"
                    options={countries}
                  />
                ) : form.type === "multilist" ? (
                  <MultiSelectInput
                    name={form.name}
                    control={methods.control}
                    label={form.label}
                    options={form.serviceslist || []}
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
