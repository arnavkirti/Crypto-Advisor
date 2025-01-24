import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [riskAnalysis, setRiskAnalysis] = useState([]);
  const [diversificationOptions, setDiversificationOptions] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      const aiRecommendations = [
        { id: 1, type: "Blockchain", investment: "30%" },
        { id: 2, type: "Tokens", investment: "40%" },
        { id: 3, type: "NFTs", investment: "30%" },
      ];
      const aiRiskAnalysis = [
        { type: "Blockchain", risk: "Moderate" },
        { type: "Tokens", risk: "High" },
        { type: "NFTs", risk: "Low" },
      ];
      const aiDiversificationOptions = [
        { type: "Blockchain", options: ["Ethereum", "Solana"] },
        { type: "Tokens", options: ["Bitcoin", "Chainlink"] },
        { type: "NFTs", options: ["Bored Ape Yacht Club", "CryptoPunks"] },
      ];

      setRecommendations(aiRecommendations);
      setRiskAnalysis(aiRiskAnalysis);
      setDiversificationOptions(aiDiversificationOptions);
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-4xl w-full">
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6">
          Investment Dashboard
        </h2>

        <div className="mb-10">
          <p className="text-gray-700 text-lg mb-2">Your Investment Amount:</p>
          <div className="flex justify-between items-center space-x-4">
            <div className="w-full md:w-1/2">
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                className="w-full px-6 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xl"
                placeholder="Enter your investment amount"
              />
            </div>
            <button
              onClick={() => {
                navigate("/")
              }}
              className="w-36 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Get Recommendations
            </button>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Investment Recommendations
          </h3>
          <div className="space-y-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="flex justify-between items-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-xl font-medium text-gray-800">
                  {rec.type}
                </span>
                <span className="text-lg text-gray-500">{rec.investment}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Risk Analysis
          </h3>
          <div className="space-y-6">
            {riskAnalysis.map((risk) => (
              <div
                key={risk.type}
                className="flex justify-between items-center p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-xl font-medium text-gray-800">
                  {risk.type}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    risk.risk === "Low"
                      ? "text-green-600"
                      : risk.risk === "Moderate"
                      ? "text-yellow-500"
                      : "text-red-600"
                  }`}
                >
                  {risk.risk}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Diversification Options
          </h3>
          <div className="space-y-6">
            {diversificationOptions.map((option) => (
              <div
                key={option.type}
                className="p-6 bg-gray-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-xl font-medium text-gray-800">
                  {option.type}
                </span>
                <ul className="mt-4 space-y-2 text-lg text-gray-600">
                  {option.options.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-2.5 h-2.5 mr-3 bg-indigo-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
