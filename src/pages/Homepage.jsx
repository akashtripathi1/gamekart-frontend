import React from "react";
import { useSelector } from "react-redux";
import Header from "@/components/Homepage/Header";
import HeroSection from "@/components/Homepage/HeroSection";
import FeaturedProducts from "@/components/Homepage/FeaturedProducts";
import Footer from "@/components/Homepage/Footer";
import { selectAllProducts } from "@/store/slice/productSlice"; // Adjust the import path

const Homepage = () => {
  const handleLogout = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/logout`;
  };

  // Get products from Redux store
  const products = useSelector(selectAllProducts);

  const featuredProducts = products;

  return (
    <div className="min-h-screen bg-white">

      <HeroSection />
      <FeaturedProducts products={featuredProducts} />

    </div>
  );
};

export default Homepage;
