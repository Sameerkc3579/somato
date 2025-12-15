const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// --- IMPORT MODELS ---
const Restaurant = require("./models/Restaurant"); 
const Order = require("./models/Order"); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- DB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- ROUTES ---

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// 1. GET ALL RESTAURANTS
app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error);
    res.status(500).json({ message: error.message });
  }
});

// 2. GET SINGLE RESTAURANT (✅ CORRECTION APPLIED HERE)
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    // ⚠️ CRITICAL FIX: Prevent Mongoose from crashing on bad/undefined IDs
    if (!id || id === 'undefined' || id.length < 24) { 
        console.error("❌ Invalid ID received in /api/restaurants/:id");
        return res.status(400).json({ message: "Invalid Restaurant ID provided." });
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (error) {
    console.error("❌ Error fetching restaurant details:", error);
    // Note: This 500 might still show up if the DB connection is timing out
    res.status(500).json({ message: error.message });
  }
});

// 3. SAVE ORDER (With Debugging)
app.post("/api/orders", async (req, res) => {
  try {
    console.log("📥 Receiving Order:", req.body); 
    
    const { items, totalAmount, restaurant } = req.body;
    
    const newOrder = new Order({ 
        items, 
        totalAmount, 
        restaurant: restaurant || "Unknown Restaurant" 
    });
    
    const savedOrder = await newOrder.save();
    console.log("✅ Order Saved Successfully:", savedOrder._id);
    res.json(savedOrder);
  } catch (error) {
    console.error("❌ Error saving order:", error);
    res.status(500).json({ message: error.message });
  }
});

// 4. GET ORDER HISTORY
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    console.log(`📤 Sending ${orders.length} orders to frontend`);
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
});

