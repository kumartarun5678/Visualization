// client/src/components/DataChart.js

import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const DataChart = ({ data }) => {
  const chartRef = useRef();
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (data && data.length) {
      const labels = data.map((item, index) => `Data ${index + 1}`);
      const intensities = data.map((item) => item.intensity);
      const relevances = data.map((item) => item.relevance);

      if (!chartInstance) {
        const ctx = chartRef.current.getContext('2d');
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'Intensity',
                data: intensities,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
              {
                label: 'Relevance',
                data: relevances,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setChartInstance(newChartInstance);
      } else {
        chartInstance.data.labels = labels;
        chartInstance.data.datasets[0].data = intensities;
        chartInstance.data.datasets[1].data = relevances;
        chartInstance.update();
      }
    }
  }, [data, chartInstance]);

  return <canvas ref={chartRef}></canvas>;
};

export default DataChart;
