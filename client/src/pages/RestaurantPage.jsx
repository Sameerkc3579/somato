import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // 🚨 Ensure useLocation is imported

// --- Helper Function to create semi-dynamic placeholder data ---
// FIX: Accepting fallbackCity argument
const enhanceDataWithPlaceholders = (data, id, fallbackCity) => { 
    // Generate a simple hash/seed based on the ID
    const seed = parseInt(id) || 1; 

    // Determine cost based on the seed
    const costs = ["₹800 for two", "₹1200 for two", "₹1500 for two", "₹2000 for two", "₹950 for two"];
    const priceIndex = seed % costs.length;

    // Generate a simple dynamic phone number
    const basePhone = "98765";
    const dynamicPart = String(seed * 111).padStart(4, '0').slice(-4);
    const phone = `+91 ${basePhone}-${dynamicPart}`;

    // 🚨 FINAL FIX: Use the selected city context if the API data.city is missing 🚨
    const restaurantCity = data.city || fallbackCity || 'Default City';
    
    // Address format uses the dynamically generated number + the actual restaurant city
    const address = `Shop ${seed % 10 + 1}, Ground Floor, ${restaurantCity} Complex, ${restaurantCity} Road`; 

    // --- Placeholders for Reviews and Features ---
    const PLACEHOLDER_REVIEWS = [
        { name: `Diner ${seed}`, rating: (4.0 + (seed % 10) / 20).toFixed(1), text: `Great food and ambiance! Highly recommended. (ID: ${id})`, daysAgo: seed % 7 + 1 },
        { name: `Priya S. ${seed + 1}`, rating: (4.5 + (seed % 5) / 10).toFixed(1), text: `Loved the place. Quick service and tasty food.`, daysAgo: seed % 10 + 3 },
        { name: `Rahul V. ${seed + 2}`, rating: (3.7 + (seed % 10) / 30).toFixed(1), text: `Decent food. The quantity was good for the price.`, daysAgo: seed % 5 + 1 },
    ];

    const PLACEHOLDER_FEATURES = [
        { label: "Home Delivery", available: true },
        { label: "Takeaway Available", available: true },
        { label: "Indoor Seating", available: (seed % 2 === 0) },
        { label: "Free Wifi", available: (seed % 3 !== 0) },
    ];

    return {
        ...data,
        reviews: data.reviews || PLACEHOLDER_REVIEWS,
        features: data.features || PLACEHOLDER_FEATURES,
        phone: data.phone || phone, 
        address: data.address || address, 
        price: data.price || costs[priceIndex], 
        cuisine: data.cuisine || "Italian, Fast Food, Beverages", 
    };
};
// ----------------------------------------------------


