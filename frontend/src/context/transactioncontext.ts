// context/transactionContext.ts

import { createContext } from "react";

export type Transaction = {
  id: string;
  date: string;
  category: string;
  type: "income" | "expense";
  amount: number; 
};

export type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  setTransactions: (txs: Transaction[]) => void; // NEW
};

export const TransactionContext = createContext<TransactionContextType | null>(null);