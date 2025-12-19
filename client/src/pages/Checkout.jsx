import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Checkout = () => { 
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- STATE FOR ADDRESS MANAGEMENT ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: user?.name || "Guest",
    email: user?.email || "guest@example.com",
    address: "Flat 402, Lotus Apartment, Gandhi Chowk, Hajipur, Bihar - 844101"
  });

  const [tempDetails, setTempDetails] = useState({ ...deliveryDetails });

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

  // --- CART LOGIC ---
  const cartItems = state?.cartItems || [];
  const restaurantName = state?.restaurantName || "Restaurant";
  const itemTotal = state?.totalPrice || 0;

  const deliveryFee = 40;
  const platformFee = 10;
  const grandTotal = itemTotal + deliveryFee + platformFee;

  // --- 🔥 LOGIC UPDATE: Save to Database (MongoDB) ---
  const handlePlaceOrder = async () => {
    setLoading(true);

    // 1. Prepare Order Data with User Email
    const orderData = {
        userEmail: user?.email || "guest@example.com", // CRITICAL: This connects the order to your account
        restaurant: restaurantName,
        items: cartItems,
        totalAmount: grandTotal,
        deliveryAddress: deliveryDetails,
        status: "Confirmed" 
    };

    try {
        // 2. Send Data to Server (Change localhost to IP if using real phone)
        const response = await fetch("https://somato-new.vercel.app/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            // 3. Show Success Animation
            setIsOrderPlaced(true);
            setTimeout(() => {
                navigate("/order-success");
            }, 2000);
        } else {
            alert("Failed to place order on server.");
        }
    } catch (error) {
        console.error("Order Error:", error);
        alert("Server not responding. Is your backend running?");
    } finally {
        setLoading(false);
    }
  };

  // --- EMPTY CART STATE ---
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in-up">Your Cart is Empty 😕</h2>
        <Link to="/delivery" className="bg-[#EF4F5F] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-600 transition animate-fade-in-up delay-100">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent pt-10 pb-20 px-4 animate-fade-in">
      
      {/* --- SUCCESS MODAL --- */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform scale-100 transition-transform animate-fade-in-up">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                   <span className="text-4xl text-green-600">✓</span>
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
               <p className="text-gray-500 mb-6">Your food is being prepared at <span className="font-bold">{restaurantName}</span>.</p>
               <p className="text-sm text-gray-400">Redirecting...</p>
           </div>
        </div>
      )}

      {/* --- EDIT ADDRESS MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg text-gray-800">Edit Delivery Details</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl font-bold transition-colors">&times;</button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input type="text" name="name" value={tempDetails.name} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 transition-all duration-300 focus:outline-none focus:border-[#EF4F5F] focus:ring-4 focus:ring-red-50 bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" value={tempDetails.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 transition-all duration-300 focus:outline-none focus:border-[#EF4F5F] focus:ring-4 focus:ring-red-50 bg-gray-50 focus:bg-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea name="address" rows="3" value={tempDetails.address} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-3 transition-all duration-300 focus:outline-none focus:border-[#EF4F5F] focus:ring-4 focus:ring-red-50 bg-gray-50 focus:bg-white resize-none" />
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                    <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
                    <button onClick={saveAddress} className="px-6 py-2 bg-[#EF4F5F] text-white font-bold rounded-lg hover:bg-red-600 shadow-md transition hover:-translate-y-0.5">Save Changes</button>
                </div>
            </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="md:col-span-2 space-y-6">
           {/* Order Summary Card */}
           <div className="glass-card p-6 rounded-2xl shadow-sm border border-white/50 animate-fade-in-up delay-100">
               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <span className="text-[#EF4F5F]">🥡</span> Order Summary
               </h2>
               <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider font-semibold">From {restaurantName}</p>
               {cartItems.map((item, index) => (
                   <div key={index} className="flex justify-between items-center mb-4 border-b border-gray-200/60 pb-4 last:border-0 last:pb-0">
                       <div className="flex items-center gap-3">
                           <div className={`w-4 h-4 border flex items-center justify-center rounded-sm ${item.isVeg ? "border-green-600" : "border-red-600"}`}>
                               <div className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}></div>
                           </div>
                           <div>
                               <h3 className="text-gray-800 font-medium">{item.name}</h3>
                               <p className="text-xs text-gray-400">₹{item.price}</p>
                           </div>
                       </div>
                       <span className="text-gray-700 font-medium">₹{item.price}</span>
                   </div>
               ))}
           </div>

           {/* Address Card */}
           <div className="glass-card p-6 rounded-2xl shadow-sm border border-white/50 animate-fade-in-up delay-200 group hover:border-red-200 transition-colors duration-300">
               <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Delivery Address</h2>
               <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl bg-white/50 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                   <div className="text-2xl">🏠</div>
                   <div>
                       <h3 className="font-bold text-gray-800">{deliveryDetails.name}</h3>
                       <p className="text-sm text-gray-500 leading-relaxed">{deliveryDetails.email}</p>
                       <p className="text-sm text-gray-500 leading-relaxed mt-1">{deliveryDetails.address}</p>
                   </div>
                   <button onClick={openEditModal} className="ml-auto text-[#EF4F5F] font-bold text-sm uppercase hover:underline">Change</button>
               </div>
           </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="md:col-span-1">
            {/* Bill Details */}
            <div className="glass-card p-6 rounded-2xl shadow-lg border border-white/50 sticky top-24 animate-fade-in-up delay-300">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Bill Details</h2>
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600"><span>Item Total</span><span>₹{itemTotal}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Delivery Fee</span><span>₹{deliveryFee}</span></div>
                    <div className="flex justify-between text-gray-600"><span>Platform Fee</span><span>₹{platformFee}</span></div>
                </div>
                <div className="border-t border-gray-200 pt-4 mb-6 flex justify-between text-gray-800 font-bold text-xl">
                    <span>TO PAY</span>
                    <span>₹{grandTotal}</span>
                </div>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-[#EF4F5F] text-white py-4 rounded-xl font-bold text-lg hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-200 hover:-translate-y-1 active:translate-y-0 active:scale-95 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Place Order ➔"}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;