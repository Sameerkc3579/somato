import React, { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; 
import restaurantData from "../data/restaurants.json";

// --- 1. EXPANDED MENU TEMPLATES ---
const MENU_TEMPLATES = {
  pizza: [
    { name: "Farmhouse Pizza", price: "399", desc: "Herbs, cheese, tomato, onion, capsicum", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Chicken Pepperoni", price: "450", desc: "Spicy pepperoni with extra cheese", isVeg: false, category: "Recommended", image: "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Margherita", price: "249", desc: "Classic cheese pizza", isVeg: true, category: "Pizzas", image: "https://images.pexels.com/photos/1049626/pexels-photo-1049626.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Coke (500ml)", price: "60", desc: "Chilled soft drink", isVeg: true, category: "Beverages", image: "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ],
  burger: [
    { name: "Chicken Whopper", price: "219", desc: "Signature flame grilled chicken patty", isVeg: false, category: "Recommended", image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Crispy Veg Meal", price: "250", desc: "Burger + Fries + Coke", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Double Cheese Burger", price: "249", desc: "Two patties with melted cheese", isVeg: false, category: "Burgers", image: "https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ],
  chinese: [
    { name: "Chicken Hakka Noodles", price: "220", desc: "Stir fried noodles with chicken", isVeg: false, category: "Recommended", image: "https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Veg Momos (8pc)", price: "120", desc: "Steamed dumplings with chutney", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/5409012/pexels-photo-5409012.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Fried Rice", price: "190", desc: "Classic wok tossed rice", isVeg: true, category: "Main Course", image: "https://images.pexels.com/photos/3926123/pexels-photo-3926123.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ],
  south: [
    { name: "Paper Masala Dosa", price: "160", desc: "Extra thin crispy crepe with potato", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Idli Vada Combo", price: "120", desc: "2 Idlis and 1 Vada with Sambar", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ],
  north: [
    { name: "Butter Chicken", price: "290", desc: "Classic chicken in tomato butter gravy", isVeg: false, category: "Recommended", image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Dal Makhani", price: "190", desc: "Creamy black lentils cooked overnight", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg?auto=compress&cs=tinysrgb&w=600" },
    { name: "Garlic Naan", price: "50", desc: "Soft indian bread with garlic", isVeg: true, category: "Recommended", image: "https://images.pexels.com/photos/9609842/pexels-photo-9609842.jpeg?auto=compress&cs=tinysrgb&w=600" }
  ]
};

// --- 2. REVIEWS DATA ---
const REVIEWS_DATA = [
    { name: "Amit Kumar", date: "2 days ago", rating: "4.5", text: "Great food and ambiance! The food quality was top notch. Highly recommended for family dinners." },
    { name: "Priya Singh", date: "5 days ago", rating: "5.0", text: "Loved the place. Quick service and tasty food. The packaging was also very secure." },
    { name: "Rahul Verma", date: "1 week ago", rating: "4.0", text: "Decent place with good pricing. The portions were generous, though the service was a bit slow." }
];

const VegIcon = ({ isVeg }) => (
  <div className={`w-4 h-4 border ${isVeg ? "border-green-600" : "border-red-600"} flex items-center justify-center p-[1px]`}>
    <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-600" : "bg-red-600"}`}></div>
  </div>
);

// 🚨 3. COMPONENT ACCEPTING CITY PROP 🚨
const RestaurantPage = ({ city }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const [activeTab, setActiveTab] = useState("Order Online"); 
  const [cartItems, setCartItems] = useState({});

  // 1. Get Base Restaurant Data
  const baseRestaurant = location.state?.restaurant || restaurantData.find((item) => item.id === parseInt(id));

  // 2. DYNAMIC ADDRESS LOGIC:
  // If the global 'city' (from Navbar) is different from the restaurant's stored city,
  // we override the address to match the selected city.
  const restaurant = useMemo(() => {
    if (!baseRestaurant) return null;
    
    // If user selected "Agra", but restaurant data says "Hajipur", swap it!
    if (city && baseRestaurant.city !== city) {
        return {
            ...baseRestaurant,
            city: city,
            address: baseRestaurant.address.replace(baseRestaurant.city, city).replace("Hajipur", city).replace("Delhi NCR", city)
        };
    }
    return baseRestaurant;
  }, [baseRestaurant, city]);


  // 3. FIXED MAP URL LOGIC
  // Use the standard Google Maps Embed API format with ?q=
  const locationQuery = restaurant ? `${restaurant.name}, ${restaurant.city}` : "India";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(locationQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;


  // --- Cart Logic ---
  const getQty = (itemName) => cartItems[itemName] || 0;

  const updateQty = (item, action) => {
    setCartItems((prev) => {
      const currentQty = prev[item.name] || 0;
      let newQty = currentQty;
      if (action === "add") newQty += 1;
      if (action === "remove") newQty -= 1;
      const newCart = { ...prev };
      if (newQty <= 0) delete newCart[item.name];
      else newCart[item.name] = newQty;
      return newCart;
    });
  };

  const groupedMenu = useMemo(() => {
    if (!restaurant) return {};
    let menuToUse = restaurant.menu && restaurant.menu.length > 0 ? restaurant.menu : null;

    if (!menuToUse) {
      const cuisine = restaurant.cuisine.toLowerCase();
      const name = restaurant.name.toLowerCase();

      if (cuisine.includes("pizza") || cuisine.includes("italian") || name.includes("pizza")) {
        menuToUse = MENU_TEMPLATES.pizza;
      } else if (cuisine.includes("burger") || cuisine.includes("fast food") || name.includes("burger")) {
        menuToUse = MENU_TEMPLATES.burger;
      } else if (cuisine.includes("chinese") || cuisine.includes("asian") || name.includes("wok")) {
        menuToUse = MENU_TEMPLATES.chinese;
      } else if (cuisine.includes("south") || cuisine.includes("dosa")) {
        menuToUse = MENU_TEMPLATES.south;
      } else {
        menuToUse = MENU_TEMPLATES.north;
      }
    }

    return menuToUse.reduce((acc, item) => {
      const category = item.category || "Recommended";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [restaurant]);

  const totalCartPrice = useMemo(() => {
    if (!restaurant) return 0;
    const allItems = Object.values(groupedMenu).flat();
    return Object.keys(cartItems).reduce((total, itemName) => {
        const item = allItems.find(i => i.name === itemName);
        return total + (parseInt(item?.price || 0) * cartItems[itemName]);
    }, 0);
  }, [cartItems, restaurant, groupedMenu]);

  const totalItemsCount = Object.values(cartItems).reduce((a, b) => a + b, 0);

  if (!restaurant) return <div className="p-10 text-center text-xl">Restaurant not found. Please go back and try again.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero Section */}
      <div className="h-80 w-full relative bg-gray-800">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover opacity-90" 
             onError={(e) => {e.target.src = "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1200"}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 md:p-10 text-white w-full max-w-6xl mx-auto">
             <h1 className="text-4xl md:text-6xl font-bold mb-2">{restaurant.name}</h1>
             <p className="text-lg opacity-90">{restaurant.cuisine}</p>
             <p className="text-sm opacity-80 mt-1">{restaurant.address}</p>
             <div className="mt-4 flex gap-4">
                <span className="bg-green-600 px-3 py-1 rounded text-sm font-bold shadow-md">{restaurant.rating} ★</span>
                <span className="bg-orange-500 px-3 py-1 rounded text-sm font-bold shadow-md">35 mins</span>
             </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8">
        
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-300 pb-4 mb-6 text-gray-500 text-lg font-medium">
            <button onClick={() => setActiveTab("Order Online")} className={`pb-4 -mb-4.5 transition ${activeTab === "Order Online" ? "text-zomatoRed border-b-2 border-zomatoRed font-bold" : "hover:text-gray-800"}`}>Order Online</button>
            <button onClick={() => setActiveTab("Overview")} className={`pb-4 -mb-4.5 transition ${activeTab === "Overview" ? "text-zomatoRed border-b-2 border-zomatoRed font-bold" : "hover:text-gray-800"}`}>Overview</button>
            <button onClick={() => setActiveTab("Reviews")} className={`pb-4 -mb-4.5 transition ${activeTab === "Reviews" ? "text-zomatoRed border-b-2 border-zomatoRed font-bold" : "hover:text-gray-800"}`}>Reviews</button>
        </div>

        {/* VIEW 1: ORDER ONLINE */}
        {activeTab === "Order Online" && (
            <div className="flex flex-col md:flex-row gap-8">
                <div className="hidden md:block w-1/4">
                    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                        <h3 className="font-bold text-gray-400 text-sm mb-4 uppercase tracking-wider">Categories</h3>
                        {Object.keys(groupedMenu).map((cat) => (
                            <a key={cat} href={`#${cat}`} className="block py-2 text-gray-700 hover:text-zomatoRed hover:font-bold transition cursor-pointer text-lg">{cat} ({groupedMenu[cat].length})</a>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-3/4">
                    {Object.keys(groupedMenu).map((category) => (
                        <div key={category} id={category} className="mb-10 scroll-mt-24">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-zomatoRed pl-3">{category}</h2>
                            {groupedMenu[category].map((item, index) => (
                                <div key={index} className="flex justify-between items-start mb-8 border-b border-gray-100 pb-6">
                                    <div className="w-2/3 pr-4">
                                        <div className="mb-2"><VegIcon isVeg={item.isVeg} /></div>
                                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                        <p className="text-gray-600 font-medium">₹{item.price}</p>
                                        <p className="text-gray-400 text-sm mt-2 leading-tight">{item.desc}</p>
                                    </div>
                                    <div className="relative w-32 h-28 rounded-xl bg-gray-100 flex-shrink-0">
                                        <img src={item.image} className="w-full h-full object-cover rounded-xl" alt={item.name} onError={(e) => {e.target.src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"}}/>
                                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden w-24">
                                            {getQty(item.name) === 0 ? (
                                                <button onClick={() => updateQty(item, "add")} className="w-full text-green-600 font-bold py-2 hover:bg-green-50 uppercase text-sm">ADD</button>
                                            ) : (
                                                <div className="flex items-center justify-between px-2 py-1 bg-white">
                                                    <button onClick={() => updateQty(item, "remove")} className="text-gray-500 font-bold text-lg px-2">-</button>
                                                    <span className="text-green-600 font-bold text-sm">{getQty(item.name)}</span>
                                                    <button onClick={() => updateQty(item, "add")} className="text-green-600 font-bold text-lg px-2">+</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* VIEW 2: OVERVIEW */}
        {activeTab === "Overview" && (
            <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About this place</h2>
                    
                    <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
                         <div>
                             <h3 className="text-gray-500 font-medium mb-1 uppercase tracking-wide text-sm">Cuisines</h3>
                             <div className="flex flex-wrap gap-2">
                                 {restaurant.cuisine.split(",").map((c, i) => (
                                     <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm border border-gray-200">{c.trim()}</span>
                                 ))}
                             </div>
                         </div>
                    </div>

                    <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
                        <div>
                            <h3 className="text-gray-500 font-medium mb-1 uppercase tracking-wide text-sm">Average Cost</h3>
                            <p className="text-lg font-medium text-gray-800">{restaurant.price}</p>
                            <p className="text-xs text-gray-400">Exclusive of applicable taxes and charges, if any</p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-gray-500 font-medium mb-2 uppercase tracking-wide text-sm">More Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <li className="list-none flex items-center gap-2 text-gray-600"><span className="text-green-500">✔</span> Home Delivery</li>
                            <li className="list-none flex items-center gap-2 text-gray-600"><span className="text-green-500">✔</span> Takeaway Available</li>
                            <li className="list-none flex items-center gap-2 text-gray-600"><span className="text-green-500">✔</span> Indoor Seating</li>
                            <li className="list-none flex items-center gap-2 text-gray-600"><span className="text-green-500">✔</span> Free Wifi</li>
                        </div>
                    </div>
                </div>

                {/* Address Card (WITH FIXED MAP) */}
                <div className="w-full md:w-1/3">
                      <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white">
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">Call</h3>
                          <p className="text-zomatoRed font-medium mb-4">+91 98765 43210</p>
                          
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">Direction</h3>
                          <div className="w-full h-48 bg-gray-200 rounded-lg mb-3 overflow-hidden relative">
                              {/* 🚨 DYNAMIC MAP IFRAME 🚨 */}
                              <iframe 
                                key={mapUrl} // 🚨 FORCE RELOAD ON URL CHANGE 🚨
                                title="map"
                                width="100%" 
                                height="100%" 
                                frameBorder="0" 
                                scrolling="no" 
                                marginHeight="0" 
                                marginWidth="0" 
                                src={mapUrl}
                              ></iframe>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">{restaurant.address}</p>
                      </div>
                </div>
            </div>
        )}

        {/* VIEW 3: REVIEWS */}
        {activeTab === "Reviews" && (
            <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reviews</h2>
                {REVIEWS_DATA.map((review, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 mb-4 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-lg">
                                {review.name.charAt(0)}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800">{review.name}</h4>
                                <p className="text-xs text-gray-400">{review.date}</p>
                            </div>
                            <span className={`ml-auto px-2 py-0.5 rounded text-sm font-bold text-white ${parseFloat(review.rating) >= 4.0 ? 'bg-green-600' : 'bg-yellow-500'}`}>
                                {review.rating} ★
                            </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                ))}
            </div>
        )}

      </div>

      {/* Sticky Cart Bar */}
      {activeTab === "Order Online" && totalItemsCount > 0 && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-50">
           <div className="max-w-4xl mx-auto bg-red-600 text-white rounded-xl shadow-2xl p-4 flex justify-between items-center animate-bounce-short">
              <div className="flex flex-col">
                  <span className="font-bold text-lg uppercase">{totalItemsCount} ITEM{totalItemsCount > 1 ? "S" : ""}</span>
                  <span className="text-sm opacity-90">Total: ₹{totalCartPrice}</span>
              </div>
              <button 
                onClick={() => {
                    const allItems = Object.values(groupedMenu).flat();
                    const finalCart = [];
                    Object.keys(cartItems).forEach(name => {
                        const item = allItems.find(i => i.name === name);
                        for(let i=0; i<cartItems[name]; i++) finalCart.push(item);
                    });
                    navigate('/checkout', { state: { cart: finalCart, restaurantName: restaurant.name } })
                }}
                className="bg-white text-red-600 font-bold px-6 py-2 rounded-lg hover:bg-gray-100 transition shadow-md"
              >
                View Cart →
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;