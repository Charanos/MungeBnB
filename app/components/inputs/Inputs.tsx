"use client";

import { BiDollar } from "react-icons/bi";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputsProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  formatPrice?: boolean;
  register: UseFormRegister<FieldValues>;
}

const Inputs: React.FC<InputsProps> = ({
  id,
  label,
  errors,
  disabled,
  required,
  register,
  formatPrice,
  type = "text",
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="absolute top-5 left-2 text-alphaColor" />
      )}

      <input
        id={id}
        type={type}
        placeholder=" "
        disabled={disabled}
        {...register(id, { required })}
        className={`peer w-full p-2 pt-6 font-light bg-textLight border-2 rounded-md outline-none transition disabled:opacity-70 text-textDark disabled:cursor-not-allowed ${
          formatPrice ? "pl-9" : "pl-4"
        }  ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${
          errors[id] ? "border-rose-500" : "focus:border-x-textDark"
        }`}
      />

      <label
        className={`z-10 top-5 origin-[0] transform text-md absolute duration-150 -translate-y-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          formatPrice ? "left-9" : "left-4"
        } ${errors[id] ? "text-rose-500" : "text-betaColor"} `}
      >
        {label}
      </label>
    </div>
  );
};

export default Inputs;
