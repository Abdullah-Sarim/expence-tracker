import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

const COLORS = ["#4f46e5", "#22c55e", "#f59e0b", "#ef4444"];

const renderLabel = ({ percent }: any) =>
  `${(percent * 100).toFixed(0)}%`;

export default function ExpensePieChart({ data }: Props) {
  return (
    <PieChart width={320} height={320}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label={renderLabel}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend verticalAlign="bottom" />
    </PieChart>
  );
}