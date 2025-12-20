import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OrderTrackingModal from "../components/OrderTrackingModal";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Package, Heart, MapPin, ArrowRight, Clock 
} from "lucide-react";

// --- FALLBACK IMAGE (Used if restaurant image is missing or broken) ---
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60";

// --- SAMPLE DATA (For preview if DB is empty) ---
const SAMPLE_ORDERS = [
    {
        _id: "ORD-FCAE4A",
        restaurant: "Barbeque Nation",
        status: "CONFIRMED",
        totalAmount: 1257,
        date: new Date().toISOString(),
        items: [{ name: "Farmhouse Pizza", price: 450, quantity: 1, isVeg: true }],
        deliveryAddress: { address: "Flat 402, Lotus Apartment" }
    }
];

const SAMPLE_FAVORITES = [
    {
        _id: "fav1",
        restaurantName: "Domino's Pizza",
        cuisine: "Pizza, Fast Food",
        rating: 4.2,
        time: "30 min",
        image: "https://b.zmtcdn.com/data/pictures/chains/4/50674/970a257c7c32087449339e1284793774.jpg"
    }
];

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // --- STATE ---
    const [orders, setOrders] = useState(SAMPLE_ORDERS);
    const [favorites, setFavorites] = useState(SAMPLE_FAVORITES);
    const [activeTab, setActiveTab] = useState("orders");
    
    // --- UI STATES ---
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editName, setEditName] = useState(user ? user.name : "");
    const [trackingOrder, setTrackingOrder] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    // --- 1. FETCH DATA ---
    useEffect(() => {
        const fetchData = async () => {
            if (!user?.email) return;
            const baseUrl = "https://somato-new.vercel.app"; // Backend URL

            try {
                // Fetch Orders
                const orderRes = await fetch(`${baseUrl}/api/orders?email=${user.email}`);
                if (orderRes.ok) {
                    const orderData = await orderRes.json();
                    if (Array.isArray(orderData) && orderData.length > 0) {
                        // ✅ SORT: Newest First
                        const sorted = orderData.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
                        setOrders(sorted);
                    }
                }

                // Fetch Favorites
                const favRes = await fetch(`${baseUrl}/api/favorites?email=${user.email}`);
                if (favRes.ok) {
                    const favData = await favRes.json();
                    if (Array.isArray(favData) && favData.length > 0) {
                        setFavorites(favData);
                    }
                }
            } catch (error) {
                console.log("Using sample data due to network error");
            }
        };
        fetchData();
    }, [user, activeTab]);

    // --- 2. REMOVE FAVORITE ---
    const handleRemoveFavorite = async (id) => {
        const oldFavs = [...favorites];
        setFavorites(favorites.filter(f => f._id !== id)); 
        try {
            await fetch(`https://somato-new.vercel.app/api/favorites/${id}`, { method: "DELETE" });
        } catch (error) {
            setFavorites(oldFavs); 
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const toggleDetails = (id) => {
        setExpandedOrderId(expandedOrderId === id ? null : id);
    };

    if (!user) return <div className="min-h-screen flex justify-center items-center">Please Log In</div>;

    return (
        <div className="min-h-screen w-full bg-[#f1ddf1] relative pt-4 overflow-x-hidden">
            
            {trackingOrder && (
                <OrderTrackingModal order={trackingOrder} onClose={() => setTrackingOrder(null)} 
                />
            )}
            <div className="max-w-5xl mx-auto px-4 space-y-4 md:space-y-8 overflow-hidden">
                
                {/* --- HEADER --- */}
                <div className="bg-white rounded-[2rem] p-5 md:p-8 ... flex flex-col lg:flex-row overflow-hidden">
                    {/* Avatar */}
                    <div className="w-32 h-32 bg-[#5826bf] rounded-[2rem] flex items-center justify-center text-white text-5xl font-bold flex-shrink-0 shadow-lg overflow-hidden">
                        {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : user.name.charAt(0)}
                    </div>
                    
                    {/* User Info (Cleaned Up) */}
                    <div className="flex-1 text-left space-y-3">
                        <h1 className="text-4xl font-bold text-slate-800">{user.name}</h1>
                        <p className="text-slate-500">{user.email}</p>
                        
                        <div className="flex gap-4 pt-4">
                            <button onClick={() => setIsEditModalOpen(true)} className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50">Edit Profile</button>
                            <button onClick={handleLogout} className="px-6 py-2 bg-[#EF4F5F] text-white rounded-lg text-sm font-bold hover:bg-red-600">Log Out</button>
                        </div>
                    </div>

                    {/* Stats (Orders & Favorites Only) */}
                    <div className="flex justify-center gap-3 w-full lg:w-auto mt-2 lg:mt-0">
                        <div className="w-24 h-24 bg-[#3b82f6] rounded-2xl flex flex-col justify-center items-center text-white shadow-lg shadow-blue-100">
                            <Package size={20} className="mb-1 opacity-80" />
                            <span className="text-[10px] font-bold uppercase opacity-80">Orders</span>
                            <span className="text-3xl font-black">{orders.length}</span>
                        </div>
                        <div className="w-24 h-24 bg-[#FF4F81] rounded-2xl flex flex-col justify-center items-center text-white shadow-lg shadow-pink-100">
                            <Heart size={20} className="mb-1 opacity-80" />
                            <span className="text-[10px] font-bold uppercase opacity-80">Favorites</span>
                            <span className="text-3xl font-black">{favorites.length}</span>
                        </div>
                    </div>
                </div>

                {/* --- TABS --- */}
                <div className="flex gap-8 border-b border-gray-200">
                    <button onClick={() => setActiveTab("orders")} className={`pb-3 text-lg font-bold ${activeTab === "orders" ? "text-slate-800 border-b-4 border-slate-800" : "text-slate-400"}`}>Past Orders</button>
                    <button onClick={() => setActiveTab("favorites")} className={`pb-3 text-lg font-bold ${activeTab === "favorites" ? "text-slate-800 border-b-4 border-slate-800" : "text-slate-400"}`}>Favorites</button>
                </div>

                {/* --- ORDERS SECTION --- */}
                {activeTab === "orders" && (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <motion.div 
                                key={order._id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🥡</div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">{order.restaurant || "Restaurant Name"}</h3>
                                            <p className="text-xs text-slate-400 font-bold mt-1">ORDER #{order._id.slice(-6).toUpperCase()}</p>
                                            <p className="text-xs text-slate-400">{new Date(order.date || order.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                        {order.status || "CONFIRMED"}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-slate-700 font-medium text-sm">
                                        {order.items.map(i => i.name).join(", ")}
                                    </p>
                                </div>

                                <div className="border-t border-dashed border-slate-200 my-4"></div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">TOTAL PAID</p>
                                        <p className="text-xl font-black text-slate-800">₹{order.totalAmount}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <button 
                                            onClick={() => toggleDetails(order._id)}
                                            className="text-slate-500 font-bold text-sm underline hover:text-slate-800"
                                        >
                                            {expandedOrderId === order._id ? "Hide Details" : "View Details"}
                                        </button>
                                        <button 
                                            onClick={() => setTrackingOrder(order)}
                                            className="bg-[#EF4F5F] text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md hover:bg-red-600 transition-colors"
                                        >
                                            <MapPin size={16} /> Track
                                        </button>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                <AnimatePresence>
                                    {expandedOrderId === order._id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mt-4 pt-4 border-t border-slate-100 bg-slate-50/50 px-4 md:px-6 pb-4"
                                        >
                                            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Order Summary</h4>
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex justify-between text-sm text-slate-600 mb-2">
                                                    <span>{item.quantity} x {item.name}</span>
                                                    <span className="font-bold">₹{item.price}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* --- FAVORITES SECTION --- */}
                {activeTab === "favorites" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {favorites.length > 0 ? (
                            favorites.map((fav, index) => (
                                <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-40 bg-slate-200 relative group">
                                        
                                        {/* 🔥 IMAGE FIX: Uses DB image, falls back to food image if broken */}
                                        <img 
                                            src={fav.image && fav.image.length > 10 ? fav.image : FALLBACK_IMAGE} 
                                            alt={fav.restaurantName} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => { e.target.src = FALLBACK_IMAGE; }} 
                                        />
                                        
                                        <button 
                                            onClick={() => handleRemoveFavorite(fav._id)}
                                            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 hover:scale-110 transition-transform"
                                        >
                                            <Heart size={16} fill="currentColor" />
                                        </button>
                                    </div>
                                    
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{fav.restaurantName}</h3>
                                            <div className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">
                                                {fav.rating || 4.2} ★
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-4">{fav.cuisine || "Multi-cuisine"}</p>
                                        
                                        <div className="border-t border-slate-100 pt-3 flex justify-between items-center">
                                            <span className="text-xs font-bold text-slate-400">{fav.time || "30 mins"}</span>
                                            <Link to="/delivery" className="text-[#EF4F5F] text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                                                Order Now <ArrowRight size={12} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-20 bg-white rounded-xl border border-dashed border-slate-200">
                                <Heart size={40} className="mx-auto text-slate-300 mb-3" />
                                <h3 className="text-lg font-bold text-slate-600">No Favorites Yet</h3>
                                <p className="text-slate-400">Heart your favorite restaurants to save them here.</p>
                            </div>
                        )}
                    </div>
                )}

            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10">
                        <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                        <input className="w-full border p-3 rounded-lg mb-4" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <button onClick={() => setIsEditModalOpen(false)} className="w-full bg-[#EF4F5F] text-white py-3 rounded-lg font-bold">Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;