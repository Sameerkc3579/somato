const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  restaurant: String,
  items: [
    {
      _id: { type: String, required: true }, // ✅ FIX: Explicitly define _id as a String
      name: String,
      price: String,
      quantity: Number,
      isVeg: Boolean
    }
  ],
  totalAmount: Number,
  status: { type: String, default: "Confirmed" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);