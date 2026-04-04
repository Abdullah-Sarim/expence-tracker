import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Transaction = {
  id: string;
  date: string; // ISO format (YYYY-MM-DD)
  category: string;
  type: "income" | "expense";
  amount: number;
};

type Props = {
  data: Transaction[];
};

export default function TransactionTable({ data }: Props) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔥 Filtering logic
  const filteredData = data.filter((tx) => {
    const matchesSearch = tx.category
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      typeFilter === "all" || tx.type === typeFilter;

    const matchesFromDate =
      !fromDate || new Date(tx.date) >= new Date(fromDate);

    const matchesToDate =
      !toDate || new Date(tx.date) <= new Date(toDate);

    return (
      matchesSearch &&
      matchesType &&
      matchesFromDate &&
      matchesToDate
    );
  });

  return (
    <div className="space-y-4">

      {/* 🔥 Filters */}
      <div className="flex flex-wrap gap-4 items-center">

        {/* 🔍 Category Search */}
        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        />

        {/* ⬇️ Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* 📅 From Date */}
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        />

        {/* 📅 To Date */}
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-background"
        />

      </div>

      {/* 🔥 Table */}
      <div className="rounded-xl border bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.category}</TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tx.type}
                  </span>
                </TableCell>

                <TableCell className="text-right font-medium">
                  ₹{tx.amount}
                </TableCell>
              </TableRow>
            ))}

            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}