"use client";

import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// Country options list

export default function CountryCode({
  name,
  control,
  label,
  rules,
  options,
  ...rest
}) {
  const handleChange = (_, value, field) => {
    field.onChange(value ? `${value.countrydcode}` : null);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const selectedValue = options.find(
          (option) => `${option.countrydcode}` === field.value
        ) || null;

        return (
          <Autocomplete
            {...rest}
            fullWidth
            value={selectedValue}
            onChange={(e, value) => handleChange(e, value, field)}
            options={options}
            getOptionLabel={(option) =>
              option.label || `${option.countrydcode} (${option.countryacode})`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
                fullWidth
                size="medium"
                variant="outlined"
              />
            )}
          />
        );
      }}
    />
  );
}

export function Countries({ name, control, label, rules, options, ...rest }) {
  const handleChange = (_, value, field) => {
    field.onChange(
      value ? `${value.countryname} (${value.countryacode})` : null
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const selectedValue = options.find(
          (option) =>
            `${option.countryname} (${option.countryacode})` === field.value
        ) || null;

        return (
          <Autocomplete
            {...rest}
            fullWidth
            value={selectedValue}
            onChange={(e, value) => handleChange(e, value, field)}
            options={options}
            getOptionLabel={(option) =>
              option.label ||
              `${option.countryname} (${option.countryacode})`
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
                fullWidth
                size="medium"
                variant="outlined"
              />
            )}
          />
        );
      }}
    />
  );
}
