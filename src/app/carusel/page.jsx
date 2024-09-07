"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from "antd";
import { useState } from "react";

const coinsData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 58602,
    market_cap: 1156190063421,
    market_cap_rank: 1,
    fully_diluted_valuation: 1229481629590,
    total_volume: 22054219991,
    high_24h: 59130,
    low_24h: 57674,
    price_change_24h: -331.9523609670432,
    price_change_percentage_24h: -0.56326,
    market_cap_change_24h: -6613154098.988281,
    market_cap_change_percentage_24h: -0.56873,
    circulating_supply: 19748153.0,
    total_supply: 21000000.0,
    max_supply: 21000000.0,
    ath: 73738,
    ath_change_percentage: -20.59661,
    ath_date: "2024-03-14T07:10:36.635Z",
    atl: 67.81,
    atl_change_percentage: 86246.08788,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2024-09-01T19:12:31.020Z",
    price_change_percentage_24h_in_currency: -0.5632622821008717,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    current_price: 2504.33,
    market_cap: 301780853831,
    market_cap_rank: 2,
    fully_diluted_valuation: 301780853831,
    total_volume: 9221748602,
    high_24h: 2525.17,
    low_24h: 2447.2,
    price_change_24h: 5.46,
    price_change_percentage_24h: 0.21838,
    market_cap_change_24h: 1619907849,
    market_cap_change_percentage_24h: 0.53968,
    circulating_supply: 120305767.32756,
    total_supply: 120305767.32756,
    max_supply: null,
    ath: 4878.26,
    ath_change_percentage: -48.87161,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 0.432979,
    atl_change_percentage: 575950.33678,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 56.14075907586642,
      currency: "btc",
      percentage: 5614.075907586642,
    },
    last_updated: "2024-09-01T19:12:32.602Z",
    price_change_percentage_24h_in_currency: 0.2183809137507764,
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    current_price: 0.560118,
    market_cap: 31506329310,
    market_cap_rank: 7,
    fully_diluted_valuation: 56002581265,
    total_volume: 561830906,
    high_24h: 0.568124,
    low_24h: 0.552618,
    price_change_24h: -0.006331593423955951,
    price_change_percentage_24h: -1.11777,
    market_cap_change_24h: -351453613.18050385,
    market_cap_change_percentage_24h: -1.1032,
    circulating_supply: 56251561168.0,
    total_supply: 99987294444.0,
    max_supply: 100000000000.0,
    ath: 3.4,
    ath_change_percentage: -83.54154,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.00268621,
    atl_change_percentage: 20722.39737,
    atl_date: "2014-05-22T00:00:00.000Z",
    roi: null,
    last_updated: "2024-09-01T19:12:36.567Z",
    price_change_percentage_24h_in_currency: -1.1177690826948417,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
    current_price: 135.27,
    market_cap: 63116959513,
    market_cap_rank: 5,
    fully_diluted_valuation: 78934075511,
    total_volume: 2136116609,
    high_24h: 136.21,
    low_24h: 130.35,
    price_change_24h: 0.153779,
    price_change_percentage_24h: 0.11381,
    market_cap_change_24h: 131601468,
    market_cap_change_percentage_24h: 0.20894,
    circulating_supply: 466584764.800464,
    total_supply: 583510950.800845,
    max_supply: null,
    ath: 259.96,
    ath_change_percentage: -48.08824,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 0.500801,
    atl_change_percentage: 26846.7031,
    atl_date: "2020-05-11T19:35:23.449Z",
    roi: null,
    last_updated: "2024-09-01T19:12:38.332Z",

    price_change_percentage_24h_in_currency: 0.11381445750521303,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    current_price: 522.02,
    market_cap: 76090809127,
    market_cap_rank: 4,
    fully_diluted_valuation: 76090809127,
    total_volume: 618385581,
    high_24h: 535.05,
    low_24h: 514.14,
    price_change_24h: -10.196494653360105,
    price_change_percentage_24h: -1.91587,
    market_cap_change_24h: -1509591146.4050903,
    market_cap_change_percentage_24h: -1.94534,
    circulating_supply: 145887575.79,
    total_supply: 145887575.79,
    max_supply: 200000000.0,
    ath: 717.48,
    ath_change_percentage: -27.28212,
    ath_date: "2024-06-06T14:10:59.816Z",
    atl: 0.0398177,
    atl_change_percentage: 1310203.98961,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: "2024-09-01T19:12:30.187Z",
    price_change_percentage_24h_in_currency: -1.915868871102375,
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    current_price: 0.098878,
    market_cap: 14445791150,
    market_cap_rank: 9,
    fully_diluted_valuation: 14446102311,
    total_volume: 377868744,
    high_24h: 0.101692,
    low_24h: 0.097023,
    price_change_24h: -0.002777711853670734,
    price_change_percentage_24h: -2.73247,
    market_cap_change_24h: -349212345.2132721,
    market_cap_change_percentage_24h: -2.36034,
    circulating_supply: 145775716383.705,
    total_supply: 145778856383.705,
    max_supply: null,
    ath: 0.731578,
    ath_change_percentage: -86.53263,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.0000869,
    atl_change_percentage: 113271.78521,
    atl_date: "2015-05-06T00:00:00.000Z",
    roi: null,
    last_updated: "2024-09-01T19:12:32.685Z",
    price_change_percentage_24h_in_currency: -2.7324710620943464,
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    current_price: 0.340868,
    market_cap: 12151244869,
    market_cap_rank: 12,
    fully_diluted_valuation: 15339513465,
    total_volume: 231194376,
    high_24h: 0.346938,
    low_24h: 0.334995,
    price_change_24h: -0.005907994896584835,
    price_change_percentage_24h: -1.70369,
    market_cap_change_24h: -185008059.32169914,
    market_cap_change_percentage_24h: -1.49971,
    circulating_supply: 35646894561.6753,
    total_supply: 45000000000.0,
    max_supply: 45000000000.0,
    ath: 3.09,
    ath_change_percentage: -88.98831,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 0.01925275,
    atl_change_percentage: 1665.57199,
    atl_date: "2020-03-13T02:22:55.044Z",
    roi: null,
    last_updated: "2024-09-01T19:12:32.332Z",
    price_change_percentage_24h_in_currency: -1.7036930962099572,
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image:
      "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
    current_price: 10.74,
    market_cap: 6529044097,
    market_cap_rank: 18,
    fully_diluted_valuation: 10736793956,
    total_volume: 219878594,
    high_24h: 11.09,
    low_24h: 10.54,
    price_change_24h: -0.29087128127158657,
    price_change_percentage_24h: -2.63791,
    market_cap_change_24h: -167155500.16817284,
    market_cap_change_percentage_24h: -2.49627,
    circulating_supply: 608099971.3083414,
    total_supply: 1000000000.0,
    max_supply: 1000000000.0,
    ath: 52.7,
    ath_change_percentage: -79.70608,
    ath_date: "2021-05-10T00:13:57.214Z",
    atl: 0.148183,
    atl_change_percentage: 7116.88204,
    atl_date: "2017-11-29T00:00:00.000Z",
    roi: null,
    last_updated: "2024-09-01T19:12:31.900Z",
    price_change_percentage_24h_in_currency: -2.6379091523752147,
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image:
      "https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png?1696512008",
    current_price: 4.21,
    market_cap: 5922057789,
    market_cap_rank: 20,
    fully_diluted_valuation: 6262671607,
    total_volume: 115032002,
    high_24h: 4.26,
    low_24h: 4.11,
    price_change_24h: -0.03627720888381347,
    price_change_percentage_24h: -0.85481,
    market_cap_change_24h: -41205908.783000946,
    market_cap_change_percentage_24h: -0.691,
    circulating_supply: 1407392732.48734,
    total_supply: 1488340509.4375,
    max_supply: null,
    ath: 54.98,
    ath_change_percentage: -92.37276,
    ath_date: "2021-11-04T14:10:09.301Z",
    atl: 2.7,
    atl_change_percentage: 55.46237,
    atl_date: "2020-08-20T05:48:11.359Z",
    roi: null,
    last_updated: "2024-09-01T19:12:37.421Z",
    price_change_percentage_24h_in_currency: -0.8548144825483255,
  },
  {
    id: "stellar",
    symbol: "xlm",
    name: "Stellar",
    image:
      "https://coin-images.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482",
    current_price: 0.091157,
    market_cap: 2690003455,
    market_cap_rank: 37,
    fully_diluted_valuation: 4557997118,
    total_volume: 37759689,
    high_24h: 0.092601,
    low_24h: 0.090191,
    price_change_24h: -0.00127659998546821,
    price_change_percentage_24h: -1.3811,
    market_cap_change_24h: -37369941.7407155,
    market_cap_change_percentage_24h: -1.37018,
    circulating_supply: 29509667552.7867,
    total_supply: 50001786946.5427,
    max_supply: 50001786946.5427,
    ath: 0.875563,
    ath_change_percentage: -89.58711,
    ath_date: "2018-01-03T00:00:00.000Z",
    atl: 0.00047612,
    atl_change_percentage: 19048.69233,
    atl_date: "2015-03-05T00:00:00.000Z",
    roi: null,
    last_updated: "2024-09-01T19:12:36.972Z",
    price_change_percentage_24h_in_currency: -1.3811042120289856,
  },
];

const Corusel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    afterChange: (index) => setActiveIndex(index),
  };

  return (
    <div className="mb-9">
      <Slider {...settings} className="max-w-4xl mx-auto">
        {coinsData.map((coin, index) => (
          <div key={coin.id} className="p-4">
            <div className={`rounded-lg shadow-md`}>
              <div className="flex items-center justify-center ">
                <Image
                  src={coin.image}
                  alt={coin.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="flex justify-center items-center mt-4 gap-2">
                <h3 className="text-xl font-semibold text-center text-white">
                  {coin.symbol.toLocaleUpperCase()}
                </h3>
                <p
                  className={`text-center ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
              <p className="text-center text-gray-600">
                ${coin.current_price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Corusel;
