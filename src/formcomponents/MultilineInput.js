"use client"; // Ensures this component runs on the client side

import { TextField, InputAdornment } from "@mui/material";
import { Controller } from "react-hook-form";

export default function TextInput({
  name,
  control,
  label,
  rules,
  type = "text",
  icon: Icon,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          label={label}
          size="medium"
          error={!!error}
          type={type}
          helperText={error ? error.message : ""}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: Icon ? (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ) : null,
          }}
        />
      )}
    />
  );
}
