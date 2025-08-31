'use client'

import { twMerge } from "tailwind-merge";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div
      className={twMerge(
        "h-[calc(100%-48px)]",
        "flex flex-col gap-3 justify-center",
        "p-5 mx-auto max-w-sm",
      )}
    >
      <div className={twMerge("rounded-xl border border-gray-200",
        "p-3 shadow-md",)}>
        <h2 className="mb-5 text-center text-2xl">Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

