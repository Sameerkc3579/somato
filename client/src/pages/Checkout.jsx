import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Get User Data from Context

const Checkout = () => { 
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // ✅ Get logged-in user info
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // 1. Get Cart Data (Safe check if state is missing)
  const cartItems = state?.cartItems || [];
  const restaurantName = state?.restaurantName || "Restaurant";
  const itemTotal = state?.totalPrice || 0;

  // 2. Calculate Totals
  const deliveryFee = 40;
  const platformFee = 10;
  const grandTotal = itemTotal + deliveryFee + platformFee;

  // 3. Handle "Place Order" Click (Connects to Backend)
  const handlePlaceOrder = () => {
    
    // A. Prepare Order Data
    const orderData = {
        items: cartItems,
        totalAmount: grandTotal,
        restaurant: restaurantName,
        status: "Confirmed"
    };

    // B. Send to Backend API
    fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    })
    .then((res) => res.json())
    .then(() => {
        // C. Show Success Animation
        setIsOrderPlaced(true);
        
        // D. Redirect after 2 seconds
        setTimeout(() => {
            navigate("/order-success");
        }, 2000);
    })
    .catch((err) => {
        alert("Failed to place order. Is the backend running?");
        console.error(err);
    });
  };

  // 4. Handle Empty Cart Case
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty 😕</h2>
        <Link to="/delivery" className="bg-zomatoRed text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-red-600 transition">
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4">
      
      {/* --- SUCCESS MODAL --- */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform scale-100 transition-transform">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <span className="text-4xl text-green-600">✓</span>
               </div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h2>
               <p className="text-gray-500 mb-6">Your food is being prepared at <span className="font-bold">{restaurantName}</span>.</p>
               <p className="text-sm text-gray-400">Redirecting...</p>
           </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT SIDE: ITEM LIST & ADDRESS */}
        <div className="md:col-span-2 space-y-6">
           {/* Order Summary */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <span className="text-zomatoRed">🥡</span> Order Summary
               </h2>
               <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider font-semibold">From {restaurantName}</p>
               
               {cartItems.map((item, index) => (
                   <div key={index} className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
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

           {/* Delivery Address */}
           <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
               <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Delivery Address</h2>
               <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                   <div className="text-2xl">🏠</div>
                   <div>
                       <h3 className="font-bold text-gray-800">{user?.name || "Guest User"}</h3>
                       <p className="text-sm text-gray-500 leading-relaxed">
                           {user?.email || "No contact info available."}
                       </p>
                       <p className="text-sm text-gray-500 leading-relaxed">Flat 402, Lotus Apartment, Gandhi Chowk, Hajipur, Bihar - 844101</p>
                   </div>
                   <button className="ml-auto text-zomatoRed font-bold text-sm uppercase">Change</button>
               </div>
           </div>
        </div>

        {/* RIGHT SIDE: BILL SUMMARY */}
        <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-lg font-bold text-gray-800 mb-6">Bill Details</h2>
                
                <div className="flex justify-between text-gray-600 mb-2">
                    <span>Item Total</span>
                    <span>₹{itemTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-4 border-b border-gray-200 pb-4">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                </div>
                
                <div className="flex justify-between text-gray-800 font-bold text-xl mb-6">
                    <span>TO PAY</span>
                    <span>₹{grandTotal}</span>
                </div>

                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-zomatoRed text-white py-4 rounded-lg font-bold text-lg hover:bg-red-600 transition shadow-lg transform active:scale-95 flex justify-center items-center gap-2"
                >
                  Place Order <span className="text-xl">➔</span>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;