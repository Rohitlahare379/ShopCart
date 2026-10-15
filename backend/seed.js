import mongoose from "mongoose";
import Product from "./models/product.model.js";
import { connectDatabase } from "./utils/connectDatabase.js";

const sampleProducts = [
  {
    name: "RGB Mechanical Keyboard",
    description: "Tactile blue switches with customizable per-key RGB backlighting and durable aluminum frame.",
    price: 2999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
    stock: 15,
  },
  {
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation and 40-hour battery life.",
    price: 7499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    stock: 22,
  },
  {
    name: "Ultra HD 4K Gaming Monitor",
    description: "27-inch IPS panel with 144Hz refresh rate, 1ms response time, and HDR400 support.",
    price: 21999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    stock: 8,
  },
  {
    name: "Ergonomic Mesh Office Chair",
    description: "High-back desk chair with dynamic lumbar support and adjustable 3D armrests.",
    price: 11499,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1580481077194-4690f367e9b0?auto=format&fit=crop&w=600&q=80",
    stock: 10,
  },
  {
    name: "Minimalist Solid Wood Desk",
    description: "Crafted from sustainable solid oak with built-in cable management channels.",
    price: 15999,
    category: "Furniture",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
    stock: 5,
  },
  {
    name: "Smart Fitness Smartwatch",
    description: "AMOLED touchscreen with continuous heart rate, SpO2 monitor, GPS, and 14-day battery.",
    price: 4999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    stock: 30,
  },
  {
    name: "Fitness Tracker Smart Band",
    description: "Slim water-resistant band tracking sleep stages, steps, and daily stress levels.",
    price: 1999,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=600&q=80",
    stock: 45,
  },
  {
    name: "Pro Gaming Mouse",
    description: "Lightweight 60g design with 26K DPI optical sensor and ultra-flexible paracord cable.",
    price: 1899,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    stock: 18,
  },
  {
    name: "Wireless Gamepad Controller",
    description: "Ergonomic layout with dual vibration motors and low-latency Bluetooth connectivity.",
    price: 3499,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=600&q=80",
    stock: 12,
  },
  {
    name: "Waterproof Travel Backpack",
    description: "30L durable weatherproof backpack with dedicated padded laptop compartment.",
    price: 2499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    stock: 25,
  },
  {
    name: "Stainless Steel Insulated Bottle",
    description: "Double-walled vacuum insulated 1000ml flask keeping drinks cold for 24h or hot for 12h.",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    stock: 50,
  },
  {
    name: "Wireless Fast Charging Pad",
    description: "15W Qi-certified fast charging station with aluminum base and non-slip rubber surface.",
    price: 1299,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?auto=format&fit=crop&w=600&q=80",
    stock: 0,
  },
];

async function seed() {
  try {
    await connectDatabase();
    await Product.deleteMany({});
    const created = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${created.length} products!`);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed products:", error);
    process.exit(1);
  }
}

seed();
