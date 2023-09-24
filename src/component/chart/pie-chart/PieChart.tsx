import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	BarElement,
	ArcElement,
  } from 'chart.js';
  
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
  )

interface PieChartProps {
  data: { labels: string[]; values: number[]; colors: string[] };
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: data.colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows for responsive resizing
  };

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
