import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

// 🚨 ACCEPT setUserOrders PROP 🚨
const Checkout = ({ user, setUserOrders }) => { 
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // 1. Get Cart Data 
  const cartItems = state?.cart || [];
  const restaurantName = state?.restaurantName || "Restaurant";

  // 2. Calculate Totals
  const itemTotal = cartItems.reduce((acc, item) => acc + parseInt(item.price), 0);
  const deliveryFee = 40;
  const platformFee = 10;
  const grandTotal = itemTotal + deliveryFee + platformFee;

  // 3. Handle "Place Order" Click
  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    
    // --- 🚨 NEW: CREATE AND SAVE ORDER TO GLOBAL STATE 🚨 ---
    const newOrder = {
        id: "ORD-" + Math.floor(Math.random() * 90000 + 10000), // Random ID
        restaurant: restaurantName,
        // Format the date nicely for display
        date: new Date().toLocaleDateString('en-IN', {
            day: '2-digit', 
            month: 'short', 
            hour: '2-digit', 
            minute: '2-digit'
        }),
        total: `₹${grandTotal}`,
        status: "Confirmed",
        items: cartItems.map(item => `${item.name} (${item.isVeg ? 'Veg' : 'Non-Veg'})`),
    };

    // Update the global state, placing the new order at the beginning of the array
    setUserOrders(prevOrders => [newOrder, ...prevOrders]);
    // ----------------------------------------------------------------------

    // Redirect to Home after 3 seconds
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

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
               <p className="text-sm text-gray-400">Redirecting to home...</p>
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
                           {user?.email || user?.phone || "No contact info available."}
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