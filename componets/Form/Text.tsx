import React from "react";
import { FastField } from "formik";
import TextField from "@mui/material/TextField";
import helperTextHandler from "../../utils/helperFunctions/helperTextHandler";

type InputTextProps = {
  label?: string;
  name: string;
  type?: "text" | "date" | "number" | "password";
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  helperText?: string;
  isDisabled?: boolean;
};

export const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  type = "text",
  startAdornment,
  endAdornment,
  helperText,
  isDisabled,
}) => {
  return (
    <FastField autoComplete="nope" name={name}>
      {({ field, meta }) => (
        <>
          <TextField
            disabled={isDisabled}
            {...field}
            focused={
              !!(meta.initialValue !== meta.value && meta.value && !meta.error)
            }
            label={label}
            type={type}
            variant="filled"
            size="small"
            autoComplete="nope"
            value={field.value || ""}
            InputLabelProps={{
              shrink: type === "date" ? true : undefined,
              sx: {
                ml: label?.match(/email address/i)
                  ? 4
                  : label?.match(/password/i)
                  ? 3
                  : 0,
              },
            }}
            error={!!(meta.touched && meta.error)}
            helperText={helperTextHandler(meta, helperText)}
            FormHelperTextProps={{
              sx: {
                mt:
                  helperText?.match(/optional/i) || helperText?.match(/dd\//i)
                    ? 0
                    : "-3px",
                ml: "4px",
                mb: helperText?.match(/optional/i) ? -0.3 : -1,
              },
            }}
            fullWidth
            InputProps={{
              startAdornment: startAdornment,
              endAdornment: endAdornment,
            }}
            sx={{ mb: 1 }}
          />
        </>
      )}
    </FastField>
  );
};
