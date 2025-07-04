import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [
    {
      id: 1,
      name: "PlayStation 5",
      price: 41650.0,
      originalPrice: 45850.0,
      image: "https://m.media-amazon.com/images/I/51afJC92cgL._SX466_.jpg",
      variants: {
        colors: ["White", "Black", "Cosmic Red"],
        sizes: ["Standard Edition", "Digital Edition"],
      },
      description:
        "Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio, and an all-new generation of incredible PlayStation games. Immerse yourself in breathtaking graphics and discover new ways to play with innovative features.",
      images: [
        "https://m.media-amazon.com/images/I/51afJC92cgL._SX466_.jpg",
        "https://m.media-amazon.com/images/I/51MM-dYFYSL._SX466_.jpg",
        "https://m.media-amazon.com/images/I/41c+1Roq2aL._SX466_.jpg",
      ],
      inStock: true,
    },
    {
      id: 2,
      name: "Xbox Series X",
      price: 41650.0,
      originalPrice: 44999.0,
      image: "https://m.media-amazon.com/images/I/61x8fR-8vXL._SX342_.jpg",
      variants: {
        colors: ["Black", "White", "Robot White"],
        sizes: ["1TB", "512GB", "2TB"],
      },
      description:
        "The fastest, most powerful Xbox ever. Experience 12 teraflops of raw graphic processing power, true 4K gaming, and a custom SSD that enables games to load in a flash. Play thousands of titles from four generations of Xbox with backward compatibility.",
      images: [
        "https://m.media-amazon.com/images/I/61x8fR-8vXL._SX342_.jpg",
        "https://m.media-amazon.com/images/I/61s7Rg8GHSL._SX342_.jpg",
        "https://m.media-amazon.com/images/I/61tn-8-ADuL._SX342_.jpg",
      ],
      inStock: true,
    },
    {
      id: 3,
      name: "Nintendo Switch",
      price: 24999.0,
      originalPrice: 27999.0,
      image: "https://m.media-amazon.com/images/I/416ZXLMGA6S._SY300_SX300_QL70_FMwebp_.jpg",
      variants: {
        colors: ["Neon Blue/Red", "Gray", "White", "Animal Crossing Edition"],
        sizes: ["Standard", "OLED", "Lite"],
      },
      description:
        "Play at home on your TV or on the go with the Nintendo Switch. Experience the joy of gaming anytime, anywhere, with its versatile design and extensive library of exclusive games. Detachable Joy-Con controllers provide total gameplay flexibility.",
      images: [
        "https://m.media-amazon.com/images/I/416ZXLMGA6S._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/51zjE7FRXmL._SX342_.jpg",
        "https://m.media-amazon.com/images/I/611Vj4ySeBL._SX342_.jpg",
      ],
      inStock: true,
    },
    {
      id: 4,
      name: "Gaming Headset",
      price: 6650.0,
      originalPrice: 7500.0,
      image: "https://m.media-amazon.com/images/I/41GMgZG6zdL._SX300_SY300_QL70_FMwebp_.jpg",
      variants: {
        colors: ["Black", "White", "Red", "Blue"],
        sizes: ["Standard", "Pro", "Wireless"],
      },
      description:
        "Immerse yourself in crystal-clear audio with this high-fidelity gaming headset. Designed for long gaming sessions, it features comfortable earcups, a noise-cancelling microphone, and powerful drivers for an unparalleled audio experience.",
      images: [
        "https://m.media-amazon.com/images/I/41GMgZG6zdL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61mCQDMhs7L._SY355_.jpg",
        "https://m.media-amazon.com/images/I/719wVxD75QL._SY355_.jpg",
      ],
      inStock: true,
    },
    {
      id: 5,
      name: "Wireless Controller",
      price: 4999.0,
      originalPrice: 5500.0,
      image: "https://m.media-amazon.com/images/I/31YI-txNdpL._SY300_SX300_QL70_FMwebp_.jpg",
      variants: {
        colors: ["Black", "White", "Blue", "Red", "Pink Camo"],
        sizes: ["Standard", "Elite"],
      },
      description:
        "Take control of your gaming experience with this responsive wireless controller. Featuring ergonomic design, precise analog sticks, and tactile buttons, it offers superior comfort and control for all your favorite games.",
      images: [
        "https://m.media-amazon.com/images/I/31YI-txNdpL._SY300_SX300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/51SaZEMbQIL._SX425_.jpg",
        "https://m.media-amazon.com/images/I/61tc2fbXWlL._SX425_.jpg",
      ],
      inStock: false,
    },
  ],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // You can add reducers for adding/updating products if needed
    // For now we'll just use the default state
  },
  // If you want to add async thunks for fetching products from an API later:
  extraReducers: (builder) => {
    // Example async thunk reducers could go here
  },
});

// Selectors
export const selectAllProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
  state.products.products.find((product) => product.id === productId);
export const selectInStockProducts = (state) =>
  state.products.products.filter((product) => product.inStock);

export default productSlice.reducer;
