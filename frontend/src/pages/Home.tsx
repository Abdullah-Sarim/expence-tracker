import { useEffect, useState } from "react";
import IncomeExpenseChart from "./IncomeExpenseChart";
import ExpensePieChart from "./ExpensePieChart";
import { ThemeToggle } from "../utils/Themetoggle";
import TransactionTable from'./TransactionTable'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddTransactionModal from "./AddTransactionModel";
import { IndianRupee, TrendingUp, Wallet } from "lucide-react";

type Stats = {
  income: number;
  expense: number;
  balance: number;
};

type LineData = {
  name: string;
  income: number;
  expense: number;
};

type PieData = {
  name: string;
  value: number;
};

type DashboardData = {
  stats: Stats;
  lineData: LineData[];
  pieData: PieData[];
};

import { Plus } from "lucide-react"
export default function Home() {
  const [range, setRange] = useState<"weekly" | "monthly" | "yearly">("monthly");


  const [transactions, setTransactions] = useState([
  {
    id: "1",
    date: "2026-04-01",
    category: "Food",
    type: "expense",
    amount: 500,
  },
  {
    id: "2",
    date: "2026-04-02",
    category: "Salary",
    type: "income",
    amount: 20000,
  },
  {
    id: "3",
    date: "2026-04-03",
    category: "Travel",
    type: "expense",
    amount: 1200,
  },
]);
const handleAddTransaction = (tx: Transaction) => {
  setTransactions((prev) => [tx, ...prev]);
};

  const [data, setData] = useState<DashboardData>({
    stats: { income: 0, expense: 0, balance: 0 },
    lineData: [],
    pieData: [],
  });

  // 🔥 Mock Data
  useEffect(() => {
    if (range === "weekly") {
      setData({
        stats: { income: 20000, expense: 12000, balance: 8000 },
        lineData: [
          { name: "Mon", income: 2000, expense: 1500 },
          { name: "Tue", income: 3000, expense: 1800 },
          { name: "Wed", income: 2500, expense: 2000 },
          { name: "Thu", income: 4000, expense: 2500 },
          { name: "Fri", income: 3500, expense: 2200 },
          { name: "Sat", income: 5000, expense: 3000 },
          { name: "Sun", income: 4500, expense: 2800 },
        ],
        pieData: [
          { name: "Food", value: 3000 },
          { name: "Rent", value: 5000 },
          { name: "Travel", value: 2000 },
          { name: "Shopping", value: 2000 },
        ],
      });
    } else if (range === "yearly") {
      setData({
        stats: { income: 500000, expense: 300000, balance: 200000 },
        lineData: [
          { name: "2021", income: 20000, expense: 15000 },
          { name: "2022", income: 30000, expense: 20000 },
          { name: "2023", income: 40000, expense: 25000 },
          { name: "2024", income: 50000, expense: 30000 },
        ],
        pieData: [
          { name: "Food", value: 80000 },
          { name: "Rent", value: 120000 },
          { name: "Travel", value: 60000 },
          { name: "Shopping", value: 40000 },
        ],
      });
    } else {
      setData({
        stats: { income: 80000, expense: 50000, balance: 30000 },
        lineData: [
          { name: "Jan", income: 4000, expense: 2400 },
          { name: "Feb", income: 3000, expense: 1398 },
          { name: "Mar", income: 5000, expense: 2800 },
          { name: "Apr", income: 4000, expense: 3908 },
        ],
        pieData: [
          { name: "Food", value: 15000 },
          { name: "Rent", value: 20000 },
          { name: "Travel", value: 8000 },
          { name: "Shopping", value: 7000 },
        ],
      });
    }
  }, [range]);

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      
      {/* 🔥 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>

        <div className="flex items-center gap-3">
          {["weekly", "monthly", "yearly"].map((item) => (
            <button
              key={item}
              onClick={() => setRange(item as any)}
              className={`px-4 py-2 rounded-lg border ${
                range === item
                  ? "bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              {item}
            </button>
          ))}

          <ThemeToggle />
        </div>
      </div>

      {/* 🔥 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <Card className="bg-card text-card-foreground shadow-md">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Expense</CardTitle>
            <IndianRupee className="text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-500">
              ₹{data.stats.expense}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-md">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Income</CardTitle>
            <TrendingUp className="text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">
              ₹{data.stats.income}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-md">
          <CardHeader className="flex justify-between flex-row items-center">
            <CardTitle>Total Balance</CardTitle>
            <Wallet className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-500">
              ₹{data.stats.balance}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* 🔥 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Card className="bg-card text-card-foreground shadow-md">
          <CardHeader>
            <CardTitle>Income vs Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeExpenseChart data={data.lineData} />
          </CardContent>
        </Card>

        <Card className="bg-card text-card-foreground shadow-md">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ExpensePieChart data={data.pieData} />
          </CardContent>
        </Card>

      </div>

<div className="flex items-center gap-3 justify-end py-3">
  <AddTransactionModal onAdd={handleAddTransaction} />
</div>


{/* 🔥 Transactions */}
<div className="mt-6">
  <Card className="bg-card text-card-foreground shadow-md">
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
    </CardHeader>
    <CardContent>
      <TransactionTable data={transactions} />
    </CardContent>
  </Card>
</div>
      

    </div>
  );
}