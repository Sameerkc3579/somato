const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String },
  isVeg: { type: Boolean, default: true },
  image: { type: String },
  category: { type: String, default: "Recommended" }
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, default: 4.0 },
  price: { type: String },
  image: { type: String, required: true },
  isVeg: { type: Boolean, default: false }, // We explicitly define it
  menu: [menuItemSchema]
}, { strict: false }); // <--- THIS ALLOWS NEW FIELDS TO BE SAVED

module.exports = mongoose.model("Restaurant", restaurantSchema);