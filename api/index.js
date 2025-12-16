const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant"); 
const Order = require("./models/Order"); 

dotenv.config();
const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ DB Error:", err));

// --- STANDARD ROUTES ---
app.get("/", (req, res) => res.send("Server is Running..."));

app.get("/api/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });
    res.json(restaurant);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

app.post("/api/orders", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.json(saved);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

app.get("/api/orders", async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

// --- ✅ COLLECTION FILTER (Matches the Fixer Logic) ---
app.get("/api/collections/:type", async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};

    if (type === "trending") {
      // Rating 4.0+
      query = { rating: { $gte: 4.0 } };
    } else if (type === "veggie") {
      // STRICTLY Veggie
      query = { isVeg: true };
    } else if (type === "new") {
      const results = await Restaurant.find().sort({ _id: -1 }).limit(10);
      return res.json(results);
    } else if (type === "events") {
      // NIGHTLIFE: Checks for specific "Nightlife" tag in cuisine
      query = { cuisine: { $regex: "Nightlife", $options: "i" } };
    }
    
    const results = await Restaurant.find(query);
    res.json(results);
  } catch (error) { res.status(500).json({ message: error.message }); }
});

// --- 🛠️ THE ROUND-ROBIN FIXER (Run Once) ---
app.get("/api/final-fix", async (req, res) => {
  try {
    const all = await Restaurant.find();
    if (all.length === 0) return res.send("No data found to fix.");

    let vegCount = 0;
    let barCount = 0;
    let trendCount = 0;

    for (let i = 0; i < all.length; i++) {
      const r = all[i];

      // Logic: 0, 3, 6, 9... -> Become NIGHTLIFE
      if (i % 3 === 0) {
        r.isVeg = false;
        // We add a specific tag "Nightlife" to make filtering easy
        if (!r.cuisine.includes("Nightlife")) r.cuisine += ", Nightlife, Bar";
        barCount++;
      } 
      // Logic: 1, 4, 7, 10... -> Become VEGGIE
      else if (i % 3 === 1) {
        r.isVeg = true;
        // Remove Nightlife tags so they don't overlap
        r.cuisine = r.cuisine.replace("Nightlife", "").replace("Bar", "");
        vegCount++;
      }
      // Logic: 2, 5, 8, 11... -> Become TRENDING (High Rating)
      else {
        r.rating = 4.8;
        trendCount++;
      }
      
      await r.save();
    }

    res.json({
      message: "Database Balanced Successfully",
      nightlife_places: barCount,
      veggie_places: vegCount,
      trending_places: trendCount
    });

  } catch (error) { res.status(500).json({ error: error.message }); }
});

const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') app.listen(PORT);
module.exports = app;