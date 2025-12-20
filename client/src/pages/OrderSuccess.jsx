import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Make sure you install lucide-react if needed

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FDFBF7] text-center p-4">
      {/* 🔥 FIX: Responsive Padding (p-6 mobile, p-10 desktop) & Margins */}
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl w-full max-w-sm mx-4 relative overflow-hidden animate-in zoom-in duration-300 border border-gray-100">
        
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#EF4F5F] to-orange-400"></div>

        {/* Animated Green Checkmark */}
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="text-green-500 w-10 h-10" strokeWidth={3} />
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">Order Placed!</h1>
        <p className="text-slate-500 mb-8 font-medium">
          Your food is being prepared. <br/>
          <span className="text-sm text-gray-400">Sit tight!</span>
        </p>
        
        {/* Loading / Redirecting Indicator */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">
                <div className="w-2 h-2 bg-[#EF4F5F] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#EF4F5F] rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-[#EF4F5F] rounded-full animate-pulse delay-150"></div>
                <span>Redirecting...</span>
            </div>
        </div>

        {/* Confetti decoration */}
        <div className="absolute bottom-10 left-6 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute top-10 right-8 w-2 h-2 bg-blue-400 transform rotate-45 opacity-60"></div>

      </div>
    </div>
  );
};

export default OrderSuccess;