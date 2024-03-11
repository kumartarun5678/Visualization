import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useGetVisualizationQuery } from "state/api";
import { useTheme } from "@mui/material/styles"; 

const LineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { data, isLoading } = useGetVisualizationQuery();
  const theme = useTheme(); 
  useEffect(() => {
    if (!data || isLoading || !Array.isArray(data) || data.length === 0) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = data.map((item) => item.title);
    const intensities = data.map((item) => item.intensity);
    const likelihoods = data.map((item) => item.likelihood);
    const relevances = data.map((item) => item.relevance);

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
          {
            label: "Likelihood",
            data: likelihoods,
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            label: "Relevance",
            data: relevances,
            backgroundColor: "rgba(255, 206, 86, 0.5)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: theme.palette.mode === "dark" ? "white" : "black" // Dynamically set x-axis tick color based on theme
            }
          },
          y: {
            stacked: true,
            ticks: {
              color: theme.palette.mode === "dark" ? "white" : "black" // Dynamically set y-axis tick color based on theme
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, isLoading, theme]); // Include theme in dependency array

  return <canvas id="line-chart" ref={chartRef} />;
};

export default LineChart;
