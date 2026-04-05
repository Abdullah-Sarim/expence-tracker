import { Request, Response } from "express";
import { Transaction } from "../model/transaction";
import { Authrequest } from "../middlewares/authmiddleware";
export const getDashboardData = async (req: Authrequest, res: Response) => {
  try {
    const userId = req.user?.id; // assuming auth middleware
    const { range } = req.query;

    const now = new Date();

    let startDate: Date;

   
    if (range === "weekly") {
      const day = now.getDay(); // 0 (Sun) → 6 (Sat)
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
      startDate = new Date(now.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
    } 
    else if (range === "monthly") {
      startDate = new Date(now.getFullYear(), 0, 1); // Jan 1
    } 
    else {
      startDate = new Date(now.getFullYear() - 4, 0, 1); // last 5 years
    }

    const transactions = await Transaction.find({
      userId,
      date: { $gte: startDate },
    });

    
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    const stats = {
      income,
      expense,
      balance: income - expense,
    };

   
    let lineData: any[] = [];

    if (range === "weekly") {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      const map: any = {};
      days.forEach((d) => (map[d] = { income: 0, expense: 0 }));

      transactions.forEach((t) => {
        const day = new Date(t.date).getDay();
        const index = day === 0 ? 6 : day - 1; // convert Sun → 6
        const key = days[index];

        map[key][t.type] += t.amount;
      });

      lineData = days.map((d) => ({
        name: d,
        income: map[d].income,
        expense: map[d].expense,
      }));
    }

    else if (range === "monthly") {
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];

      const map: any = {};
      months.forEach((m) => (map[m] = { income: 0, expense: 0 }));

      transactions.forEach((t) => {
        const month = new Date(t.date).getMonth();
        const key = months[month];

        map[key][t.type] += t.amount;
      });

      lineData = months.map((m) => ({
        name: m,
        income: map[m].income,
        expense: map[m].expense,
      }));
    }

    else {
      const currentYear = now.getFullYear();
      const years = [
        currentYear - 4,
        currentYear - 3,
        currentYear - 2,
        currentYear - 1,
        currentYear,
      ];

      const map: any = {};
      years.forEach((y) => (map[y] = { income: 0, expense: 0 }));

      transactions.forEach((t) => {
        const year = new Date(t.date).getFullYear();
        if (map[year]) {
          map[year][t.type] += t.amount;
        }
      });

      lineData = years.map((y) => ({
        name: y.toString(),
        income: map[y].income,
        expense: map[y].expense,
      }));
    }

    
    const pieMap: any = {};

    transactions.forEach((t) => {
      if (t.type === "expense") {
        if (!pieMap[t.category]) pieMap[t.category] = 0;
        pieMap[t.category] += t.amount;
      }
    });

    const pieData = Object.keys(pieMap).map((key) => ({
      name: key,
      value: pieMap[key],
    }));

    
    res.json({
      stats,
      lineData,
      pieData,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};