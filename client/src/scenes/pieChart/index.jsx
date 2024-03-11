import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useGetVisualizationQuery } from "state/api";
import { useTheme } from "@mui/material/styles"; // Import useTheme hook

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { data, isLoading } = useGetVisualizationQuery();
  const theme = useTheme(); // Access the current theme

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
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: intensities,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderColor: "rgba(54, 162, 235, 1)",
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              labelColor: function (context) {
                return {
                  borderColor: theme.palette.mode === "dark" ? "white" : "black", // Dynamically set label border color based on theme
                  backgroundColor: theme.palette.mode === "dark" ? "white" : "black", // Dynamically set label background color based on theme
                };
              },
            },
          },
          legend: {
            labels: {
              color: theme.palette.mode === "dark" ? "white" : "black", // Dynamically set legend text color based on theme
              align: "start",
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
  }, [data, theme]); // Include theme in dependency array

  return <canvas id="pie-chart" ref={chartRef} style={{ marginLeft: '0' }} />;
};

export default PieChart;
