const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// --- IMPORT MODELS ---
// Ensure these files exist in api/models/
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
    console.log("🔍 Fetching all restaurants...");
    const restaurants = await Restaurant.find();
    console.log(`✅ Found ${restaurants.length} restaurants in DB`);
    res.json(restaurants);
  } catch (error) {
    console.error("❌ Error fetching restaurants:", error);
    res.status(500).json({ message: error.message });
  }
});

// 2. GET SINGLE RESTAURANT
app.get("/api/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // Check for valid MongoDB ID
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

// 3.5 GET ORDER HISTORY (This was missing!)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3.5 GET COLLECTIONS (New Filter Route)
app.get("/api/collections/:type", async (req, res) => {
  try {
    const { type } = req.params;
    let query = {};

    if (type === "trending") {
      // Logic: Rating 4.0 or higher
      query = { rating: { $gte: 4.0 } };
    } else if (type === "veggie") {
      // Logic: Only vegetarian
      query = { isVeg: true };
    } else if (type === "new") {
      // Logic: Just show the most recently added (sorted by ID)
      const results = await Restaurant.find().sort({ _id: -1 }).limit(10);
      return res.json(results);
    } else if (type === "events") {
      // Logic: High rating & Expensive (simulating "Events/Premium")
      query = { rating: { $gte: 4.5 } };
    }

    const results = await Restaurant.find(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. SEED ROUTE (Full Data)
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

    // Fill data if city is missing in baseData
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

    // Shuffle Data
    for (let i = finalData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [finalData[i], finalData[j]] = [finalData[j], finalData[i]];
    }

    await Restaurant.deleteMany({});
    const createdRestaurants = await Restaurant.insertMany(finalData);
    console.log(`✅ Seeded ${createdRestaurants.length} restaurants`);
    res.json({ message: "✅ Database Seeded!", total: createdRestaurants.length });

  } catch (error) {
    console.error("Seed Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ FIX 2: Vercel Conditional Listen
// Only listen on a port if we are NOT on Vercel. 
// Vercel handles the connection automatically in production.
const PORT = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ✅ FIX 3: Export App for Vercel
module.exports = app;