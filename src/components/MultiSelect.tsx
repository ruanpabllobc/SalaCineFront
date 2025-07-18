/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import {
  commonClasses,
  labelClasses,
  errorClasses,
  successClasses,
} from "./styles/InputStyles";

interface MultiSelectProps {
  id: string;
  name: string;
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  onBlur: (e: React.FocusEvent<HTMLDivElement>) => void;
  options: string[];
  touched?: boolean;
  error?: string;
  className?: string;
  success?: boolean;
}

interface BlurEvent {
  currentTarget: HTMLDivElement;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  name,
  label,
  value = [],
  onChange,
  onBlur,
  options,
  touched,
  error,
  className = "",
  success,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Ajusta a cor do anel com base no estado (erro, sucesso, ou padrão)
  let ringColorClass = "ring-[#181818] focus:ring-[#181818]";
  if (touched && error) {
    ringColorClass = "ring-red-500 focus:ring-red-500";
  } else if (success) {
    ringColorClass = "ring-green-500 focus:ring-green-500";
  }

  const combinedClasses = `${commonClasses} ${ringColorClass} cursor-pointer flex items-center py-2 pr-8 ${
    value.length === 0 ? "placeholder-shown" : ""
  }`;

  const toggleOption = (option: string) => {
    const newValue = value.includes(option)
      ? value.filter((v) => v !== option)
      : [...value, option];
    onChange(newValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      if (hasFocus) {
        if (wrapperRef.current) {
          wrapperRef.current.blur();
        }
        setHasFocus(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFocus]);

  const handleFocus = () => {
    setHasFocus(true);
  };

  return (
    <div className={`bg-white ${className}`}>
      <div className="relative bg-inherit">
        <div ref={wrapperRef} className="relative">
          <div
            id={id}
            onClick={() => {
              setIsOpen(!isOpen);
              handleFocus();
            }}
            onBlur={onBlur}
            tabIndex={0}
            className={combinedClasses}
            style={{
              maxHeight: "44px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {value.length === 0 ? (
              <span className="text-[#181818]">{label}</span>
            ) : (
              <div className="flex items-center gap-2 overflow-hidden w-full">
                {value.map((item) => (
                  <span
                    key={item}
                    className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center gap-1 flex-shrink-0"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleOption(item);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="absolute inset-y-0 right-3 pointer-events-none flex items-center text-gray-700">
            <ChevronDown size={24} />
          </div>

          {value.length > 0 && (
            <label htmlFor={id} className={labelClasses}>
              {label}
            </label>
          )}

          {isOpen && (
            <div className="absolute z-20 mt-1 w-full bg-white border border-[#181818] rounded shadow-lg max-h-60 overflow-auto">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => toggleOption(option)}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={value.includes(option)}
                    readOnly
                    className="mr-2 h-4 w-4 text-[#181818] focus:ring-[#181818] border-[#181818] rounded"
                  />
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
        {touched && error && (
          <div className={`${errorClasses} mt-1`}>{error}</div>
        )}
        {success && !error && (
          <div className={successClasses}>Seleção realizada com sucesso!</div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
