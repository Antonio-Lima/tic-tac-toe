import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  selected?: boolean;
}
export default function Button({
  label,
  selected = false,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${selected ? "bg-green-500" : "bg-blue-500"} 
      transition-all hover:opacity-60 duration-300 text-white font-bold py-2 px-4 rounded`}
      {...rest}
    >
      {label}
    </button>
  );
}
