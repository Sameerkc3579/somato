import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth Context

const Profile = () => {
  const navigate = useNavigate();
  
  // --- 1. GET USER FROM GLOBAL CONTEXT ---
  // This ensures it shows "Sameer" and the purple image
  const { user, logout } = useAuth(); 

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 2. MODAL STATES ---
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Initialize editName only if user exists
  const [editName, setEditName] = useState(user ? user.name : "");

  // --- 3. FETCH ORDERS FROM DATABASE 🔌 ---
  useEffect(() => {
    fetch("http://localhost:4000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // --- 4. HANDLERS ---
  const handleLogout = () => {
    logout(); 
    navigate("/"); 
  };

  // If no user is logged in (Context is null), redirect or show login
  if (!user) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold mb-4">Please Log In</h2>
            <Link to="/login" className="text-zomatoRed font-bold underline">Go to Login</Link>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-50 to-pink-50 z-0"></div>
          
          <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {/* Use User Image from Context */}
             {user.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
             ) : (
                <span>{user.name.charAt(0)}</span>
             )}
          </div>
          
          <div className="relative z-10 text-center md:text-left pt-2 flex-1">
             <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
             <p className="text-gray-500">{user.email}</p>
             
             <div className="mt-4 flex gap-3 justify-center md:justify-start">
                 <button 
                   onClick={() => { setEditName(user.name); setIsEditModalOpen(true); }}
                   className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                 >
                   Edit Profile
                 </button>
                 <button 
                   onClick={handleLogout}
                   className="px-4 py-2 bg-red-500 text-white border border-red-500 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                 >
                   Log Out
                 </button>
             </div>
          </div>
        </div>

        {/* --- ORDER HISTORY SECTION --- */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Past Orders</h2>
        
        <div className="space-y-6">
          {loading ? (
             <div className="text-center py-10 text-gray-500">Loading orders...</div>
          ) : orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition">
                 
                 {/* Order Header */}
                 <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                            🥡
                         </div>
                         <div>
                             {/* Show Real Restaurant Name if available, else Fallback */}
                             <h3 className="font-bold text-gray-800 text-lg">{order.restaurant || "Restaurant Order"}</h3>
                             <p className="text-xs text-gray-400 uppercase font-semibold mt-1">ORDER #{order._id.slice(-6)}</p>
                             <p className="text-sm text-gray-500 mt-1">{new Date(order.date).toLocaleString()}</p>
                         </div>
                     </div>
                     <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {order.status || "DELIVERED"}
                     </span>
                 </div>

                 {/* Order Body */}
                 <div className="p-6">
                     <div className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {order.items.map(i => i.name).join(", ")}
                     </div>
                     
                     <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                         <span className="text-gray-500 font-medium">Total Paid</span>
                         <span className="text-gray-800 font-bold text-lg">₹{order.totalAmount}</span>
                     </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="px-6 py-3 bg-white flex gap-3 border-t border-gray-100">
                     <button 
                       onClick={() => navigate('/delivery')}
                       className="flex-1 bg-red-400 text-white py-2 rounded-lg font-bold text-sm hover:bg-red-500 transition"
                     >
                         Reorder
                     </button>
                     <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 transition">
                         Help
                     </button>
                 </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4 text-lg">No orders found.</p>
                <Link to="/delivery" className="text-zomatoRed font-bold hover:underline text-lg">
                    Order food now 🍔
                </Link>
            </div>
          )}
        </div>

      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
             <div className="bg-white rounded-xl shadow-2xl w-[90%] md:w-[450px] overflow-hidden relative z-10 animate-slide-up p-6">
                 <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Edit Profile</h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-2xl text-gray-500 hover:text-black">✕</button>
                 </div>
                 
                 <div className="space-y-4">
                     <label className="block text-sm font-medium text-gray-700">Display Name</label>
                     <input 
                        type="text" 
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-zomatoRed"
                     />
                 </div>
                 
                 <button 
                   onClick={() => setIsEditModalOpen(false)} // Just closes modal for now
                   className="w-full mt-8 bg-zomatoRed text-white py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition"
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