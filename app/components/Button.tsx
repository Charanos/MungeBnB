"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  icon?: IconType;
  undo?: boolean;
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  undo,
  label,
  small,
  outline,
  onClick,
  disabled,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-full px-1 font-secondaryFont transition rounded-lg  text-textDark uppercase disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 
      ${outline ? "bg-textLight" : "bg-secondaryColor"}
      ${outline ? "border-betaColor" : "border-secondaryColor"}
      ${outline ? "text-textDark" : "text-secondaryColor"}
      ${small ? "py-1" : "py-2"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"} 
      ${small ? "border-[1px]" : "border-[.5px]"} 
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-2" />}
      {label}
    </button>
  );
};

export default Button;
