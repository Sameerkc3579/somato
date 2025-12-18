import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import OrderTrackingModal from "../components/OrderTrackingModal";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- MODAL STATES ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user ? user.name : "");

  // --- TRACKING STATE ---
  const [trackingOrder, setTrackingOrder] = useState(null);

  // --- EXPANDED ORDER STATE ---
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // --- 🔥 LOGIC UPDATE: Read from Local Storage ---
  useEffect(() => {
    // 1. Read string from localStorage
    const savedData = localStorage.getItem("my_orders");
    if (savedData) {
        // 2. Parse it. The Checkout page already put new orders at index 0.
        setOrders(JSON.parse(savedData));
    }
    setLoading(false);
  }, []);

  // --- HANDLERS ---
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-transparent">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Please Log In</h2>
        <Link to="/login" className="text-[#EF4F5F] font-bold underline">Go to Login</Link>
      </div>
    );
  }

  return (
    // 🚨 1. Transparent Background 🚨
    <div className="min-h-screen bg-transparent pt-8 pb-20 px-4">
      
      {/* --- TRACKING MODAL --- */}
      {trackingOrder && (
        <OrderTrackingModal
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      )}

      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="glass-card rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-100/50 to-pink-100/50 z-0"></div>
          
          <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-purple-600 flex items-center justify-center text-white text-4xl font-bold">
             {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
             ) : (
                <span>{user.name.charAt(0)}</span>
             )}
          </div>
          
          <div className="relative z-10 text-center md:text-left pt-2 flex-1">
             <h1 className="text-4xl font-bold text-gray-800 drop-shadow-sm">{user.name}</h1>
             <p className="text-gray-600 font-medium">{user.email}</p>
             
             <div className="mt-4 flex gap-3 justify-center md:justify-start">
                 <button 
                   onClick={() => { setEditName(user.name); setIsEditModalOpen(true); }}
                   className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg text-sm font-medium hover:bg-white/50 transition duration-300"
                 >
                   Edit Profile
                 </button>
                 <button 
                   onClick={handleLogout}
                   className="px-4 py-2 bg-red-500 text-white border border-red-500 rounded-lg text-sm font-medium hover:bg-red-600 shadow-md transition duration-300"
                 >
                   Log Out
                 </button>
             </div>
          </div>
        </div>

        {/* --- ORDER HISTORY SECTION --- */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 animate-fade-in delay-100">
            Past Orders
        </h2>
        
        <div className="space-y-6">
          {loading ? (
             <div className="text-center py-10 text-gray-500 glass-card rounded-xl">Loading orders...</div>
          ) : orders.length > 0 ? (
            orders.map((order, index) => (
              // 🚨 Glass Card + Staggered Animation 🚨
              <div 
                key={order._id} 
                className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                  {/* Order Header */}
                  <div className="bg-white/40 px-6 py-4 flex justify-between items-center border-b border-gray-200/50">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                            🥡
                          </div>
                          <div>
                              <h3 className="font-bold text-gray-800 text-lg">{order.restaurant || "Restaurant Order"}</h3>
                              <p className="text-xs text-gray-500 uppercase font-semibold mt-1">ORDER #{order._id}</p>
                              <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                          </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {order.status || "CONFIRMED"}
                      </span>
                  </div>

                  {/* Order Body */}
                  <div className="p-6">
                      <div className="text-gray-700 text-sm mb-4 line-clamp-2 font-medium">
                         {order.items.map(i => i.name).join(", ")}
                      </div>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-300">
                          <div>
                              <span className="text-gray-500 font-medium block text-xs uppercase">Total Paid</span>
                              <span className="text-gray-800 font-bold text-lg">₹{order.totalAmount}</span>
                          </div>

                          <div className="flex gap-3">
                                <button 
                                    onClick={() => toggleDetails(order._id)}
                                    className="text-gray-500 text-sm font-bold hover:text-gray-800 underline transition"
                                >
                                    {expandedOrderId === order._id ? "Hide Details" : "View Details"}
                                </button>

                                <button 
                                    onClick={() => setTrackingOrder(order)} 
                                    className="px-4 py-2 bg-[#EF4F5F] text-white rounded-lg font-bold text-sm shadow-lg hover:bg-red-600 transition flex items-center gap-2 hover:-translate-y-0.5"
                                >
                                    <span>🗺️</span> Track Order
                                </button>
                          </div>
                      </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedOrderId === order._id && (
                    <div className="bg-white/50 border-t border-gray-200/50 p-6 animate-fade-in">
                        <h4 className="font-bold text-gray-700 mb-4 border-b border-gray-200 pb-2">Order Details</h4>
                        
                        <div className="space-y-3 mb-6">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.isVeg !== false ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                        <span className="text-gray-700">1 x {item.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-600">₹{item.price}</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white/80 p-4 rounded-lg border border-gray-200 space-y-2 mb-6">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Item Total</span>
                                <span>₹{order.totalAmount - 50}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Delivery & Platform Fee</span>
                                <span>₹50</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-gray-100">
                                <span>Grand Total</span>
                                <span>₹{order.totalAmount}</span>
                            </div>
                        </div>

                        <div>
                             <h5 className="font-bold text-xs text-gray-400 uppercase mb-2">Delivered To</h5>
                             <p className="text-sm text-gray-600 bg-white/80 p-3 rounded border border-gray-200">
                                {order.deliveryAddress ? (
                                    <>
                                        <span className="font-bold block text-gray-800">{order.deliveryAddress.name}</span>
                                        {order.deliveryAddress.address}
                                    </>
                                ) : (
                                    "Flat 402, Lotus Apartment, Gandhi Chowk, Hajipur, Bihar - 844101"
                                )}
                             </p>
                        </div>
                    </div>
                  )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 glass-card rounded-2xl border-dashed border-2 border-gray-300">
                <p className="text-gray-500 mb-4 text-lg">No orders found.</p>
                <Link to="/delivery" className="text-[#EF4F5F] font-bold hover:underline text-lg">
                    Order food now 🍔
                </Link>
            </div>
          )}
        </div>
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsEditModalOpen(false)}></div>
             <div className="bg-white rounded-2xl shadow-2xl w-[90%] md:w-[450px] overflow-hidden relative z-10 animate-fade-in-up p-6">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-2xl text-gray-500 hover:text-black">&times;</button>
                 </div>
                 
                 <div className="space-y-4">
                     <label className="block text-sm font-medium text-gray-700">Display Name</label>
                     <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#EF4F5F] focus:ring-2 focus:ring-red-100 transition-all"
                     />
                 </div>
                 
                 <button 
                   onClick={() => setIsEditModalOpen(false)} 
                   className="w-full mt-8 bg-[#EF4F5F] text-white py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition shadow-lg hover:-translate-y-0.5"
                 >
                   Save Changes
                 </button>
             </div>
        </div>
      )}
    </div>
  );
};

export default Profile;