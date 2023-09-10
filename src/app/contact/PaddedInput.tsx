import React from "react";

type PaddedInputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  [x: string]: any;
};

const PaddedInputField = ({
  name,
  type,
  placeholder,
  onChange,
  value,
  ...props
}: PaddedInputFieldProps) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className="rounded-xl border bg-white/10 p-4"
      {...props}
    />
  );
};

export default PaddedInputField;
