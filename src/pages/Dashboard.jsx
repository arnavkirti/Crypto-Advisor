import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  TrendingUpIcon, 
  NewspaperIcon, 
  PieChartIcon, 
  LinkIcon,
  RefreshCwIcon 
} from "lucide-react";

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [diversificationOptions, setDiversificationOptions] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Replace with actual MIRA Flows API call
        const response = await axios.post("https://flow-api.mira.network/v1/flows/flows/nit-inn/Crypto-Advisor?version=0.1.0", {
          input: {
            prime_input_1: investmentAmount || "10000"
          }
        }, {
          headers: {
            "content-type": "application/json",
            "miraauthorization": "sb-a2dd44e757cb699ab7c6531462438b7a"
          }
        });

        const cleanResponse = response.data.result.replace(/```json\n|\n```/g, ''); // Remove the markdown syntax

        const { first_flow, second_flow, result } = cleanResponse;

        const firstFlowData = JSON.parse(first_flow);
        const secondFlowData = second_flow;

        setRecommendations([
          { id: 1, type: "Cryptocurrencies", investment: `${firstFlowData.cryptocurrencies[0].allocation_percentage}%` },
          { id: 2, type: "Tokens", investment: `${firstFlowData.crypto_tokens[0].allocation_percentage}%` },
          { id: 3, type: "NFTs", investment: `${firstFlowData.NFTs[0].allocation_percentage}%` },
        ]);

        setMarketNews([
          { 
            id: 1, 
            title: "Blockchain", 
            impact: "High", 
            description: secondFlowData.split("\n")[1]
          },
          { 
            id: 2, 
            title: "Tokens", 
            impact: "Medium", 
            description: secondFlowData.split("\n")[3]
          },
          { 
            id: 3, 
            title: "NFT", 
            impact: "Low", 
            description: secondFlowData.split("\n")[5]
          },
        ]);

        setDiversificationOptions([
          { type: "Cryptocurrencies", options: firstFlowData.cryptocurrencies.map(item => item.name) },
          { type: "Tokens", options: firstFlowData.crypto_tokens.map(item => item.name) },
          { type: "NFTs", options: firstFlowData.NFTs.map(item => item.name) },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [investmentAmount]);

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
                  className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
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
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${news.impact === 'High' ? 'bg-red-100 text-red-600' : 
                      news.impact === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-green-100 text-green-600'}
                  `}>
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
                <p className="font-semibold text-gray-700 mb-2">{option.type}</p>
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
