"use client";
import { Image } from "antd";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Single = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCoin = async () => {
        try {
          const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}`
          );
          if (!response.ok) {
            throw new Error(
              `Error fetching the coin data: ${response.statusText}`
            );
          }
          const data = await response.json();
          setCoin(data);
        } catch (error) {
          console.error("Error fetching the coin:", error);
          setError(error.message);
        }
      };

      fetchCoin();
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!coin) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Single pt-20 bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <Image
              src={coin.image.large}
              alt={coin.name}
              className="rounded-lg shadow-lg mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{coin.name}</h1>
            <p className="text-gray-300 mb-4">
              {coin.description.en ? (
                <span
                  dangerouslySetInnerHTML={{ __html: coin.description.en }}
                />
              ) : (
                "No description available."
              )}
            </p>
            <p className="text-xl font-semibold mb-2">
              Rank:{" "}
              <span className="text-yellow-400">{coin.market_cap_rank}</span>
            </p>
            <p className="text-xl font-semibold mb-2">
              Current Price:{" "}
              <span className="text-green-400">
                ₹{coin.market_data.current_price.inr.toLocaleString()}
              </span>
            </p>
            <p className="text-xl font-semibold">
              Market Cap:{" "}
              <span className="text-blue-400">
                ₹{coin.market_data.market_cap.inr.toLocaleString()}
              </span>
            </p>
          </div>
          <div className="w-full md:w-2/3">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 h-64">
              <p className="text-center">Graph/Chart Placeholder</p>
            </div>
            <div className="flex justify-around mt-6">
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                24 Hours
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                30 Days
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                3 Months
              </button>
              <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
                1 Year
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
