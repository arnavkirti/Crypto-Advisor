import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TrendingUpIcon,
  NewspaperIcon,
  PieChartIcon,
  LinkIcon,
  RefreshCwIcon,
} from "lucide-react";

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([
    { id: 1, type: "Blockchain", investment: "30%" },
    { id: 2, type: "Tokens", investment: "40%" },
    { id: 3, type: "NFTs", investment: "30%" },
  ]);
  const [marketNews, setMarketNews] = useState([
    {
      id: 1,
      title: "Bitcoin Halving Approaches",
      impact: "High",
      description: "Major market event expected to influence crypto prices",
    },
    {
      id: 2,
      title: "Ethereum ETF Approval",
      impact: "Medium",
      description: "Potential institutional investment surge",
    },
  ]);
  const [diversificationOptions, setDiversificationOptions] = useState([
    { type: "Blockchain", options: ["Ethereum", "Solana"] },
    { type: "Tokens", options: ["Bitcoin", "Chainlink"] },
    { type: "NFTs", options: ["Bored Ape Yacht Club", "CryptoPunks"] },
  ]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://flow-api.mira.network/v1/flows/flows/nit-inn/Crypto-Advisor?version=0.1.0",
        {
          input: {
            prime_input_1: investmentAmount,
          },
        },
        {
          headers: {
            "content-type": "application/json",
            miraauthorization: "sb-a2dd44e757cb699ab7c6531462438b7a",
          },
        }
      );

      // Remove backticks and parse JSON
      const flowData = JSON.parse(
        response.data.first_flow.replace(/```json\n|```/g, "")
      );

      // Transform cryptocurrencies into recommendations
      const cryptoRecommendations = flowData.cryptocurrencies.map(
        (crypto, index) => ({
          id: index + 1,
          type: crypto.name,
          investment: `${crypto.allocation_percentage}%`,
        })
      );
      setRecommendations(cryptoRecommendations);

      // Parse market news from second_flow
      const newsItems = response.data.second_flow
        .split("\n\n")
        .filter(
          (item) =>
            item.startsWith("1.") ||
            item.startsWith("2.") ||
            item.startsWith("3.")
        )
        .map((item, index) => ({
          id: index + 1,
          title: item
            .split(": ")[0]
            .replace(/^\d+\.\s*\*\*/, "")
            .replace(/\*\*/, ""),
          description: item.split(": ")[1],
          impact: index === 0 ? "High" : index === 1 ? "Medium" : "Low",
        }));
      setMarketNews(newsItems);

      // Create diversification options from first_flow
      const diverseOptions = [
        {
          type: "Cryptocurrencies",
          options: flowData.cryptocurrencies.map((crypto) => crypto.name),
        },
        {
          type: "Crypto Tokens",
          options: flowData.crypto_tokens.map((token) => token.name),
        },
        {
          type: "NFTs",
          options: flowData.NFTs.map((nft) => nft.name),
        },
      ];
      setDiversificationOptions(diverseOptions);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiversificationClick = (option) => {
    navigate("/chart", { state: { selectedOption: option } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <RefreshCwIcon className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-xl text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Investment Configuration */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center">
              <TrendingUpIcon className="mr-3 text-blue-500" />
              Investment Dashboard
            </h2>
          </div>
          <div className="space-y-6">
            {/* Investment Amount */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3">
                Investment Amount
              </label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Enter investment amount"
                />
                <button
                  onClick={fetchDashboardData}
                  disabled={!investmentAmount}
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
                >
                  Analyze
                </button>
              </div>
            </div>
            {/* Investment Recommendations */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <PieChartIcon className="mr-3 text-green-500" />
                Investment Recommendations
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition"
                  >
                    <p className="font-semibold text-gray-700">{rec.type}</p>
                    <p className="text-blue-600 font-bold">{rec.investment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Market News & Diversification */}
        <div className="space-y-6">
          {/* Market News */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <NewspaperIcon className="mr-3 text-red-500" />
              Market News
            </h3>
            {marketNews.map((news) => (
              <div
                key={news.id}
                className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-700">{news.title}</h4>
                  <span
                    className={`
                      px-2 py-1 rounded-full text-xs font-bold
                      ${
                        news.impact === "High"
                          ? "bg-red-100 text-red-600"
                          : news.impact === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                      }
                    `}
                  >
                    {news.impact}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{news.description}</p>
              </div>
            ))}
          </div>
          {/* Diversification */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <LinkIcon className="mr-3 text-purple-500" />
              Diversification
            </h3>
            {diversificationOptions.map((option) => (
              <div key={option.type} className="mb-4">
                <p className="font-semibold text-gray-700 mb-2">
                  {option.type}
                </p>
                <div className="space-y-2">
                  {option.options.map((item) => (
                    <div
                      key={item}
                      onClick={() => handleDiversificationClick(item)}
                      className="flex items-center bg-gray-50 p-3 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                    >
                      <span className="w-2 h-2 mr-3 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;