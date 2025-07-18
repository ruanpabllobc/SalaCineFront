import React from "react";
import {
  commonClasses,
  labelClasses,
  errorClasses,
  successClasses,
} from "./InputStyles";

interface FloatingLabelFileInputProps {
  id: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  error?: string;
  className?: string;
  accept?: string;
  fileName?: string;
  success?: boolean;
}

const FloatingLabelFileInput: React.FC<FloatingLabelFileInputProps> = ({
  id,
  name,
  label,
  onChange,
  onBlur,
  touched,
  error,
  className = "",
  accept,
  fileName,
  success,
}) => {
  // Ajusta a cor do anel com base no estado (erro, sucesso, ou padrão)
  let ringColorClass = "ring-[#181818] focus:ring-[#181818]";
  if (touched && error) {
    ringColorClass = "ring-red-500 focus:ring-red-500";
  } else if (success) {
    ringColorClass = "ring-green-500 focus:ring-green-500";
  }

  const combinedClasses = `${commonClasses} ${ringColorClass} cursor-pointer flex items-center ${
    fileName ? "text-[#181818]" : "text-[#B4B4B4]"
  }`;

  return (
    <div className={`bg-white ${className}`}>
      <div className="relative bg-inherit">
        <input
          id={id}
          name={name}
          type="file"
          onChange={onChange}
          onBlur={onBlur}
          className="hidden"
          accept={accept}
        />
        <label htmlFor={id} className={combinedClasses}>
          {fileName || label}
        </label>
        {(fileName || touched) && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}

        {touched && error && <div className={errorClasses}>{error}</div>}
        {success && !error && (
          <div className={successClasses}>Upload realizado com sucesso!</div>
        )}
      </div>
    </div>
  );
};

export default FloatingLabelFileInput;
