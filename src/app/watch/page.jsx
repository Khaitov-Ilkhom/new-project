"use client";
import { Image } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Watch = () => {
  const { likedProducts } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isProductLiked = (id) => {
    return likedProducts?.some((product) => product.id === id);
  };

  const handleLike = (product) => {
    dispatch(addToLiked(product));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="Watch">
      <div className="container">
        <div className="watch">
          <button
            onClick={toggleSidebar}
            className="border bg-cyan-700 text-slate-900 p-2 border-none text-sm rounded-md font-sans font-semibold"
          >
            WATCH LIST
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 w-80 z-10 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-white font-bold text-lg">Watchlist</h2>
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-red-500 transition"
            >
              Close
            </button>
          </div>
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full h-full p-4 overflow-y-auto"
        >
          {likedProducts.length > 0 ? (
            likedProducts.map((coin) => (
              <div
                key={coin.id}
                className="p-4 bg-gray-700 mb-2 rounded w-28 flex flex-col items-center justify-center gap-2"
              >
                <Image
                  width={50}
                  height={50}
                  src={coin.image}
                  alt={coin.name}
                  className="w-6 h-6 mr-2"
                />
                <h3 className="text-white font-bold">{coin.name}</h3>
                <p className="text-white">{coin.price_change_percentage_24h}</p>
                <button className="bg-red-700 text-white p-1 rounded-md ">
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-white">No products in your watchlist.</p>
          )}
        </div>
      </div>

      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-5"
        ></div>
      )}
    </div>
  );
};

export default Watch;
