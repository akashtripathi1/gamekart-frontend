import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Available';
    e.target.onerror = null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-default flex flex-col h-full">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image Available</span>
          </div>
        )}
        
        {/* Sale Badge */}
        {product.inStock && product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Sale
          </div>
        )}
        
        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2" title={product.name}>
          {product.name}
        </h3>
        
        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* Variants */}
        <div className="mb-4 space-y-1">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Colors:</span>
            <div className="flex space-x-1">
              {product.variants.colors.slice(0, 3).map((color, index) => (
                <span 
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.toLowerCase() === 'white' ? '#fff' : color.toLowerCase() }}
                  title={color}
                />
              ))}
              {product.variants.colors.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.variants.colors.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-2">Sizes:</span>
            <div className="flex flex-wrap gap-1">
              {product.variants.sizes.slice(0, 3).map((size, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                  title={size}
                >
                  {size}
                </span>
              ))}
              {product.variants.sizes.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{product.variants.sizes.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* View Details Button */}
        <div className="mt-auto">
          <Link 
            to={`/home/products/${product.id}`} 
            className="block w-full"
          >
            <button
              className="w-full font-medium py-2 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="button"
              // disabled={!product.inStock}
            >
              {product.inStock ? 'View Details' : 'Out of Stock'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;