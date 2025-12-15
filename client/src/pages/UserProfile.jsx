import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import Context

// We accept userOrders as a prop, but get user/logout from Context
const UserProfile = ({ userOrders }) => {
  const navigate = useNavigate();
  
  // 1. Get Global Auth State & Functions
  const { user, setUser, logout } = useAuth();

  // --- State for Modals ---
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");

  // Security Check: If not logged in, redirect
  if (!user) {
    return <Navigate to="/" />;
  }

  // --- LOGOUT FUNCTIONALITY ---
  const handleLogout = () => {
      logout(); // Clear global user state
      navigate("/"); // Redirect to home
  };

  // --- EDIT PROFILE FUNCTIONALITY ---
  const handleEditSave = () => {
    if (editName.trim() === "") {
        alert("Name cannot be empty.");
        return;
    }
    
    // Update the global user state
    setUser({
        ...user,
        name: editName.trim(),
    });

    setIsEditModalOpen(false);
    // Optional: alert("Profile updated successfully!");
  };

  // --- HELP MODAL LOGIC ---
  const handleHelpClick = (order) => {
    setSelectedOrder(order);
    setIsHelpModalOpen(true);
  };

  const handleReorder = (order) => {
    alert(`Reordering items from ${order.restaurant}! (Simulated)`);
    // In a real app, you would add these items to the cart here
    navigate(`/delivery`); 
  };


  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* --- HEADER SECTION --- */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-50 to-pink-50 z-0"></div>
          
          <div className="relative z-10 w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
             <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="relative z-10 text-center md:text-left pt-2 flex-1">
             <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
             <p className="text-gray-500">{user.email || user.phone || "Foodie"}</p>
             
             <div className="mt-4 flex gap-3 justify-center md:justify-start">
                 <button 
                    onClick={() => {
                        setEditName(user.name); // Reset name to current
                        setIsEditModalOpen(true);
                    }}
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
          {userOrders && userOrders.length > 0 ? (
            userOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition">
                 
                 {/* Order Header */}
                 <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-2xl shadow-sm">
                            🥡
                         </div>
                         <div>
                             <h3 className="font-bold text-gray-800 text-lg">{order.restaurant}</h3>
                             <p className="text-xs text-gray-500 uppercase font-semibold">Order #{order.id}</p>
                         </div>
                     </div>
                     <div className="text-right">
                         <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                            {order.status}
                         </span>
                         <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                     </div>
                 </div>

                 {/* Order Body */}
                 <div className="p-6">
                     <p className="text-gray-600 text-sm mb-4">
                        {order.items.join(", ")}
                     </p>
                     <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-200">
                         <span className="text-gray-500 font-medium">Total Paid</span>
                         <span className="text-gray-800 font-bold text-lg">{order.total}</span>
                     </div>
                 </div>

                 {/* Action Buttons */}
                 <div className="px-6 py-3 bg-gray-50 flex gap-3 border-t border-gray-100">
                     <button 
                       onClick={() => handleReorder(order)}
                       className="flex-1 bg-zomatoRed text-white py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition"
                     >
                         Reorder
                     </button>
                     <button 
                       onClick={() => handleHelpClick(order)}
                       className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium text-sm hover:bg-white transition"
                     >
                         Help
                     </button>
                 </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">No orders found.</p>
                <button onClick={() => navigate("/delivery")} className="text-zomatoRed font-medium hover:underline">
                    Order food now
                </button>
            </div>
          )}
        </div>

      </div>

      {/* --- HELP MODAL --- */}
      {isHelpModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex justify-center items-center">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsHelpModalOpen(false)}></div>
             <div className="bg-white rounded-xl shadow-2xl w-[90%] md:w-[450px] overflow-hidden relative z-10 animate-slide-up p-6">
                 <h3 className="text-2xl font-bold mb-4 text-gray-800">Need Help?</h3>
                 <p className="text-sm text-gray-600 mb-6">Support for order **#{selectedOrder.id}** from **{selectedOrder.restaurant}**.</p>
                 
                 <div className="space-y-3">
                     <button className="w-full p-3 bg-red-50 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-100 transition">
                         Missing Items / Quality Issue
                     </button>
                     <button className="w-full p-3 bg-blue-50 border border-blue-200 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition">
                         Billing Query
                     </button>
                 </div>
                 
                 <button 
                    onClick={() => setIsHelpModalOpen(false)}
                    className="w-full mt-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition"
                 >
                    Close
                 </button>
             </div>
          </div>
      )}

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

                     <label className="block pt-2 text-sm font-medium text-gray-700">Email / Phone (Read-only)</label>
                     <input 
                        type="text" 
                        value={user.email || user.phone || 'N/A'}
                        readOnly
                        className="w-full border border-gray-200 bg-gray-50 p-3 rounded-lg outline-none cursor-not-allowed text-gray-500"
                     />
                 </div>
                 
                 <button 
                    onClick={handleEditSave}
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

export default UserProfile;