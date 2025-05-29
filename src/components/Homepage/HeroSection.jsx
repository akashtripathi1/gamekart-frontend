import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to GameKart
        </h1>
        <p className="text-xl text-blue-100 mb-8">
          Your ultimate destination for gaming consoles and accessories
        </p>
        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;