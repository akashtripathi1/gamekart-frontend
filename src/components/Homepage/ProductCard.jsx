import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-default">
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">Product Image</span>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">₹ {product.price}</p>
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">
            Colors: {product.variants.colors.join(", ")}
          </p>
          <p className="text-sm text-gray-500">
            Sizes: {product.variants.sizes.join(", ")}
          </p>
        </div>
        <Link to={`/home/products/${product.id}`}>
          <button
            className="w-full font-medium py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            type="button"
          >
            View Details
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default ProductCard;
