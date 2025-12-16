const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// --- IMPORT MODELS ---
const Restaurant = require("./models/Restaurant"); 
const Order = require("./models/Order"); 

dotenv.config();

const app = express();

// ✅ FIX 1: CORS Configuration
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// --- DB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

// Test Route
app.get("/", (req, res) => {
  res.send("<h1>Server is Running... 🚀</h1>");
});

// 1. GET ALL RESTAURANTS
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. GET SINGLE RESTAURANT
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || id === 'undefined' || id.length < 24) { 
        return res.status(400).json({ message: "Invalid Restaurant ID" });
    }
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. SAVE ORDER
app.post("/api/orders", async (req, res) => {
  try {
    const { items, totalAmount, restaurant } = req.body;
    const newOrder = new Order({ items, totalAmount, restaurant: restaurant || "Unknown" });
    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3.5 GET ORDER HISTORY
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3.5 GET COLLECTIONS (FINAL CORRECT VERSION)
// This handles Trending, Veggie, New, and Events correctly
app.get("/api/collections/:type", async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};

    if (type === "trending") {
      // Rating 4.0+ counts as trending
      query = { rating: { $gte: 4.0 } };
    } else if (type === "veggie") {
      // Strictly vegetarian places
      query = { isVeg: true };
    } else if (type === "new") {
      // Sort by newest created
      const results = await Restaurant.find().sort({ _id: -1 }).limit(10);
      return res.json(results);
    } else if (type === "events") {
      // "Nightlife" -> Look for Bar, Pub, or specific cuisines
      query = { 
        $or: [
          { cuisine: { $regex: "Bar", $options: "i" } },
          { cuisine: { $regex: "Pub", $options: "i" } },
          { cuisine: { $regex: "Drinks", $options: "i" } }
        ]
      };
    }

    const results = await Restaurant.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- BRUTE FORCE VEGGIE FIX ---
// Run this to force 10 restaurants to become "Veggie Friendly"
app.get("/api/force-veggie", async (req, res) => {
  try {
    const restaurants = await Restaurant.find().limit(10);

    if (restaurants.length === 0) {
      return res.status(404).json({ message: "ERROR: Database is empty." });
    }

    const updatedNames = [];

    for (const r of restaurants) {
      r.isVeg = true; 
      // Add visual confirmation to the cuisine name
      if (!r.cuisine.includes("Veg")) {
         r.cuisine = r.cuisine + " (Pure Veg)";
      }
      await r.save();
      updatedNames.push(r.name);
    }

    res.json({
      message: "SUCCESS! Force-updated these 10 restaurants to be Veggie:",
      total_updated: updatedNames.length,
      names: updatedNames
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- TRUTH CHECKER ROUTE ---
// Run this to see what your database actually looks like
app.get("/api/check-db", async (req, res) => {
  try {
    const r = await Restaurant.findOne();
    res.json({
      message: "Here is the raw data for one restaurant. Look for 'isVeg'.",
      restaurant_name: r.name,
      has_isVeg_field: r.isVeg !== undefined,
      isVeg_value: r.isVeg,
      full_data: r
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. SEED ROUTE (Optional: Keep this if you need to reset data later)
app.get("/api/seed", async (req, res) => {
  res.json({ message: "Seed route is disabled for safety. Uncomment in code to use." });
});

// ✅ FIX 2: Vercel Conditional Listen
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ✅ FIX 3: Export App for Vercel
module.exports = app;