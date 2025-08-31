import { twMerge } from "tailwind-merge";
import Transactions from "./Transactions";

export default function ShowCase() {
  return (
    <div className={twMerge("h-[calc(100%-48px)]", "p-5 md:px-10")}>
      <Transactions />
    </div>
  );
}
