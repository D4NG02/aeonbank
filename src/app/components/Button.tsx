import { HTMLAttributes, ReactNode } from "react";
import { motion as M, HTMLMotionProps } from "motion/react";
import { twMerge } from "tailwind-merge";

const variantClasses = {
  text: "text-purple-400 hover:bg-purple-200/70",
  contained: "bg-purple-400 hover:bg-purple-500/60",
  outlined: "border border-purple-400 text-purple-400 hover:bg-purple-200/70",
  icon: "px-1 py-1 border border-purple-400 text-purple-400 hover:bg-purple-200/70",
};

type ButtonProps = HTMLAttributes<HTMLButtonElement> &
  HTMLMotionProps<"button"> & {
    children: ReactNode;
    variant?: "text" | "contained" | "outlined" | "icon";
  };

const Button = ({ children, variant = "text", ...rest }: ButtonProps) => {
  return (
    <M.button
      {...rest}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={twMerge(
        "px-3 py-2 rounded-full",
        "hover:cursor-pointer",
        variantClasses[variant],
        rest.className,
      )}
    >
      {children}
    </M.button>
  );
};

export default Button;
