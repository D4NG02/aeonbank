import { twMerge } from "tailwind-merge";

export default function Enterprise() {
  return (
    <div className={twMerge("h-[calc(100%-50px)] w-full flex flex-col justify-center","p-5 md:px-10")}>
      <h2 className="w-full text-center text-5xl">Enterprise</h2>
    </div>
  );
}
