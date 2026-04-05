import { Request, Response } from "express";
import { Transaction } from "../model/transaction";

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const range = (req.query.range as string) || "monthly";

    // ⚠️ adjust based on your auth middleware
    const userId = (req as any).user?.id;

    // 🔥 Labels
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // 🔥 Grouping logic
    let groupId: any;
    if (range === "weekly") groupId = { $dayOfWeek: "$date" };
    else if (range === "yearly") groupId = { $year: "$date" };
    else groupId = { $month: "$date" };

    // =========================
    // 📊 LINE DATA
    // =========================
    const lineAgg = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: groupId,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const lineData = lineAgg.map((item) => {
      let name: string;

      if (range === "weekly") name = days[item._id - 1];
      else if (range === "monthly") name = months[item._id - 1];
      else name = item._id.toString();

      return {
        name,
        income: item.income,
        expense: item.expense,
      };
    });

    // =========================
    // 🥧 PIE DATA
    // =========================
    const pieAgg = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          value: { $sum: "$amount" },
        },
      },
    ]);

    const pieData = pieAgg.map((item) => ({
      name: item._id,
      value: item.value,
    }));

    // =========================
    // 📈 STATS
    // =========================
    const statsAgg = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    const stats = statsAgg[0] || { income: 0, expense: 0 };

    // =========================
    // ✅ FINAL RESPONSE
    // =========================
    return res.status(200).json({
      stats: {
        income: stats.income,
        expense: stats.expense,
        balance: stats.income - stats.expense,
      },
      lineData,
      pieData,
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    return res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  }
};