import React, { useState } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";

const Homepage = () => {
  const handleLogout = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/logout`;
  };

  const [products] = useState([
    {
      id: 1,
      name: "PlayStation 5",
      price: 499.99,
      image: "/api/placeholder/300/300",
      variants: {
        colors: ["White", "Black"],
        sizes: ["Standard Edition", "Digital Edition"],
      },
      inStock: true,
    },
    {
      id: 2,
      name: "Xbox Series X",
      price: 499.99,
      image: "/api/placeholder/300/300",
      variants: {
        colors: ["Black", "White"],
        sizes: ["1TB", "512GB"],
      },
      inStock: true,
    },
    {
      id: 3,
      name: "Nintendo Switch",
      price: 299.99,
      image: "/api/placeholder/300/300",
      variants: {
        colors: ["Neon Blue/Red", "Gray", "White"],
        sizes: ["Standard", "OLED"],
      },
      inStock: true,
    },
    {
      id: 4,
      name: "Gaming Headset",
      price: 79.99,
      image: "/api/placeholder/300/300",
      variants: {
        colors: ["Black", "White", "Red"],
        sizes: ["Standard", "Pro"],
      },
      inStock: true,
    },
    {
      id: 5,
      name: "Wireless Controller",
      price: 59.99,
      image: "/api/placeholder/300/300",
      variants: {
        colors: ["Black", "White", "Blue", "Red"],
        sizes: ["Standard"],
      },
      inStock: false,
    },
  ]);

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <Header onLogout={handleLogout} />
      <HeroSection />
      <FeaturedProducts products={featuredProducts} />
      <Footer />
    </div>
  );
};

export default Homepage;