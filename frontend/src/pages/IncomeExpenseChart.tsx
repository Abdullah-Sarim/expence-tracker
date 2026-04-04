import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: { name: string; income: number; expense: number }[];
};

export default function IncomeExpenseChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line dataKey="income" stroke="#22c55e" />
        <Line dataKey="expense" stroke="#ef4444" />
      </LineChart>
    </ResponsiveContainer>
  );
}