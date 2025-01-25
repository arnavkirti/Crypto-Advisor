import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Chart from "chart.js/auto";

const TradingChart = () => {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const selectedOption = location.state?.selectedOption || "bitcoin";
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedOption.toLowerCase()}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-XvvE6tTN937KhpzvtCig5VF5",
          },
        };

        const response = await axios.get(url, options);
        const coin = response.data[0];
        setChartData(coin);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
  }, [location.state]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      const labels = ["Current Price", "High 24h", "Low 24h"];
      const values = [
        chartData.current_price, 
        chartData.high_24h, 
        chartData.low_24h
      ];

      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: `${chartData.name} (USD)`,
              data: values,
              backgroundColor: ["#4caf50", "#2196f3", "#f44336"],
              borderColor: ["#388e3c", "#1976d2", "#d32f2f"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Price (USD)",
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart instance
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {chartData.name} Trading Chart
      </h2>
      <div style={{ position: "relative", height: "400px", width: "100%" }}>
        <canvas ref={chartRef}></canvas>
      </div>
      <div className="mt-6 text-center">
        <p className="text-xl">
          Current Price: ${chartData.current_price.toLocaleString()}
        </p>
        <p className="text-lg text-green-600">
          24h High: ${chartData.high_24h.toLocaleString()}
        </p>
        <p className="text-lg text-red-600">
          24h Low: ${chartData.low_24h.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default TradingChart;