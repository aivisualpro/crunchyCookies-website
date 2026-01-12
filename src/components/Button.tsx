// client/src/components/Button.jsx
import React from "react";
import Link from "next/link";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bgColor?: string;
  isBgColor?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  label,
  href,
  onClick,
  bgColor,
  isBgColor = false,
  disabled = false,
}) => {
  const base =
    `${isBgColor ? bgColor : "bg-primary hover:bg-primary/80"} ` +
    ` px-4 py-2 rounded-lg text-sm font-medium ` +
    `${disabled ? "opacity-60 cursor-not-allowed shadow bg-white text-black font-semibold" : "text-white"} ` +
    `${className}`;

  if (href) {
    return (
      <Link href={href}>
        <button className={`mt-3 ${base}`} disabled={disabled}>
          {label || children}
        </button>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`mt-3 ${base}`} disabled={disabled}>
      {label || children}
    </button>
  );
};

export default Button;
