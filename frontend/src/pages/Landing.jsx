import React from "react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">CryptoAdvisor</h1>
          <nav className="space-x-6">
            <a href="#about" className="text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="#features" className="text-gray-700 hover:text-indigo-600">
              Features
            </a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="flex-1 flex items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Invest Smarter, Not Harder
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Let AI guide your crypto investments with tailored recommendations
            and risk assessments.
          </p>
          <a
            href="#get-started"
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-md shadow-md hover:bg-indigo-50"
          >
            Get Started
          </a>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Why Choose CryptoAdvisor?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                AI-Powered Insights
              </h4>
              <p className="text-gray-600">
                Get investment recommendations tailored to your goals and risk
                profile.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                Risk Assessment
              </h4>
              <p className="text-gray-600">
                Understand the risks involved with a detailed analysis of your
                portfolio.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h4 className="text-xl font-semibold mb-4 text-indigo-600">
                Secure & Transparent
              </h4>
              <p className="text-gray-600">
                Trust your investments with the latest blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2025 CryptoAdvisor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
