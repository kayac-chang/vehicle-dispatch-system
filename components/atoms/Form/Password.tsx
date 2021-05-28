import { Icon } from "components/atoms";
import React, { useState, useCallback } from "react";
import { Controller } from "react-hook-form";

import {
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { not } from "ramda";
import { CommonProps } from "./types";

export type PasswordProps<T> = CommonProps<T> & {
  type: "password";
};
export function Password<T>({
  type,
  name,
  label,
  icon,
  control,
  required,
  ...props
}: PasswordProps<T>) {
  const [visible, setVisible] = useState(false);
  const handle = useCallback(() => setVisible(not), [setVisible]);

  const endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handle}
        onMouseDown={handle}
        edge="end"
      >
        <span className="w-4 mr-2">
          {visible ? <Icon.Invisible /> : <Icon.Visible />}
        </span>
      </IconButton>
    </InputAdornment>
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => (
        <FormControl
          variant="outlined"
          className="w-full"
          error={Boolean(error)}
          required={required}
          {...{ onChange, onBlur, value }}
        >
          <InputLabel htmlFor={name} shrink>
            {label}
          </InputLabel>

          <OutlinedInput
            id={name}
            label={label}
            type={visible ? "text" : "password"}
            startAdornment={icon && <span className="w-4 mr-2">{icon}</span>}
            endAdornment={endAdornment}
            inputProps={props}
            inputRef={ref}
          />
        </FormControl>
      )}
    />
  );
}
