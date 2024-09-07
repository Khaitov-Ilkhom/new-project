"use client";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToLiked } from "../redux/slice/likeSlice";
import { Image } from "antd";
import Corusel from "../carusel/page";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
        setTotalPages(Math.ceil(result.length / itemsPerPage));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const { likedProducts } = useSelector((state) => state.like);
  const dispatch = useDispatch();

  const isProductLiked = (id) => {
    return likedProducts?.some((product) => product.id === id);
  };

  const handleLike = (product) => {
    dispatch(addToLiked(product));
  };

  return (
    <div className="Scrol  bg-slate-900 min-h-screen flex flex-col">
      <div className="bg-[url('https://s3-alpha-sig.figma.com/img/caf5/016f/97f154adfd88d0e48d9a7fc87e5ab035?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kg4PMGrJSCVdN5EBvKIHjtCPRoi-0nXmqBnTlNqtEiFlDIAW16Fwp7n8V1S8svJ0RTd9x49QpfVKpkqSmtYvv~GjIubdF9niiT3HARsyFoZkoTQ08G-m9uLcxrCv5yB7JBaSIelBTSag0nygPKP9g6zIEN4Vm3hljsww5cVWw0lap592eTt10GeEB~f1tz2AuF8GM2~9lbuf4~9dSFnfncs8-cSuVYlqD9m841fVUetMCNiRMu~RCIIFl-dulJUzzeU401ROQPkZFTWFbc4T9EO0AAGbtTuTma3c7DAGymsVexGhU9rRtXbzGQOpKDlPN7TEKnwwUk3iLAGvueY8EQ__')] w-full bg-cover bg-center pt-20 pb-20 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-cyan-600 text-4xl font-semibold mb-4">
            CRYPTOFOLIO WATCH LIST
          </h1>
          <p className="text-gray-300 text-lg">
            Get all the info regarding your favorite Cryptocurrency
          </p>
          <div className="mt-10">
            <Corusel />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex-grow">
        <div className="flex flex-col items-center p-6 gap-6">
          <h2 className="text-white text-2xl mb-4">
            Cryptocurrency Prices by Market Cap
          </h2>
          <input
            type="text"
            placeholder="Search..."
            className="w-full max-w-md p-3 rounded-md bg-slate-800 border border-gray-700 text-white outline-none focus:border-cyan-600"
            onChange={(e) => setSearch(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}
          {!error && paginatedData.length > 0 && (
            <>
              <table className="table-auto w-full max-w-3xl text-left text-white">
                <thead>
                  <tr className="bg-cyan-600">
                    <th className="py-2 px-4">Coin</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">24h Change</th>
                    <th className="py-2 px-4">Market Cap</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData
                    .filter((coin) =>
                      search === ""
                        ? coin
                        : coin.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((coin) => (
                      <tr key={coin.id} className="border-b border-gray-700">
                        <td className="py-4 px-4">
                          <Link href={`/product/${coin.id}`}>
                            <div className="flex items-center gap-3">
                              <Image
                                width={42}
                                height={42}
                                src={coin.image}
                                alt={coin.name}
                                className="w-6 h-6 mr-2"
                              />
                              <div>
                                <p className="font-bold">
                                  {coin.symbol.toUpperCase()}
                                </p>
                                <p className="text-gray-400 text-sm">
                                  {coin.name}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          ₹{coin.current_price.toLocaleString()}
                        </td>
                        <td
                          className={`py-4 px-4 ${
                            coin.price_change_percentage_24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          } flex items-center`}
                        >
                          <button
                            className="flex items-center"
                            onClick={() => handleLike(coin)}
                          >
                            {isProductLiked(coin.id) ? (
                              <FaEyeSlash
                                size={24}
                                className="mr-2 cursor-pointer"
                              />
                            ) : (
                              <FaEye
                                size={24}
                                className="mr-2 cursor-pointer"
                              />
                            )}
                            {coin.price_change_percentage_24h}%
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          ₹{coin.market_cap.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-between w-full max-w-3xl mt-6">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-cyan-600 text-black rounded hover:bg-cyan-700 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-cyan-600 text-black rounded hover:bg-cyan-700 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
