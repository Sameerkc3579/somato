const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // 🚨 CRITICAL: Added this so we can show the specific user's history
  userEmail: { type: String, required: true }, 
  
  restaurant: String,
  items: [
    {
      _id: { type: String, required: true }, // Your fix for string IDs
      name: String,
      price: String,
      quantity: Number,
      isVeg: Boolean
    }
  ],
  totalAmount: Number,
  
  // Added Delivery Address so it shows in the Profile details
  deliveryAddress: {
    name: String,
    address: String,
    phone: String
  },

  status: { type: String, default: "Confirmed" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);