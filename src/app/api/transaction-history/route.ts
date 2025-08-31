import { NextResponse } from "next/server";

type TransactionType = {
  date: string;
  id: string;
  to: string;
  type: string;
  amount: number;
};
const transaction: TransactionType[] = [
  {
    date: "24 Aug 2023",
    id: "#834343434342",
    to: "Bloom Enterprise Sdn Bhd",
    type: "DuitNow payment",
    amount: 1200,
  },
  {
    date: "14 Jul 2023",
    id: "#834343434342",
    to: "Muhammad Andy Asmawi",
    type: "DuitNow payment",
    amount: 54810.16,
  },
  {
    date: "12 Jul 2023",
    id: "#834343434342",
    to: "Utilities Company Sdn Bhd",
    type: "DuitNow payment",
    amount: 100,
  },
];

export async function GET() {
  return NextResponse.json(transaction, { status: 200 });
}
