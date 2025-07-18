import React from "react";
import { ChevronDown } from "lucide-react";
import {
  commonClasses,
  labelClasses,
  errorClasses,
  selectClasses,
  successClasses,
} from "./InputStyles";

interface FloatingLabelInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  touched?: boolean;
  error?: string;
  type?: string;
  className?: string;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  success?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  touched,
  error,
  type = "text",
  className = "",
  options,
  min,
  max,
  step,
  success,
}) => {
  // Ajusta a cor do anel com base no estado (erro, sucesso, ou padrão)
  let ringColorClass = "ring-[#181818] focus:ring-[#181818]";
  if (touched && error) {
    ringColorClass = "ring-red-500 focus:ring-red-500";
  } else if (success) {
    ringColorClass = "ring-green-500 focus:ring-green-500";
  }

  const combinedClasses = `${commonClasses} ${ringColorClass} ${type === "select" ? selectClasses : ""}`;

  return (
    <div className={`bg-white ${className}`}>
      <div className="relative bg-inherit">
        {type === "select" ? (
          <div className="relative">
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className={combinedClasses}
            >
              <option value="" disabled hidden>
                {label}
              </option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 pointer-events-none flex items-center text-gray-700">
              <ChevronDown size={24} />
            </div>
            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          </div>
        ) : (
          <>
            <input
              id={id}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              min={min}
              max={max}
              step={step}
              className={combinedClasses}
              placeholder={label}
            />
            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          </>
        )}
        {touched && error && <div className={errorClasses}>{error}</div>}
        {success && !error && (
          <div className={successClasses}>Operação realizada com sucesso!</div>
        )}
      </div>
    </div>
  );
};

export default FloatingLabelInput;
