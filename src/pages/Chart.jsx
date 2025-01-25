import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Line } from "recharts";
import { 
  LineChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ChevronRightIcon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TradingChart = () => {
  const [coinData, setCoinData] = useState(null);
  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const location = useLocation();

  const timeframes = [
    { label: "24h", days: 1 },
    { label: "7d", days: 7 },
    { label: "30d", days: 30 },
    { label: "1y", days: 365 }
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const selectedCoin = location.state?.selectedOption?.toLowerCase() || "bitcoin";
        
        // Fetch current market data
        const marketResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoin}`
        );
        const coin = marketResponse.data[0];
        setCoinData(coin);

        // Fetch historical price data
        const historicalResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=365`
        );
        
        const processedHistoricalData = historicalResponse.data.prices.map(
          ([timestamp, price]) => ({
            date: new Date(timestamp).toLocaleDateString(),
            price: parseFloat(price.toFixed(2))
          })
        );
        
        setHistoricalPrices(processedHistoricalData);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoinData();
    const intervalId = setInterval(fetchCoinData, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [location.state]);

  if (!coinData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  const priceChange = coinData.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gray-50 border-b">
          <div className="flex items-center space-x-4">
            <img 
              src={coinData.image} 
              alt={coinData.name} 
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-2xl font-semibold">
                  ${coinData.current_price.toLocaleString()}
                </p>
                <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? <ArrowUpIcon size={20} /> : <ArrowDownIcon size={20} />}
                  <span className="ml-1">
                    {Math.abs(priceChange).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {timeframes.map((tf) => (
              <button
                key={tf.label}
                onClick={() => setSelectedTimeframe(tf.label)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTimeframe === tf.label 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="p-6 h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalPrices}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" />
              <YAxis 
                domain={['auto', 'auto']} 
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Price']}
                labelClassName="text-gray-700 font-semibold"
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Market Data */}
        <div className="grid grid-cols-3 gap-4 p-6 bg-gray-50 border-t">
          {[
            { label: "Market Cap", value: coinData.market_cap.toLocaleString() },
            { label: "24h High", value: coinData.high_24h.toLocaleString(), color: "text-green-600" },
            { label: "24h Low", value: coinData.low_24h.toLocaleString(), color: "text-red-600" }
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-sm text-gray-500 mb-1">{item.label}</p>
              <p className={`text-xl font-semibold ${item.color || 'text-gray-800'}`}>
                ${item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingChart;