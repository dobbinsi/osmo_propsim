// DoughnutChart.tsx
import React from "react";
import { Doughnut } from "react-chartjs-2";

interface DoughnutChartProps {
  data: any;
  options?: any;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
