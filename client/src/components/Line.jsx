import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return;

    // Ensure existing chart instance is destroyed before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Extracting relevant data for visualization
    const labels = data.map((item) => item.title);
    const intensities = data.map((item) => item.intensity);

    // Create new chart
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Intensity",
            data: intensities,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Intensity",
            },
          },
          x: {
            title: {
              display: true,
              text: "Insight Title",
            },
          },
        },
      },
    });

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas id="line-chart" ref={chartRef} />;
};

export default LineChart;
