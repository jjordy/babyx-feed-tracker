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
  yLabel = "",
}: {
  data: { datasets: any[]; labels: any[] };
  yLabel?: string;
}) => {
  return (
    <div>
      <Line
        options={{
          responsive: true,
          scales: {
            y: {
              ticks: {
                callback: function (value, index, ticks) {
                  return `${value} ${yLabel}`;
                },
              },
            },
          },
        }}
        data={data}
      />
    </div>
  );
};
export default MyLineChart;