// 5. SEED ROUTE (Refilled with Data Logic)
app.get("/api/seed", async (req, res) => {
  try {
    const baseData = {
      "Hajipur": [
        { name: "La Pino'z Pizza", cuisine: "Pizza, Fast Food", price: "₹250 for one", image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "The Royal Table", cuisine: "North Indian", price: "₹400 for one", image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Burger King", cuisine: "Burger, Fast Food", price: "₹200 for one", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Chai Point", cuisine: "Tea, Snacks", price: "₹150 for one", image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Wow! Momo", cuisine: "Momos, Tibetan", price: "₹180 for one", image: "https://images.pexels.com/photos/5409009/pexels-photo-5409009.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Patna": [
        { name: "Biryani Mahal", cuisine: "Biryani, Mughlai", price: "₹300 for one", image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Bansi Vihar", cuisine: "South Indian, Veg", price: "₹150 for one", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Pind Balluchi", cuisine: "North Indian", price: "₹800 for one", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Maurya Lok Chat", cuisine: "Street Food", price: "₹100 for one", image: "https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true }
      ],
      "Delhi NCR": [
        { name: "Karim's", cuisine: "Mughlai", price: "₹600 for one", image: "https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Big Chill Cafe", cuisine: "Italian", price: "₹1000 for one", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Saravana Bhavan", cuisine: "South Indian", price: "₹300 for one", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true }
      ],
      "Mumbai": [
        { name: "Joey's Pizza", cuisine: "Pizza", price: "₹500 for one", image: "https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Leopold Cafe", cuisine: "Continental", price: "₹800 for one", image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Bademiya", cuisine: "Kebab, Mughlai", price: "₹400 for one", image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Bengaluru": [
        { name: "Truffles", cuisine: "Burger, American", price: "₹450 for one", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Vidyarthi Bhavan", cuisine: "South Indian", price: "₹150 for one", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Meghana Foods", cuisine: "Biryani", price: "₹350 for one", image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Hyderabad": [
        { name: "Paradise Biryani", cuisine: "Biryani", price: "₹400 for one", image: "https://images.pexels.com/photos/9609846/pexels-photo-9609846.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Chutneys", cuisine: "South Indian", price: "₹300 for one", image: "https://images.pexels.com/photos/2087748/pexels-photo-2087748.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true }
      ],
      "Kolkata": [
        { name: "Peter Cat", cuisine: "Continental", price: "₹600 for one", image: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Arsalan", cuisine: "Biryani, Mughlai", price: "₹350 for one", image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Lucknow": [
        { name: "Tunday Kababi", cuisine: "Mughlai, Kebab", price: "₹300 for one", image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Royal Cafe", cuisine: "North Indian, Chaat", price: "₹400 for one", image: "https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true }
      ],
      "Allahabad": [
        { name: "El Chico", cuisine: "Continental, North Indian", price: "₹600 for one", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Netram Mulchand", cuisine: "Sweets, North Indian", price: "₹200 for one", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Eat On", cuisine: "Biryani, Rolls", price: "₹250 for one", image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Gorakhpur": [
         { name: "Bobis Restaurant", cuisine: "North Indian", price: "₹350 for one", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
         { name: "Royal Darbar", cuisine: "Mughlai", price: "₹500 for one", image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Visakhapatnam": [
        { name: "Daspalla Executive Court", cuisine: "Andhra, North Indian", price: "₹700 for one", image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
        { name: "Flying Spaghetti Monster", cuisine: "Italian", price: "₹800 for one", image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true }
      ],
      "Nashik": [
        { name: "Sadhana Chulivarchi Misal", cuisine: "Maharashtrian", price: "₹150 for one", image: "https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Barbeque Ville", cuisine: "BBQ, Grill", price: "₹700 for one", image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ],
      "Ranchi": [
        { name: "Kaveri Restaurant", cuisine: "North Indian, Veg", price: "₹300 for one", image: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
        { name: "Yellow Saphire", cuisine: "Multi Cuisine", price: "₹600 for one", image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false }
      ]
    };

    const genericRestaurants = [
      { name: "Domino's Pizza", cuisine: "Pizza", price: "₹250 for one", image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
      { name: "Barbeque Nation", cuisine: "BBQ, North Indian", price: "₹800 for one", image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
      { name: "Cafe Coffee Day", cuisine: "Coffee, Snacks", price: "₹200 for one", image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
      { name: "KFC", cuisine: "Burger, Fast Food", price: "₹350 for one", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: false },
      { name: "Subway", cuisine: "Healthy, Salad", price: "₹250 for one", image: "https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true },
      { name: "Haldiram's", cuisine: "Sweets, North Indian", price: "₹200 for one", image: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600", isVeg: true }
    ];

    const allCities = [
      "Hajipur", "Patna", "Delhi NCR", "Mumbai", "Bengaluru", "Pune", "Hyderabad", 
      "Chennai", "Kolkata", "Ahmedabad", "Chandigarh", "Jaipur", "Lucknow", "Indore", 
      "Gangtok", "Nashik", "Ooty", "Shimla", "Ludhiana", "Guwahati", "Amritsar", 
      "Kanpur", "Allahabad", "Ranchi", "Visakhapatnam", "Bhubaneswar", "Coimbatore", 
      "Mangalore", "Vadodara", "Nagpur", "Agra", "Dehradun", "Mysore", "Puducherry", 
      "Surat", "Varanasi", "Bhopal", "Srinagar", "Raipur", "Gorakhpur"
    ];

    let finalData = [];
    const locations = ["Civil Lines", "Station Road", "City Centre", "MG Road", "Airport Zone", "Market Area", "High Street"];

    allCities.forEach(city => {
      const cityBase = baseData[city] || genericRestaurants;
      for (let i = 0; i < 50; i++) {
        const base = cityBase[i % cityBase.length];
        const location = locations[i % locations.length];
        finalData.push({
          name: `${base.name} ${i > 5 ? `(${location})` : ""}`,
          city: city,
          address: `${location}, ${city}`,
          cuisine: base.cuisine,
          rating: (3.5 + Math.random() * 1.5).toFixed(1),
          price: base.price,
          image: base.image,
          isVeg: base.isVeg,
          menu: [
             { name: "Special Thali", price: "250", desc: "Chef's special platter", isVeg: true },
             { name: "Paneer Butter Masala", price: "220", desc: "Rich creamy gravy", isVeg: true },
             { name: "Chicken Biryani", price: "300", desc: "Aromatic rice dish", isVeg: false },
             { name: "Chocolate Brownie", price: "120", desc: "Dessert", isVeg: true }
          ]
        });
      }
    });

    for (let i = finalData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [finalData[i], finalData[j]] = [finalData[j], finalData[i]];
    }

    await Restaurant.deleteMany({});
    const createdRestaurants = await Restaurant.insertMany(finalData);
    res.json({ message: "✅ Database Seeded & Randomized!", total: createdRestaurants.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));