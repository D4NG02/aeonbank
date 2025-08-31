import { twMerge } from "tailwind-merge";

export default function Docs() {
  return (
    <div className={twMerge("h-[calc(100%-48px)] w-full flex flex-col justify-center","p-5 md:px-10")}>
      <h2 className="w-full text-center text-5xl">Docs</h2>
    </div>
  );
}
