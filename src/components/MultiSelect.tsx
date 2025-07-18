/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const commonClasses =
    "peer bg-transparent h-11 w-full text-[#181818] placeholder-[#B4B4B4] ring-1 px-5 ring-[#181818] focus:ring-[#181818] focus:outline-none focus:border-rose-600";
  const labelClasses =
    "absolute cursor-text left-5 -top-3 text-sm text-[#181818] bg-white px-3 z-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#B4B4B4] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#181818] peer-focus:text-sm transition-all";

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
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`bg-white ${className}`}>
      <div className="relative bg-inherit">
        <div ref={wrapperRef} className="relative">
          {/* Input que mostra os itens selecionados */}
          <div
            id={id}
            onClick={() => setIsOpen(!isOpen)}
            onBlur={onBlur}
            tabIndex={0}
            className={`${commonClasses} cursor-pointer flex items-center py-2 pr-8 ${value.length === 0 ? "placeholder-shown" : ""}`}
            style={{
              maxHeight: "44px",
              overflow: "hidden", // Oculta o conteúdo que ultrapassar
              whiteSpace: "nowrap", // Impede quebra de linha
            }}
          >
            {value.length === 0 ? (
              <span className="text-[#B4B4B4]">{label}</span>
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

          {/* Chevron Down icon */}
          <div className="absolute inset-y-0 right-3 pointer-events-none flex items-center text-gray-700">
            <ChevronDown size={24} />
          </div>

          {/* Label flutuante */}
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>

          {/* Dropdown com opções */}
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
          <div className="mt-1 text-sm text-red-500">{error}</div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
