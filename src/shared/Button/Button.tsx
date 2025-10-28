import React from "react";
import { cn } from "../utils/cn";
interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, className, onClick }) => {
  return (
    <button
      className={cn("border rounded-lg px-1 cursor-pointer", className)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
