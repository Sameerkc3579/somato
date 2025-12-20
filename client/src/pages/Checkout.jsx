import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion"; 
import { ArrowLeft, ShoppingBag, MapPin, CheckCircle, Sparkles, Star, Zap, Gift, TrendingUp } from 'lucide-react';

const Checkout = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // --- UI STATE ---
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- DATA ---
    const cartItems = state?.cartItems || [];
    const restaurantName = state?.restaurantName || "Restaurant";
    const itemTotal = state?.totalPrice || 0;
    const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

    const [deliveryDetails, setDeliveryDetails] = useState({
        name: user?.name || "Guest",
        email: user?.email || "guest@example.com",
        address: "Flat 402, Lotus Apartment, Gandhi Chowk, Hajipur, Bihar - 844101"
    });
    const [tempDetails, setTempDetails] = useState({ ...deliveryDetails });

    // --- CALCULATIONS ---
    const deliveryFee = 40;
    const platformFee = 10;
    const gstAmount = Math.round(itemTotal * 0.05);
    const discountAmount = itemTotal > 500 ? 50 : 0;
    const totalAmount = itemTotal + deliveryFee + platformFee + gstAmount - discountAmount;

    // --- HANDLERS ---
    const openEditModal = () => {
        setTempDetails({ ...deliveryDetails });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempDetails(prev => ({ ...prev, [name]: value }));
    };

    const saveAddress = () => {
        setDeliveryDetails({ ...tempDetails });
        setIsModalOpen(false);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        const orderData = {
            userEmail: user?.email || "guest@example.com",
            restaurant: restaurantName,
            items: cartItems,
            totalAmount: totalAmount,
            deliveryAddress: deliveryDetails,
            status: "Confirmed",
            date: new Date()
        };

        const backendUrl = window.location.hostname === "localhost"
            ? "http://localhost:4000/api/orders"
            : "https://somato-new.vercel.app/api/orders";

        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                setIsOrderPlaced(true);
                setTimeout(() => {
                    navigate("/order-success");
                }, 4000);
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("Order Error:", error);
            alert("Server not responding.");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-[#fff5f7] via-[#fff0f5] to-[#f3e8ff]">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="bg-white p-8 rounded-3xl shadow-xl text-center border border-white"
                >
                    <div className="text-5xl mb-4">🥡</div>
                    <h2 className="text-xl font-bold text-slate-800">Cart is Empty</h2>
                    <p className="text-slate-500 mb-6 text-sm">Add some delicious food first!</p>
                    <Link to="/delivery" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-md block">
                        Browse Food
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-[#e3c2e0] relative font-sans pt-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>
            {/* 1. ANIMATED BACKGROUND ELEMENTS (Restored) */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 20 + i * 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute rounded-full blur-3xl opacity-10"
                    style={{
                        width: `${100 + i * 40}px`,
                        height: `${100 + i * 40}px`,
                        background: `linear-gradient(135deg, ${['#ec4899', '#8b5cf6', '#f97316', '#06b6d4', '#f43f5e', '#a855f7'][i]}, white)`,
                        top: `${15 + i * 15}%`,
                        left: `${10 + i * 15}%`,
                    }}
                />
            ))}

            <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
                
                {/* 2. HEADER SECTION */}
                <motion.div 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    className="flex items-center justify-between mb-8"
                >
                    <div className="flex items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(-1)} 
                            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md border border-purple-100"
                        >
                            <ArrowLeft className="w-5 h-5 text-purple-700" />
                        </motion.button>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Checkout</h1>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* 3. ORDER SUMMARY CARD */}
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50 -translate-y-1"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white">
                                    <ShoppingBag size={20} />
                                </div>
                                {/* UPDATED SECTION: ADDED ITEM COUNT BELOW TITLE */}
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 leading-none">Your Order</h2>
                                    <p className="text-sm text-slate-500 font-medium mt-1">{totalItems} items in cart</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {cartItems.map((item, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 border rounded flex items-center justify-center ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                                                <div className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-slate-800">₹{item.price}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* 4. DELIVERY ADDRESS CARD */}
                        <motion.div 
                            initial={{ x: -50, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{ delay: 0.1 }}
                            className="bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/50 -translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                                        <MapPin size={20} />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800">Delivery Address</h2>
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                    onClick={openEditModal} 
                                    className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg"
                                >
                                    CHANGE
                                </motion.button>
                            </div>
                            <motion.div 
                                whileHover={{ y: -2 }}
                                className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm flex gap-4"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-purple-400 rounded-xl flex items-center justify-center text-white font-bold shadow-md">{deliveryDetails.name.charAt(0)}</div>
                                <div className="text-sm">
                                    <h3 className="font-bold text-slate-800">{deliveryDetails.name}</h3>
                                    <p className="text-slate-500">{deliveryDetails.email}</p>
                                    <p className="text-slate-600 mt-1">{deliveryDetails.address}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: BILL SUMMARY */}
                    <div className="lg:col-span-1">
                        <motion.div 
                            initial={{ x: 50, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }} 
                            transition={{ delay: 0.2 }}
                            className="sticky top-24 bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 space-y-4 -translate-y-1"
                        >
                            <h2 className="text-xl font-bold text-slate-800 mb-4">Bill Summary</h2>
                            <div className="space-y-2.5">
                                {[
                                    { label: 'Item Total', val: itemTotal, icon: ShoppingBag, color: 'text-pink-500' },
                                    { label: 'Delivery Fee', val: deliveryFee, icon: TrendingUp, color: 'text-blue-500' },
                                    { label: 'Platform Fee', val: platformFee, icon: Zap, color: 'text-amber-500' },
                                    { label: 'GST (5%)', val: gstAmount, icon: Star, color: 'text-purple-500' }
                                ].map((item, idx) => (
                                    <motion.div 
                                        key={idx} 
                                        whileHover={{ x: 5 }}
                                        className="bg-white p-3.5 rounded-xl shadow-md border border-gray-50 flex justify-between items-center"
                                    >
                                        <span className="text-xs font-bold text-slate-600 flex items-center gap-2">
                                            <item.icon size={14} className={item.color} /> {item.label}
                                        </span>
                                        <span className="text-sm font-bold text-slate-800">₹{item.val}</span>
                                    </motion.div>
                                ))}

                                {/* ALWAYS VISIBLE DISCOUNT SECTION */}
                                <motion.div 
                                    whileHover={{ x: 5 }}
                                    className={`p-3.5 rounded-xl shadow-md flex justify-between items-center transition-colors ${discountAmount > 0 ? 'bg-green-50 border border-green-100 text-green-700' : 'bg-white border border-gray-50 text-slate-400'}`}
                                >
                                    <span className="text-xs font-bold flex items-center gap-2">
                                        <Gift size={14} /> Discount
                                    </span>
                                    <span className="text-sm font-bold">{discountAmount > 0 ? `-₹${discountAmount}` : '₹0'}</span>
                                </motion.div>
                            </div>

                            <div className="pt-4 border-t border-dashed border-gray-200 mt-4 flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-tighter">Total Amount</span>
                                <div className="text-right">
                                    <motion.span 
                                        animate={{ scale: [1, 1.05, 1] }} 
                                        transition={{ repeat: Infinity, duration: 2 }} 
                                        className="text-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent block"
                                    >
                                        ₹{totalAmount}
                                    </motion.span>
                                    <p className="text-[10px] text-slate-400 font-bold leading-none">Inclusive of all taxes</p>
                                </div>
                            </div>

                            {/* ANIMATED BUTTON */}
                            <motion.button 
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.98 }} 
                                onClick={handlePlaceOrder} 
                                disabled={loading} 
                                className="w-full py-4 mt-4 bg-gradient-to-r from-[#a832f0] to-[#f00b51] text-white rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 relative overflow-hidden group"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                                {loading ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" fill="white" fillOpacity="0.8"/>
                                            <circle cx="18" cy="6" r="2" fill="white" fillOpacity="0.8"/>
                                            <circle cx="6" cy="18" r="1.5" fill="white" fillOpacity="0.8"/>
                                        </svg>
                                        Place Order →
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CELEBRATION MODAL */}
            <AnimatePresence>
                {isOrderPlaced && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-gradient-to-br from-purple-900/50 via-pink-900/50 to-rose-900/50 backdrop-blur-md flex items-center justify-center overflow-hidden"
                    >
                        {/* Confetti Animation */}
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 0, x: 0, opacity: 1, scale: 1 }}
                                animate={{
                                    y: [0, -300, -600],
                                    x: [0, Math.random() * 400 - 200, Math.random() * 600 - 300],
                                    rotate: [0, Math.random() * 720],
                                    opacity: [1, 1, 0],
                                    scale: [1, 1.5, 0.5]
                                }}
                                transition={{
                                    duration: 3,
                                    delay: Math.random() * 0.8,
                                    ease: "easeOut"
                                }}
                                className="absolute bottom-0 left-1/2"
                                style={{
                                    width: `${10 + Math.random() * 10}px`,
                                    height: `${10 + Math.random() * 10}px`,
                                    background: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'][Math.floor(Math.random() * 7)],
                                    borderRadius: Math.random() > 0.5 ? '50%' : '0%'
                                }}
                            />
                        ))}

                        {/* Fireworks Animation */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`firework-${i}`}
                                initial={{ scale: 0, opacity: 1 }}
                                animate={{
                                    scale: [0, 2, 3],
                                    opacity: [1, 0.5, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    delay: 0.5 + i * 0.2,
                                    ease: "easeOut"
                                }}
                                className="absolute border-4 rounded-full"
                                style={{
                                    top: `${30 + Math.random() * 40}%`,
                                    left: `${20 + Math.random() * 60}%`,
                                    width: '100px',
                                    height: '100px',
                                    borderColor: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'][Math.floor(Math.random() * 7)],
                                }}
                            />
                        ))}

                        {/* Success Card */}
                        <motion.div 
                            initial={{ scale: 0, rotate: -180 }} 
                            animate={{ scale: 1, rotate: 0 }} 
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            className="bg-white rounded-3xl p-16 max-w-lg mx-4 relative overflow-hidden text-center shadow-2xl"
                        >
                            {/* Animated BG Inside Card */}
                            <motion.div 
                                animate={{ background: [
                                    'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
                                    'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 70%)'
                                ] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute inset-0"
                            />

                            <div className="relative z-10">
                                {/* Success Icon Layers */}
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    {[0, 1, 2, 3].map((i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: [1, 2.5, 4], opacity: [0.5, 0.2, 0] }}
                                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                                            className="absolute inset-0 border-4 border-green-500 rounded-full"
                                        />
                                    ))}
                                    <motion.div 
                                        initial={{ scale: 0 }} 
                                        animate={{ scale: 1 }} 
                                        transition={{ delay: 0.5, type: "spring" }}
                                        className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-xl"
                                    >
                                        <CheckCircle className="w-16 h-16 text-white" />
                                    </motion.div>
                                </div>

                                <motion.h2 
                                    animate={{ scale: [1, 1.05, 1] }} 
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-4xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent font-bold mb-4"
                                >
                                    Order Placed! 🎉
                                </motion.h2>
                                <p className="text-slate-600 text-lg mb-8">Your feast is being prepared at <br/> <span className="font-bold text-purple-600">{restaurantName}</span></p>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                                    <motion.div 
                                        initial={{ width: 0 }} 
                                        animate={{ width: "100%" }} 
                                        transition={{ duration: 3.5, ease: "easeInOut" }} 
                                        className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" 
                                    />
                                </div>
                                <p className="text-sm text-slate-400 animate-pulse uppercase tracking-widest font-bold">Redirecting...</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EDIT MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-lg flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ y: 50, scale: 0.9 }} 
                            animate={{ y: 0, scale: 1 }} 
                            exit={{ y: 50, scale: 0.9 }}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-8"
                        >
                            <h3 className="text-xl font-bold text-slate-800 mb-6 tracking-tight">Update Details</h3>
                            <div className="space-y-4">
                                <input type="text" name="name" value={tempDetails.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Name" />
                                <textarea rows="3" name="address" value={tempDetails.address} onChange={handleInputChange} className="w-full bg-slate-50 border border-gray-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none" placeholder="Address" />
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-slate-400 text-sm hover:bg-slate-50">CANCEL</button>
                                <button onClick={saveAddress} className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-sm shadow-md transition-transform active:scale-95">SAVE CHANGES</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Checkout;