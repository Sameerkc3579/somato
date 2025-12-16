const mongoose = require("mongoose");

// Define the Menu Item Schema (Sub-document)
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String },
  isVeg: { type: Boolean, default: true },
  image: { type: String },
  category: { type: String, default: "Recommended" }
});

// Define the Main Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 4.0 },
  price: { type: String }, // e.g., "₹200 for one"
  image: { type: String, required: true }, // URL of the image
  
  // 🚨 THIS IS THE NEW FIELD THAT FIXES THE FILTER 🚨
  isVeg: { type: Boolean, default: false }, 

  menu: [menuItemSchema] // Array of menu items
});

module.exports = mongoose.model("Restaurant", restaurantSchema);