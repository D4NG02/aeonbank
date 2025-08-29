"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type TransactionType = {
  date: Date;
  id: string;
  to: string;
  type: string;
  amount: number;
};

const DateFormat = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-MY", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return formatter.format(date);
};

const Transactions = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  useEffect(() => {
    getTransaction();
  }, []);

  const getTransaction = async () => {
    try {
      const response = await fetch("/api/transaction-history", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch secure word");
      }

      const data: TransactionType[] = await response.json();
      if (data) {
        console.log(data);
        setTransactions(data);
      }
    } catch (error) {}
  };

  return (
    <table className={twMerge("w-full table-fixed",
        "[&_th]:py-1 [&_th]:px-3 [&_th]:truncate",
        "[&_td]:py-1 [&_td]:px-3 [&_td]:truncate",
    )}>
      <thead>
        <tr
          className="text-left bg-gray-300"
        >
          <th>Date</th>
          <th>Reference ID</th>
          <th>To</th>
          <th>Transaction Type</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 &&
          transactions.map((trans, idx) => {
            const date = DateFormat(new Date(trans.date));
            return (
              <tr
                key={`transaction-${idx}`}
                className="border-b border-b-gray-300"
              >
                <td>{date}</td>
                <td>{trans.id}</td>
                <td>
                  <div>
                    <p>{trans.to}</p>
                    <p className="font-extralight text-gray-400">
                      Recipient reference will go here
                    </p>
                  </div>
                </td>
                <td>{trans.type}</td>
                <td className="text-right">
                  {"RM" + trans.amount.toLocaleString()}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Transactions;
