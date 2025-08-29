import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}
const Form = ({ children, ...rest }: FormProps) => {
  return (
    <form
      className={twMerge(
        "flex flex-col gap-2 items-end",
        rest.className,
      )}
      {...rest}
    >
      {children}
    </form>
  );
};

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  name: string;
  value: any;
}
const Input = ({ type, name, ...rest }: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={name} className="text-lg capitalize">
        {name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        autoComplete="username"
        className={twMerge(
          "px-2 py-1 rounded-lg bg-gray-300",
          "focus:outline-purple-400",
          rest.className,
        )}
        {...rest}
      />
    </div>
  );
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: "primary" | "secondary";
  type: "button" | "submit" | "reset";
}
const Button = ({ children, color = "primary", ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "px-3 py-1 rounded-xl",
        color ? "bg-purple-300" : "bg-gray-400",
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Form.Input = Input;
Form.Button = Button;
export default Form;