const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const location = useLocation(); // 🚨 Initialize useLocation hook
    
  // 🚨 Extract the city from the navigation state, safely defaulting to empty string
  const selectedCity = location.state?.selectedCity || ''; 
  
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  
  // --- STATE FOR INTERACTIVITY ---
  const [activeTab, setActiveTab] = useState("Order Online");
  const [selectedCategory, setSelectedCategory] = useState("Recommended");

  // --- 🖼️ DATA & IMAGES ---
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80";

  const DEFAULT_MENU = [
    { _id: "1", name: "Margherita Pizza", category: "Pizzas", price: "249", desc: "Classic cheese pizza with basil", isVeg: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80" },
    { _id: "2", name: "Farmhouse Pizza", category: "Pizzas", price: "399", desc: "Delightful combination of onion, capsicum, tomato & grilled mushroom", isVeg: true, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80" },
    { _id: "3", name: "Chicken Pepperoni", category: "Pizzas", price: "450", desc: "American classic! Spicy, herbed chicken pepperoni on cheese", isVeg: false, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80" },
    { _id: "4", name: "Garlic Breadsticks", category: "Pizzas", price: "149", desc: "Freshly baked breadsticks with dip", isVeg: true, image: "https://images.unsplash.com/photo-1573140247632-f84660f67627?w=400&q=80" },
    { _id: "5", name: "Choco Lava Cake", category: "Desserts", price: "99", desc: "Warm chocolate cake with molten center", isVeg: true, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80" },
    { _id: "6", name: "Pepsi (500ml)", category: "Beverages", price: "60", desc: "Refreshing carbonated beverage", isVeg: true, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80" },
  ];

  useEffect(() => {
    setLoading(true);
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        // 🚨 FIX: Pass selectedCity into the helper function 🚨
        const enhancedData = enhanceDataWithPlaceholders(data, id, selectedCity);
        
        if (!enhancedData.menu || enhancedData.menu.length === 0) {
          enhancedData.menu = DEFAULT_MENU;
        }

        setRestaurant(enhancedData);
        setLoading(false);
      })
      .catch((err) => {
          console.error(err);
          // Fallback data if API fails completely, using the known city
          setRestaurant(enhanceDataWithPlaceholders({ name: "Fallback Restaurant", cuisine: "Error Cuisine" }, id, selectedCity));
          setLoading(false);
      });
  }, [id, selectedCity]); // 🚨 Re-run when ID or City context changes

  // --- CART FUNCTIONS ---
  const addToCart = (item) => setCartItems((prev) => [...prev, item]);
  
  const removeFromCart = (item) => {
    setCartItems((prev) => {
      const index = prev.findIndex((i) => i.name === item.name);
      if (index !== -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  const getQuantity = (item) => cartItems.filter((i) => i.name === item.name).length;
  const totalPrice = cartItems.reduce((total, item) => total + parseInt(item.price), 0);

  // --- FILTER LOGIC ---
  const fullMenu = restaurant?.menu?.length > 0 ? restaurant.menu : DEFAULT_MENU;
  
  const filteredMenu = selectedCategory === "Recommended" 
      ? fullMenu 
      : fullMenu.filter(item => item.category === selectedCategory);

  // --- NAVIGATE TO CHECKOUT ---
  const handlePlaceOrder = () => {
    navigate("/checkout", { 
        state: { 
            cartItems: cartItems, 
            restaurantName: restaurant.name, 
            totalPrice: totalPrice 
        } 
    });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-zomatoRed"></div>
    </div>
  );

  if (!restaurant) return <div className="text-center p-10 text-2xl">Restaurant Not Found 😔</div>;

  // Helper for features checkmark/x-mark
  const FeatureIcon = ({ available }) => (
    available ? (
      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    ) : (
      <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    )
  );

  // Helper for reviews
  const ReviewCard = ({ review }) => (
    <div className="border-b border-gray-200 py-6">
        <div className="flex justify-between items-start mb-2">
            <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-600 mr-3">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.daysAgo} days ago</p>
                </div>
            </div>
            <div className="bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-md flex items-center">
                {review.rating} ★
            </div>
        </div>
        <p className="text-gray-700 ml-12">{review.text}</p>
    </div>
  );


  return (
    <div className="min-h-screen bg-white pb-32">
      
      {/* --- HERO BANNER --- */}
      <div className="relative h-[350px] w-full">
         <img 
            src={restaurant.image || FALLBACK_IMAGE} 
            alt={restaurant.name} 
            className="w-full h-full object-cover"
            onError={(e) => {e.target.onerror = null; e.target.src = FALLBACK_IMAGE}} 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
         <div className="absolute bottom-0 left-0 p-4 md:p-10 w-full max-w-6xl mx-auto text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg text-gray-200 mb-1">{restaurant.cuisine}</p>
            <p className="text-gray-300 text-sm mb-3">{restaurant.address}</p>
            <div className="flex items-center gap-3">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-bold flex items-center gap-1">
                    {restaurant.rating || "4.2"} ★
                </span>
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-bold">35 mins</span>
            </div>
         </div>
      </div>

      {/* --- TABS --- */}
      <div className="sticky top-0 bg-white shadow-sm z-40 border-b border-gray-200">
         <div className="max-w-6xl mx-auto px-4 flex gap-8">
            {["Order Online", "Overview", "Reviews"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-lg font-medium transition ${activeTab === tab ? "text-zomatoRed border-b-4 border-zomatoRed" : "text-gray-500 hover:text-gray-800"}`}
                >
                  {tab}
                </button>
            ))}
         </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="max-w-6xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
         
         {/* 1. ORDER ONLINE TAB (The Main Menu) - EXISTING CODE */}
         {activeTab === "Order Online" && (
           <>
             {/* LEFT SIDEBAR (Functional Categories) */}
             <div className="w-full md:w-1/4 border-r border-gray-100 pr-4 hidden md:block">
                <h3 className="text-xs font-bold text-gray-500 tracking-widest mb-4">CATEGORIES</h3>
                <ul className="space-y-2 font-medium">
                    {["Recommended", "Pizzas", "Beverages", "Desserts"].map((cat) => (
                        <li 
                           key={cat}
                           onClick={() => setSelectedCategory(cat)}
                           className={`cursor-pointer p-3 rounded-lg transition flex justify-between items-center ${
                             selectedCategory === cat 
                               ? "bg-gradient-to-r from-red-50 to-white text-zomatoRed font-bold border-l-4 border-zomatoRed shadow-sm" 
                               : "text-gray-600 hover:bg-gray-50 hover:text-black"
                           }`}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
             </div>

             {/* RIGHT SIDE (Menu Items) */}
             <div className="w-full md:w-3/4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">{selectedCategory}</h2>

                <div className="space-y-8">
                    {filteredMenu.length > 0 ? filteredMenu.map((item, index) => {
                        const quantity = getQuantity(item);
                        return (
                            <div key={index} className="flex justify-between items-start pb-8 border-b border-gray-100 last:border-0">
                                {/* Info */}
                                <div className="w-2/3 pr-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        {item.isVeg ? (
                                            <div className="border border-green-600 p-[2px] rounded-sm"><div className="w-2 h-2 bg-green-600 rounded-full"></div></div>
                                        ) : (
                                            <div className="border border-red-600 p-[2px] rounded-sm"><div className="w-2 h-2 bg-red-600 rounded-full"></div></div>
                                        )}
                                        <span className="text-xs font-bold text-gray-500">{item.isVeg ? "VEG" : "NON-VEG"}</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-1">{item.name}</h3>
                                    <p className="font-semibold text-gray-700 mb-2">₹{item.price}</p>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                                </div>

                                {/* Image & Buttons */}
                                <div className="relative w-36 h-32 flex-shrink-0">
                                    <img 
                                        src={item.image || FALLBACK_IMAGE} 
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-xl"
                                        onError={(e) => {e.target.onerror = null; e.target.src = FALLBACK_IMAGE}}
                                    />
                                    
                                    <div className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 shadow-lg rounded-lg bg-white border border-gray-200 overflow-hidden">
                                        {quantity === 0 ? (
                                            <button 
                                                onClick={() => addToCart(item)}
                                                className="text-green-600 font-bold px-8 py-2 hover:bg-green-50 uppercase text-sm"
                                            >
                                                ADD
                                            </button>
                                        ) : (
                                            <div className="flex items-center bg-white text-zomatoRed font-bold">
                                                <button onClick={() => removeFromCart(item)} className="px-3 py-2 hover:bg-red-50 text-xl">-</button>
                                                <span className="px-2 text-black">{quantity}</span>
                                                <button onClick={() => addToCart(item)} className="px-3 py-2 hover:bg-red-50 text-xl">+</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }) : (
                        <div className="text-center py-10 text-gray-400">
                             <p className="text-xl">No items found in {selectedCategory} 🍛</p>
                             <p className="text-sm">Try switching categories!</p>
                        </div>
                    )}
                </div>
             </div>
           </>
         )}

         {/* 2. OVERVIEW TAB - FINAL IMPLEMENTATION */}
        {activeTab === "Overview" && (
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* LEFT/CENTER COLUMN (Details) */}
                <div className="md:col-span-2 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4">About this place</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        A lovely place to dine in with family and friends. Known for its delicious {restaurant.cuisine} cuisine and excellent service.
                    </p>
                    
                    {/* Cuisines */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2">CUISINES</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {restaurant.cuisine?.split(',').map(c => (
                            <span key={c.trim()} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                {c.trim()}
                            </span>
                        ))}
                    </div>
                    
                    {/* Average Cost */}
                    <h3 className="text-lg font-bold text-gray-800 mb-2">AVERAGE COST</h3>
                    <p className="text-gray-600 mb-6">{restaurant.price} (approx.)</p>

                    {/* More Info / Features */}
                    <h3 className="text-lg font-bold text-gray-800 mb-4">MORE INFO</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {restaurant.features?.map(feature => (
                            <div key={feature.label} className="flex items-center text-gray-700">
                                <FeatureIcon available={feature.available} />
                                {feature.label}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* RIGHT COLUMN: Call and Map/Location */}
                <div className="md:col-span-1 space-y-4">
                    {/* Call */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl text-zomatoRed font-semibold mb-2">{restaurant.phone}</h3>
                        <p className="text-gray-600">CALL</p>
                    </div>
                    
                    {/* Location/Map */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Direction</h3>
                        
                        <div className="w-full h-40 overflow-hidden rounded-md mb-2">
                            <iframe
                                width="100%" 
                                height="160"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(restaurant.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                className="border-0"
                            ></iframe>
                        </div>
                        <p className="text-sm text-gray-600">{restaurant.address}</p>
                    </div>
                </div>
            </div>
         )}
         {/* 3. REVIEWS TAB - FINAL IMPLEMENTATION */}
         {activeTab === "Reviews" && (
             <div className="w-full">
                 <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews ({restaurant.reviews.length})</h2>
                    
                    {restaurant.reviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                    
                    {restaurant.reviews.length === 0 && (
                        <p className="text-gray-500 text-center py-10">No reviews yet. Be the first!</p>
                    )}
                 </div>
             </div>
         )}

      </div>

      {/* --- FLOATING CART FOOTER --- */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-0 w-full px-4 z-50 animate-bounce-in">
            <div 
                onClick={handlePlaceOrder}
                className="max-w-4xl mx-auto bg-zomatoRed text-white p-4 rounded-xl shadow-2xl flex justify-between items-center cursor-pointer hover:bg-red-600 transition transform hover:scale-[1.01]"
            >
                <div className="flex flex-col">
                    <span className="font-bold uppercase text-xs tracking-wider">{cartItems.length} ITEM{cartItems.length > 1 ? 'S' : ''} ADDED</span>
                    <span className="font-bold text-lg">Total: ₹{totalPrice}</span>
                </div>
                <div className="flex items-center gap-2 text-lg font-bold">
                    Place Order <span className="text-xl">→</span>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default RestaurantPage;