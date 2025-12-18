import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Star, Clock, MapPin, 
  Heart, Share2, Phone, CheckCircle, Wifi,
  Sparkles, Plus, Minus,
  X, Copy, Facebook, Twitter, Linkedin, MessageCircle, ShoppingCart, ArrowRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const RestaurantPage = ({ city = "Hajipur" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- STATES ---
  const [activeTab, setActiveTab] = useState('Order Online');
  const [selectedCategory, setSelectedCategory] = useState('Recommended');
  const [isLiked, setIsLiked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // --- CART STATE ---
  const [cart, setCart] = useState({}); 

  // --- REVIEW STATES ---
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewText, setNewReviewText] = useState("");

  const defaultReviews = [
    { name: "Diner 38", rating: "4.4", date: "4 days ago", text: "Great food and ambiance! Highly recommended.", initial: "D", color: "bg-purple-500" },
    { name: "Priya S. 39", rating: "4.8", date: "11 days ago", text: "Loved the place. Quick service and tasty food.", initial: "P", color: "bg-blue-500" },
    { name: "Rahul V. 40", rating: "4.0", date: "4 days ago", text: "Decent food. The quantity was good for the price.", initial: "R", color: "bg-orange-500" },
    { name: "Amit Kumar", rating: "5.0", date: "1 month ago", text: "Best pizza in " + city + "! The crust was perfect.", initial: "A", color: "bg-green-500" },
    { name: "Sneha Roy", rating: "3.5", date: "2 months ago", text: "Delivery was a bit late, but food was hot.", initial: "S", color: "bg-red-500" }
  ];

  // --- Initialize Reviews from Local Storage ---
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("restaurantReviews");
    return savedReviews ? JSON.parse(savedReviews) : defaultReviews;
  });

  // --- Save Reviews to Local Storage ---
  useEffect(() => {
    localStorage.setItem("restaurantReviews", JSON.stringify(reviews));
  }, [reviews]);

  // --- HANDLERS ---
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Somato Clone Restaurant',
      text: `Check out this amazing restaurant!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard! ✅");
    setShowShareModal(false);
  };

  // --- CART HANDLERS ---
  const addToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: 1 }));
  };

  const incrementItem = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const decrementItem = (itemId) => {
    setCart((prev) => {
      const newQty = (prev[itemId] || 0) - 1;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const getTotalItems = () => Object.values(cart).reduce((a, b) => a + b, 0);
  
  const getCartTotal = () => {
    let total = 0;
    Object.values(menuItems).flat().forEach(item => {
      if (cart[item.id]) {
        total += parseInt(item.price) * cart[item.id];
      }
    });
    return total;
  };

  const handleProceedToCheckout = () => {
    const cartItemsData = [];
    Object.values(menuItems).flat().forEach(item => {
      if (cart[item.id]) {
        cartItemsData.push({ ...item, quantity: cart[item.id] });
      }
    });

    navigate('/checkout', { 
      state: { 
        cartItems: cartItemsData, 
        totalPrice: getCartTotal(), 
        restaurantName: restaurantInfo.name 
      }
    });
  };

  // --- REVIEW HANDLER ---
  const handleSubmitReview = () => {
    if (newReviewRating === 0) return alert("Please select a star rating!");
    if (!newReviewText.trim()) return alert("Please write a review text!");

    const newReview = {
        name: "You",
        rating: newReviewRating.toString(),
        date: "Just now",
        text: newReviewText,
        initial: "Y",
        color: "bg-red-600"
    };

    setReviews([newReview, ...reviews]);
    setNewReviewRating(0);
    setNewReviewText("");
    setShowReviewModal(false);
  };

  // --- DYNAMIC DATA LOGIC ---
  const incomingData = location.state?.restaurant;
  const FALLBACK_BANNER = "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=1600&q=80";
  
  const defaultInfo = {
    name: "Italian, Fast Food, Beverages",
    address: `Shop 9, Ground Floor, City Center, ${city}`,
    rating: "4.2",
    deliveryTime: "35 mins",
    price: "₹200 for two",
    image: FALLBACK_BANNER
  };

  const restaurantInfo = {
    name: incomingData?.name || defaultInfo.name,
    address: incomingData?.address || (incomingData?.cuisine ? `${incomingData.cuisine}, ${city}` : defaultInfo.address),
    rating: incomingData?.rating || defaultInfo.rating,
    time: incomingData?.deliveryTime || defaultInfo.deliveryTime,
    cost: incomingData?.price || defaultInfo.price,
    bgImage: (incomingData?.image && incomingData.image.startsWith('http')) ? incomingData.image : FALLBACK_BANNER
  };

  const categories = ["Recommended", "Pizzas", "Beverages", "Desserts"];

  // --- FULL MENU DATA ---
  const menuItems = {
    Recommended: [
      { id: 101, name: "Margherita Pizza", price: "249", desc: "Classic cheese pizza with basil and house sauce.", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80", isVeg: true, bestseller: true, votes: 124 },
      { id: 102, name: "Farmhouse Pizza", price: "399", desc: "Delightful combination of onion, capsicum, tomato & grilled mushroom.", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80", isVeg: true, bestseller: false, votes: 85 },
      { id: 103, name: "Garden Fresh Salad", price: "199", desc: "Fresh greens with house dressing and olives.", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80", isVeg: true, bestseller: false, votes: 45 },
      { id: 104, name: "Paneer Tikka Pizza", price: "459", desc: "Spiced paneer, onion, capsicum and red paprika.", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", isVeg: true, bestseller: true, votes: 210 }
    ],
    Pizzas: [
      { id: 201, name: "Pepperoni Pizza", price: "449", desc: "Classic pepperoni with mozzarella cheese.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80", isVeg: false, bestseller: false, votes: 210 },
      { id: 202, name: "Veggie Paradise", price: "399", desc: "Goldern corn, black olives, capsicum & red paprika.", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80", isVeg: true, bestseller: true, votes: 150 },
      { id: 203, name: "Chicken Dominator", price: "549", desc: "Loaded with double pepper barbecue chicken, peri-peri chicken.", image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&q=80", isVeg: false, bestseller: true, votes: 300 },
      { id: 204, name: "Cheese & Corn", price: "299", desc: "Sweet & Juicy Golden corn with 100% real mozzarella cheese.", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80", isVeg: true, bestseller: false, votes: 90 }
    ],
    Beverages: [
      { id: 301, name: "Fresh Juice", price: "99", desc: "Freshly squeezed seasonal fruits.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=800&q=80", isVeg: true, bestseller: false, votes: 30 },
      { id: 302, name: "Cold Coffee", price: "129", desc: "Creamy cold coffee with chocolate topping.", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800&q=80", isVeg: true, bestseller: true, votes: 120 },
      { id: 303, name: "Strawberry Shake", price: "149", desc: "Thick shake with fresh strawberries.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80", isVeg: true, bestseller: false, votes: 55 }
    ],
    Desserts: [
      { id: 401, name: "Chocolate Cake", price: "149", desc: "Rich chocolate layer cake with ganache.", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", isVeg: false, bestseller: true, votes: 310 },
      { id: 402, name: "Brownie with Ice Cream", price: "199", desc: "Hot walnut brownie served with vanilla ice cream.", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", isVeg: false, bestseller: true, votes: 180 }
    ]
  };

  const currentMenu = menuItems[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col relative pb-20">
      
      {/* ================= HERO SECTION ================= */}
      <div className="relative h-[360px] w-full bg-gray-900">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <img 
            src={restaurantInfo.bgImage} 
            alt={restaurantInfo.name} 
            className="w-full h-full object-cover brightness-[0.65]"
            onError={(e) => { e.target.src = FALLBACK_BANNER; }}
          />
        </motion.div>
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
          
          {/* Top Nav */}
          <div className="absolute top-6 left-4 sm:left-8 flex justify-between w-full pr-8 sm:pr-16">
             <motion.button 
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => navigate(-1)} 
               className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition shadow-lg"
             >
               <ArrowLeft className="w-6 h-6" />
             </motion.button>

             <div className="flex gap-3">
               <motion.button 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.95 }}
                 onClick={handleLike}
                 className={`bg-white/20 backdrop-blur-md p-2 rounded-full transition shadow-lg ${isLiked ? 'bg-white text-[#EF4F5F]' : 'text-white hover:bg-white/30'}`}
               >
                 <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}/>
               </motion.button>

               <motion.button 
                 whileHover={{ scale: 1.1 }} 
                 whileTap={{ scale: 0.95 }}
                 onClick={handleShare}
                 className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition shadow-lg"
               >
                 <Share2 className="w-5 h-5"/>
               </motion.button>
             </div>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white">
             <div className="bg-[#E29826] text-xs font-bold px-3 py-1 rounded-md w-fit mb-3 flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" /> Featured
             </div>

             <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight drop-shadow-md">
               {restaurantInfo.name}
             </h1>
             
             <div className="flex items-center gap-2 text-gray-200 text-sm md:text-base mb-4 drop-shadow-sm">
               <MapPin className="w-4 h-4 text-red-400" /> {restaurantInfo.address}
             </div>

             <div className="flex items-center gap-3">
               <div className="bg-[#24963F] text-white px-2 py-1 rounded-lg text-sm font-bold flex items-center gap-1 shadow-md border border-white/20">
                 {restaurantInfo.rating} <Star className="w-3 h-3 fill-current" />
               </div>
               <div className="bg-[#D93E2B] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md border border-white/20 flex items-center gap-1">
                 <Clock className="w-3 h-3" /> {restaurantInfo.time}
               </div>
               <div className="bg-[#8B5CF6] text-white px-3 py-1 rounded-full text-sm font-bold shadow-md border border-white/20">
                 {restaurantInfo.cost}
               </div>
             </div>
          </motion.div>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {["Order Online", "Overview", "Reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 text-lg font-medium transition-all relative ${
                activeTab === tab ? "text-[#EF4F5F]" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-1 bg-[#EF4F5F] rounded-t-md" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[600px] flex-grow w-full">
        <AnimatePresence mode="wait">
          
          {/* --- 1. ORDER ONLINE TAB --- */}
          {activeTab === 'Order Online' && (
            <motion.div 
              key="order"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col md:flex-row gap-8"
            >
              {/* Sidebar */}
              <div className="w-full md:w-1/4">
                <div className="sticky top-24 bg-transparent">
                   <h3 className="text-xs font-bold text-[#EF4F5F] uppercase tracking-widest mb-4 flex items-center gap-2 pl-2">
                     <Sparkles className="w-3 h-3" /> Menu Categories
                   </h3>
                   <div className="flex flex-col gap-2 border-r border-gray-100 pr-2">
                     {categories.map((cat) => (
                       <motion.button
                         key={cat}
                         whileHover={{ y: -4, scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={() => setSelectedCategory(cat)}
                         className={`text-left px-5 py-4 rounded-xl text-base transition-all flex justify-between items-center mb-1 ${
                           selectedCategory === cat
                             ? 'bg-gradient-to-r from-[#EF4F5F] to-orange-500 text-white font-bold shadow-lg'
                             : 'text-gray-600 hover:bg-red-50 hover:text-[#EF4F5F] font-medium'
                         }`}
                       >
                         {cat}
                         {selectedCategory === cat && <motion.div layoutId="dot" className="w-2 h-2 rounded-full bg-white" />}
                       </motion.button>
                     ))}
                   </div>
                </div>
              </div>

              {/* Menu List */}
              <div className="w-full md:w-3/4">
                <motion.div key={selectedCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    {selectedCategory} <span className="text-orange-400">✦</span>
                  </h2>

                  <div className="flex flex-col gap-6">
                    {currentMenu.map((item, index) => (
                      <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 items-center md:items-start border border-transparent hover:border-gray-100 group"
                      >
                        <div className="relative w-full md:w-44 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            onError={(e) => { e.target.src = FALLBACK_BANNER; }}
                          />
                          {item.bestseller && (
                            <div className="absolute top-0 left-0 bg-[#E29826] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg uppercase shadow-sm">Bestseller</div>
                          )}
                        </div>

                        <div className="flex-1 w-full flex flex-col justify-between h-full min-h-[160px]">
                          <div>
                             <div className="flex justify-between items-start">
                               <div className="flex items-center gap-2 mb-2">
                                  <div className={`border ${item.isVeg ? "border-green-600" : "border-red-600"} p-[2px] w-4 h-4 flex items-center justify-center rounded-[2px]`}>
                                      <div className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}></div>
                                  </div>
                                  <div className="flex items-center bg-[#FCF5EE] border border-[#F2D7B7] rounded px-1.5 py-0.5 gap-1 text-[10px] text-[#E09D3F] font-bold">
                                    <Star className="w-2.5 h-2.5 fill-current" /> {item.votes} votes
                                  </div>
                               </div>
                               <span className="text-xl font-bold text-[#EF4F5F]">₹{item.price}</span>
                             </div>
                             <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-[#EF4F5F] transition-colors">{item.name}</h3>
                             <p className="text-gray-500 text-sm mb-2 line-clamp-2">{item.desc}</p>
                          </div>
                          
                          {cart[item.id] ? (
                            <div className="flex items-center gap-4 mt-2">
                                <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => decrementItem(item.id)}
                                    className="w-8 h-8 rounded-lg bg-red-100 text-[#EF4F5F] flex items-center justify-center font-bold hover:bg-red-200"
                                >
                                    <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="font-bold text-lg w-4 text-center">{cart[item.id]}</span>
                                <motion.button 
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => incrementItem(item.id)}
                                    className="w-8 h-8 rounded-lg bg-[#EF4F5F] text-white flex items-center justify-center font-bold hover:bg-red-600"
                                >
                                    <Plus className="w-4 h-4" />
                                </motion.button>
                            </div>
                          ) : (
                            <motion.button 
                                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => addToCart(item.id)}
                                className="bg-[#24963F] hover:bg-[#1e7e34] text-white text-sm font-bold px-8 py-2.5 rounded-lg shadow-md transition-all w-fit flex items-center gap-2 mt-2"
                            >
                                ADD TO CART <Plus className="w-3 h-3" />
                            </motion.button>
                          )}

                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* --- 2. OVERVIEW TAB --- */}
          {activeTab === 'Overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">About this place</h2>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">Known for its delicious {restaurantInfo.name} and excellent service.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-blue-600 font-bold mb-4 flex items-center gap-2">Cuisines</h3>
                        <div className="flex gap-3 flex-wrap">
                           {["Italian", "Fast Food", "Beverages"].map(c => <span key={c} className="bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm">{c}</span>)}
                        </div>
                     </div>
                     <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
                        <h3 className="text-green-600 font-bold mb-4 flex items-center gap-2">Average Cost</h3>
                        <p className="text-3xl font-bold text-gray-800">{restaurantInfo.cost}</p>
                     </div>
                  </div>

                  {/* Amenities */}
                  <div className="mt-8 bg-[#F9FAFB] p-6 rounded-2xl border border-gray-100">
                     <h3 className="text-purple-600 font-bold mb-6 flex items-center gap-2"><Star className="w-5 h-5"/> Amenities</h3>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
                        <div className="flex items-center gap-3"><div className="bg-green-100 p-1.5 rounded-full"><CheckCircle className="text-green-600 w-4 h-4"/></div> Home Delivery</div>
                        <div className="flex items-center gap-3"><div className="bg-blue-100 p-1.5 rounded-full"><CheckCircle className="text-blue-600 w-4 h-4"/></div> Takeaway Available</div>
                        <div className="flex items-center gap-3"><div className="bg-orange-100 p-1.5 rounded-full"><CheckCircle className="text-orange-600 w-4 h-4"/></div> Indoor Seating</div>
                        <div className="flex items-center gap-3"><div className="bg-purple-100 p-1.5 rounded-full"><Wifi className="text-purple-600 w-4 h-4"/></div> Free Wifi</div>
                     </div>
                  </div>

                  {/* MAP */}
                  <div className="mt-8">
                    <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2 text-xl">
                      <MapPin className="w-5 h-5 text-red-500"/> Location
                    </h3>
                    <div className="w-full h-72 bg-gray-200 rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative group">
                      <iframe 
                        title="Map"
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        src={`http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(restaurantInfo.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                        className="filter grayscale group-hover:grayscale-0 transition-all duration-500"
                      ></iframe>
                    </div>
                    <p className="mt-3 text-gray-500 text-sm flex items-center gap-1">
                      <MapPin className="w-3 h-3"/> {restaurantInfo.address}
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="mt-8 bg-gradient-to-r from-red-50 to-white p-6 rounded-2xl border border-red-100 flex flex-col md:flex-row justify-between items-center gap-4">
                     <div>
                       <h3 className="text-red-500 font-bold mb-1 flex items-center gap-2"><Phone className="w-4 h-4"/> Contact Us</h3>
                       <p className="text-2xl font-bold text-gray-800">+91 98765-43218</p>
                     </div>
                     <motion.button 
                       whileHover={{ scale: 1.05 }}
                       className="bg-[#EF4F5F] text-white px-8 py-3 rounded-xl shadow-lg font-bold hover:bg-red-600 flex items-center gap-2"
                     >
                       <Phone className="w-4 h-4" /> Call Now
                     </motion.button>
                  </div>
               </div>
            </motion.div>
          )}

          {/* --- 3. REVIEWS TAB --- */}
          {activeTab === 'Reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="flex items-center gap-3 mb-6">
                 <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
                 <span className="bg-[#E29826] text-white text-xs font-bold px-2 py-1 rounded shadow-sm">{reviews.length} Reviews</span>
               </div>

               {reviews.map((review, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: i * 0.1 }}
                   className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-5 hover:shadow-md transition-shadow"
                 >
                    <div className={`w-14 h-14 rounded-full ${review.color} flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md`}>{review.initial}</div>
                    <div className="w-full">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="text-lg font-bold text-gray-800">{review.name}</h4>
                          <span className="bg-[#24963F] text-white text-sm px-3 py-1 rounded-lg font-bold shadow-sm">{review.rating} ★</span>
                       </div>
                       <p className="text-xs text-gray-400 mb-1">{review.date}</p>
                       <p className="text-gray-600 leading-relaxed mt-2">{review.text}</p>
                    </div>
                 </motion.div>
               ))}

               {/* Write Review Button */}
               <motion.button
                 type="button"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={() => setShowReviewModal(true)}
                 className="w-full bg-[#EF4F5F] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 mt-8"
               >
                 <Star className="w-5 h-5 fill-current" /> Write a Review
               </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ================= NEW FLOATING CHECKOUT BUTTON ================= */}
      {getTotalItems() > 0 && (
        <motion.button
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          onClick={handleProceedToCheckout}
          className="fixed bottom-4 right-4 bg-[#24963F] text-white px-6 py-3 rounded-full font-bold text-lg shadow-2xl z-[5000] flex items-center gap-2 hover:bg-[#1e7e34] transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          Checkout ({getTotalItems()})
          <ArrowRight className="w-5 h-5 ml-1" />
        </motion.button>
      )}

      {/* ================= SHARE MODAL ================= */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative"
            >
              <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5"/></button>
              
              <h3 className="text-xl font-bold text-gray-800 mb-1">Share Restaurant</h3>
              <p className="text-gray-500 text-sm mb-6">Share this place with your friends!</p>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <a href={`https://wa.me/?text=${encodeURIComponent(`Check out ${restaurantInfo.name}! ${window.location.href}`)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"><MessageCircle className="w-6 h-6"/></div>
                  <span className="text-xs text-gray-600 font-medium">WhatsApp</span>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"><Facebook className="w-6 h-6"/></div>
                  <span className="text-xs text-gray-600 font-medium">Facebook</span>
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${restaurantInfo.name}!`)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"><Twitter className="w-6 h-6"/></div>
                  <span className="text-xs text-gray-600 font-medium">Twitter</span>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"><Linkedin className="w-6 h-6"/></div>
                  <span className="text-xs text-gray-600 font-medium">LinkedIn</span>
                </a>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl border border-gray-200">
                <p className="text-xs text-gray-500 truncate flex-1">{window.location.href}</p>
                <button onClick={copyToClipboard} className="bg-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 border border-gray-200 flex items-center gap-1"><Copy className="w-3 h-3"/> Copy</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= WRITE REVIEW MODAL ================= */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowReviewModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 50 }} 
              onClick={(e) => e.stopPropagation()} 
              className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-2xl"
            >
              <button onClick={() => setShowReviewModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><X className="w-6 h-6"/></button>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Write a Review</h3>
              
              <div className="mb-6 text-center">
                <p className="text-gray-600 font-medium mb-3">Rate your experience</p>
                <div className="flex gap-3 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewReviewRating(star)} className="transition-transform hover:scale-125 focus:outline-none">
                      <Star className={`w-10 h-10 ${star <= newReviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 font-medium mb-2">Review Text</p>
                <textarea 
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  placeholder="Share details of your own experience at this place..."
                  className="w-full h-32 border border-gray-300 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#EF4F5F] text-gray-700"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowReviewModal(false)} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={handleSubmitReview} className="bg-[#EF4F5F] text-white px-8 py-2 rounded-lg font-bold shadow-md hover:bg-red-600">Submit Review</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default RestaurantPage;