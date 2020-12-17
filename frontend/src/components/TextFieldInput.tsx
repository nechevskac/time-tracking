import React from "react";

import { TextField as _TextField, styled } from "@material-ui/core";

import { FormInput } from "../types/formInput";

const TextField = styled(_TextField)({
  "& label ": {
    zIndex: 1,
    padding: "5px 10px",
    fontSize: "12px"
  },
  "& div ": {
    backgroundColor: "#F1F2F5",
    height: "40px",
    width: "250px",
    borderRadius: "10px",
    '& input': {
      padding: "5px 10px",
    }
  },
});

type TextFieldInputProps = {
  name: string;
  value: string;
  onChange: (arg: FormInput) => void;
  placeholder: string;
  type?: string;
  error?: boolean;
};

const TextFieldInput = (props: TextFieldInputProps) => {
  const { name, value, onChange, placeholder, type, error } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ name, value });
  };

  return (
    <TextField
      name={name}
      label={placeholder}
      type={type}
      value={value ?? ''}
      onChange={handleChange}
      InputProps={{
        disableUnderline: true,
      }}
      error={error}
    />
  );
};

export default TextFieldInput;
