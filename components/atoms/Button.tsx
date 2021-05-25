import { ReactNode } from "react";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
};

function Flat({ type = "button", children }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-gold-darker text-white w-full py-2 rounded-sm"
    >
      {children}
    </button>
  );
}

const Button = {
  Flat,
};

export default Button;
