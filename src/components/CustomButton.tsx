import React from "react";

interface CustomButtonProps {
  label: string;
  icon?: React.ReactNode;
  variant?: "default" | "danger";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  icon,
  variant = "default",
  type = "button",
  onClick,
  className = "",
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 px-4 py-4 transition-colors";
  const variantStyles = {
    default: "bg-[#181818] text-white hover:bg-[#222222]",
    danger: "bg-[#FF3838] text-white hover:bg-[#FF5050]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default CustomButton;
