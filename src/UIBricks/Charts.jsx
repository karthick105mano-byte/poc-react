import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar, Line, Pie, Doughnut, Radar } from 'react-chartjs-2';

// Register necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: [150, 200, 180, 220, 160],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: true,
      tension: 0.4,
      pointRadius: 5,
    },
  ],
};

const pieData = {
  labels,
  datasets: [
    {
      label: 'Sales by Month',
      data: [150, 200, 180, 220, 160],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
      ],
      hoverOffset: 10,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function AllCharts() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h2>Bar Chart</h2>
      <Bar data={data} options={options} />

      <h2>Line Chart</h2>
      <Line data={data} options={options} />

      <h2>Pie Chart</h2>
      <Pie data={pieData} />

      <h2>Doughnut Chart</h2>
      <Doughnut data={pieData} />

      <h2>Radar Chart</h2>
      <Radar
        data={{
          labels,
          datasets: [
            {
              label: 'Sales Radar',
              data: [150, 200, 180, 220, 160],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            r: {
              beginAtZero: true,
              max: 250,
            },
          },
          plugins: {
            legend: { position: 'top' },
          },
        }}
      />
    </div>
  );
}
