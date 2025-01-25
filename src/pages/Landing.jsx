import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUpIcon,
  ShieldIcon,
  BrainIcon,
  ChevronRightIcon,
  GlobeIcon,
  StarIcon,
  CodeIcon,
  DatabaseIcon,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
    <div
      className={`mb-4 w-16 h-16 rounded-full flex items-center justify-center ${color}`}
    >
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h4 className="text-xl font-bold mb-3 text-white">{title}</h4>
    <p className="text-white/70">{description}</p>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: BrainIcon,
      title: "AI-Powered Insights",
      description:
        "Advanced machine learning algorithms generate personalized investment strategies",
      color: "bg-purple-600",
    },
    {
      icon: ShieldIcon,
      title: "Risk Management",
      description:
        "Comprehensive risk analysis with real-time market sentiment tracking",
      color: "bg-blue-600",
    },
    {
      icon: DatabaseIcon,
      title: "Market Intelligence",
      description:
        "Aggregated data from multiple sources for holistic investment perspectives",
      color: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 opacity-50 animate-gradient-x"></div>

      <header className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <StarIcon className="w-8 h-8 text-yellow-400 mr-2" />
          <h1 className="text-3xl font-bold text-white">CryptoAdvisor</h1>
        </div>
        <nav className="space-x-6 flex items-center">
          <a href="#features" className="hover:text-yellow-400 transition">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-yellow-400 transition">
            How It Works
          </a>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition flex items-center"
          >
            Launch App <ChevronRightIcon className="ml-2 w-5 h-5" />
          </button>
        </nav>
      </header>

      <section className="relative z-10 container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-extrabold mb-6 leading-tight">
            AI-Driven Crypto Investment Intelligence
          </h2>
          <p className="text-xl mb-8 text-white/80">
            Leverage cutting-edge AI to transform your cryptocurrency investment
            strategy with personalized, data-driven recommendations.
          </p>
          <div className="flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 flex-grow"
            />
            <button className="px-6 py-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition flex items-center">
              Get Early Access <ChevronRightIcon className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <CodeIcon className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <p className="text-center text-white/70">
              Powered by advanced machine learning and blockchain technology
            </p>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="relative z-10 container mx-auto px-6 py-20"
      >
        <h3 className="text-4xl font-bold text-center mb-16">
          Why CryptoAdvisor?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <footer className="relative z-10 bg-black/20 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/70">
            &copy; 2025 CryptoAdvisor. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
