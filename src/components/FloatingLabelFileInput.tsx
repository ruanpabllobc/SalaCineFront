import React from "react";

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
  // Adiciona a prop para o nome do arquivo selecionado
  fileName?: string;
  // Adiciona a prop para indicar sucesso
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
  fileName, // Usar para exibir o nome do arquivo
  success, // Usar para indicar sucesso
}) => {
  const commonClasses =
    "peer bg-transparent h-11 w-full text-[#181818] placeholder-[#B4B4B4] ring-1 px-5 focus:outline-none";

  // Ajusta a cor do anel com base no estado (erro, sucesso, ou padrão)
  let ringColorClass = "ring-[#181818] focus:ring-[#181818]";
  if (touched && error) {
    ringColorClass = "ring-red-500 focus:ring-red-500";
  } else if (success) {
    ringColorClass = "ring-green-500 focus:ring-green-500";
  }

  const labelClasses =
    "absolute cursor-text left-5 -top-3 text-sm text-[#181818] bg-white px-3 z-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#B4B4B4] peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-[#181818] peer-focus:text-sm transition-all";

  // Classes para o texto de sucesso
  const successTextClasses = "mt-1 text-sm text-green-500";

  return (
    <div className={`bg-white ${className}`}>
      <div className="relative bg-inherit">
        <input
          id={id}
          name={name}
          type="file"
          onChange={onChange}
          onBlur={onBlur}
          className="hidden" // Oculta o input de arquivo original
          accept={accept}
        />
        <label
          htmlFor={id}
          className={`${commonClasses} ${ringColorClass} ${
            fileName ? "text-[#181818]" : "text-[#B4B4B4]"
          } cursor-pointer flex items-center`}
        >
          {fileName || label}{" "}
        </label>
        {(fileName || touched) && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}

        {touched && error && (
          <div className="mt-1 text-sm text-red-500">{error}</div>
        )}
        {/* Mensagem de sucesso */}
        {success && !error && (
          <div className={successTextClasses}>
            Upload realizado com sucesso!
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingLabelFileInput;
