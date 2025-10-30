import React from "react";
import { cn } from "../utils/cn";

interface ClassNames {
  mainDiv?: string;
  label?: string;
  error?: string;
  input?: string;
}

interface TextAreaProps {
  label?: string;
  name: string;
  value: string;
  error?: string;
  classNames?: ClassNames;
  onChange: (val: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  classNames,
  name,
  value,
  error,
  onChange,
}) => {
  return (
    <div className={cn("flex gap-4 flex-col", classNames?.mainDiv)}>
      {label && (
        <label className={(cn("text-sm"), classNames?.label)}>{label}</label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn("border flex-1 rounded-lg p-2", classNames?.input)}
      />
      {error && (
        <p className={cn("text-sm text-red-500", classNames?.error)}>{error}</p>
      )}
    </div>
  );
};

export default TextArea;
