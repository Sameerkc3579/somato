import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ⏱️ Auto-redirect to Profile after 3 seconds
    const timer = setTimeout(() => {
      navigate("/profile");
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer if user leaves early
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-sm w-full animate-bounce-in">
        
        {/* Green Checkmark Circle */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-6">
          Your food is being prepared.
        </p>
        
        {/* Loading / Redirecting Indicator */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-medium">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
            <span>Redirecting to Order History...</span>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;