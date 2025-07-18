import React from "react";
import { ChevronDown } from "lucide-react";

interface FloatingLabelInputProps {
  id: string;
  name: string;
  label: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
}) => {
  const commonClasses =
    "peer bg-transparent h-11 w-full text-[#181818] placeholder-[#B4B4B4] ring-1 px-5 ring-[#181818] focus:ring-[#181818] focus:outline-none focus:border-rose-600";
  const labelClasses =
    "absolute cursor-text left-5 -top-3 text-sm text-[#181818] bg-white px-3 z-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#B4B4B4] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#181818] peer-focus:text-sm transition-all";
  const selectClasses = `${commonClasses} cursor-pointer appearance-none pr-8`;

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
              className={selectClasses}
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
              className={commonClasses}
              placeholder={label}
            />
            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          </>
        )}
        {touched && error && (
          <div className="mt-1 text-sm text-red-500">{error}</div>
        )}
      </div>
    </div>
  );
};

export default FloatingLabelInput;
