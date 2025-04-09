"use client";

import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function AutoCompleteInput({
  name,
  control,
  label,
  rules,
  options = [],
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...rest}
          fullWidth
          value={options.find((option) => option.value === field.value) || null}
          onChange={(_, value) => field.onChange(value?.value || "")}
          options={options}
          getOptionLabel={(option) => option.label || ""}
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
      )}
    />
  );
}
