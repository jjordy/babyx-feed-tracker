// components/MyLineChart.tsx
"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

const MyLineChart = ({
  data = { datasets: [], labels: [] },
}: {
  data: { datasets: any[]; labels: any[] };
}) => {
  return (
    <div>
      <Line options={{ responsive: true }} data={data} />
    </div>
  );
};
export default MyLineChart;
