import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Bitcoin Price in USD",
    },
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
  },
};

const Chart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
    ],
  });
  const [timeRange, setTimeRange] = useState("30");

  const fetchData = async (days) => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart",
        {
          params: {
            vs_currency: "usd",
            days: days,
            interval: "daily",
          },
        }
      );
      const prices = response.data.prices;
      const labels = prices.map((price) => {
        const date = new Date(price[0]);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      });
      const bitcoinPrices = prices.map((price) => price[1]);

      setData({
        labels,
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: bitcoinPrices,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            yAxisID: "y",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching Bitcoin data:", error);
    }
  };

  useEffect(() => {
    fetchData(timeRange);
  }, [timeRange]);

  return (
    <div className="container mx-auto py-24 -mt-36">
      <div className="text-left mt-10">
        <h1 className="text-3xl font-medium text-black">Bitcoin Price Chart</h1>
        <p className="text-xl text-gray-500 py-5">
          Bitcoin price in USD for the last {timeRange} days
        </p>
      </div>

      <div className="mt-20 w-full">
        <div className="mx-auto w-full">
          <Line options={options} data={data} />
        </div>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setTimeRange("1")}
          className={`px-4 py-2 rounded-md ${
            timeRange === "1" ? "bg-blue-700" : "bg-blue-600"
          } text-white hover:bg-blue-700`}
        >
          24 Hours
        </button>
        <button
          onClick={() => setTimeRange("30")}
          className={`px-4 py-2 rounded-md ${
            timeRange === "30" ? "bg-blue-700" : "bg-blue-600"
          } text-white hover:bg-blue-700`}
        >
          30 Days
        </button>
        <button
          onClick={() => setTimeRange("90")}
          className={`px-4 py-2 rounded-md ${
            timeRange === "90" ? "bg-blue-700" : "bg-blue-600"
          } text-white hover:bg-blue-700`}
        >
          3 Months
        </button>
        <button
          onClick={() => setTimeRange("365")}
          className={`px-4 py-2 rounded-md ${
            timeRange === "365" ? "bg-blue-700" : "bg-blue-600"
          } text-white hover:bg-blue-700`}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default Chart;
