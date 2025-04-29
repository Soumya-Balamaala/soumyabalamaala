"use client";

import { Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function MultiSelectInput({
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
          multiple
          fullWidth
          options={options}
          value={options.filter((option) =>
            field.value?.includes(option.value)
          )}
          onChange={(_, selectedOptions) =>
            field.onChange(selectedOptions.map((option) => option.value))
          }
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
