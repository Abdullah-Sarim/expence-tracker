import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

type Props = {
  data: { name: string; value: number }[];
};

const renderLabel = ({ percent }: any) =>
  `${(percent * 100).toFixed(0)}%`;

export default function ExpensePieChart({ data }: Props) {
  const getColor = (index: number) => {
    const hue = (index * 360) / data.length;
    return `hsl(${hue}, 70%, 50%)`;
  };

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
          <Cell key={index} fill={getColor(index)} />
        ))}
      </Pie>

      <Tooltip />
      <Legend verticalAlign="bottom" />
    </PieChart>
  );
}