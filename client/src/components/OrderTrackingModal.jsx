import React, { useState, useEffect } from "react";

const OrderTrackingModal = ({ order, onClose }) => {
  const stages = ["Placed", "Preparing", "On the Way", "Delivered"];

  // 1. SMART STATUS CHECK
  // If the order status from the database is already 'Delivered', we start at the end.
  // Otherwise, we start at 'Placed' (0) for the demo simulation.
  const isAlreadyDelivered = order.status === "Delivered";
  
  const [currentStep, setCurrentStep] = useState(isAlreadyDelivered ? 3 : 0);
  const [showConfetti, setShowConfetti] = useState(isAlreadyDelivered);

  useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "";
  };
}, []);

  // 2. REALISTIC ANIMATION LOOP (Only runs if NOT delivered yet)
  useEffect(() => {
    if (!isAlreadyDelivered && currentStep < 3) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 3000); // Advances every 3 seconds for demo
      return () => clearTimeout(timer);
    } else if (currentStep === 3) {
      // Trigger confetti when it reaches the end
      setShowConfetti(true);
    }
  }, [currentStep, isAlreadyDelivered]);

  // Calculate Bike Position (0% to 92% across the screen)
  // If delivered, bike stays at 92% (Home)
  const bikeProgress = [5, 33, 66, 92]; 

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex justify-center items-end md:items-center">
      
      {/* 🎊 Confetti Animation (Overlay) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden flex justify-center">
            <div className="w-full h-full absolute top-0 left-0">
               {[...Array(30)].map((_, i) => (
                  <div key={i} className="absolute animate-fall" style={{
                      left: `${Math.random() * 100}%`,
                      top: `-${Math.random() * 20}%`,
                      animationDuration: `${Math.random() * 2 + 3}s`, // Slower fall for realism
                      backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
                      width: '8px', height: '8px',
                      borderRadius: '50%'
                  }}></div>
               ))}
            </div>
        </div>
      )}

      <div className=" bg-white w-full md:max-w-5xl h-[92vh] md:h-[600px] rounded-t-3xl md:rounded-2xl overflow-hidden flex flex-col md:flex-row relative">

        
        {/* Mobile Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-30 md:hidden bg-white rounded-full p-2 shadow-lg font-bold text-gray-600 hover:bg-gray-100">&times;</button>

        {/* --- LEFT SIDE: INTERACTIVE MAP --- */}
        <div className="w-full md:w-2/3 bg-gray-100 relative flex flex-col min-h-[45vh] md:min-h-0">
            
            {/* Live Status Overlay */}
            <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md px-5 py-3 rounded-xl shadow-lg border border-gray-100 max-w-xs transition-all duration-500 hover:scale-105">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Order #{order._id ? order._id.slice(-6) : "88291"}
                </p>
                <h2 className={`text-xl font-extrabold flex items-center gap-2 ${currentStep === 3 ? "text-green-600" : "text-gray-800"}`}>
                    {currentStep === 3 
                        ? <span>Order Delivered! 🎉</span> 
                        : <><span>⏱️</span> {15 - (currentStep * 5)} mins left</>
                    }
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                    {stages[currentStep]} • {currentStep === 3 ? "Enjoy your meal!" : "On time"}
                </p>
            </div>

            {/* 🗺️ MAP VISUALIZATION */}
            <div className="flex-1 w-full h-full relative overflow-hidden bg-blue-50 group">
                {/* Enhanced Map Background */}
                <img 
                    src="https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                    alt="City Map" 
                    className="w-full h-full object-cover opacity-90 grayscale-[20%] group-hover:grayscale-0 transition-all duration-[2000ms] scale-105 group-hover:scale-110"
                />
                
                {/* 📍 START POINT (Restaurant) */}
                <div className="absolute top-1/2 left-[5%] transform -translate-y-1/2 flex flex-col items-center z-10">
                    <div className="w-4 h-4 bg-gray-800 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                    <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow mt-1">Rest.</span>
                </div>

                {/* 🏠 END POINT (Home) */}
                <div className="absolute top-1/2 right-[5%] transform -translate-y-1/2 flex flex-col items-center z-10">
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center text-sm transition-all duration-500
                        ${currentStep === 3 ? "bg-green-500 scale-125" : "bg-zomatoRed"}`}>
                        {currentStep === 3 ? "🏠" : "🏠"}
                    </div>
                    <span className="bg-white px-2 py-0.5 rounded text-[10px] font-bold shadow mt-1">You</span>
                </div>

                {/* 🛣️ CONNECTING LINE */}
                <div className="absolute top-1/2 left-[5%] right-[5%] h-1 bg-gray-300 -translate-y-1/2 border-t-2 border-dashed border-gray-400 opacity-60"></div>

                {/* 🛵 ANIMATED DELIVERY SCOOTER */}
                <div 
                    className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-[3000ms] ease-in-out"
                    // If delivered, force position to end (92%). If animating, use step progress.
                    style={{ left: `${bikeProgress[currentStep]}%` }}
                >
                     <div className="relative">
                        {/* The Bike Icon */}
                        <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 
                            ${currentStep === 3 ? "border-green-500 scale-110" : "border-zomatoRed"} 
                            transition-all duration-500`}>
                            <span className="text-2xl" role="img" aria-label="bike">
                                {currentStep === 3 ? "✅" : "🛵"}
                            </span>
                        </div>
                        
                        {/* Shadow/Blur under bike (Only if moving) */}
                        {currentStep < 3 && (
                            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-black/30 rounded-full blur-sm animate-pulse"></div>
                        )}
                        
                        {/* Tooltip above bike */}
                        <div className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap transition-opacity duration-300
                            ${currentStep === 3 ? "opacity-0" : "opacity-90"}`}>
                            {stages[currentStep]}
                        </div>
                     </div>
                </div>
            </div>

            {/* PROGRESS STEPPER (Bottom Bar) */}
            <div className="bg-white p-6 border-t border-gray-200 z-10">
                <div className="flex justify-between items-center relative px-4">
                    {/* Background Line */}
                    <div className="absolute top-1/2 left-4 right-4 h-1.5 bg-gray-100 -z-10 rounded-full"></div>
                    
                    {/* Active Progress Line */}
                    <div 
                        className="absolute top-1/2 left-4 h-1.5 bg-gradient-to-r from-red-500 to-green-500 -z-10 rounded-full transition-all duration-1000 ease-linear"
                        style={{ width: `${(currentStep / (stages.length - 1)) * 95}%` }}
                    ></div>

                    {stages.map((stage, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 cursor-default relative">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-all duration-500
                                ${index <= currentStep 
                                    ? "bg-zomatoRed border-zomatoRed text-white scale-110 shadow-md" 
                                    : "bg-white border-gray-200 text-gray-300"
                                } 
                                ${index === 3 && currentStep === 3 ? "!bg-green-500 !border-green-500 scale-125" : ""}`}>
                                {index < currentStep ? "✓" : index + 1}
                            </div>
                            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wide transition-colors duration-300 
                                ${index <= currentStep ? "text-gray-800" : "text-gray-300"}`}>
                                {stage}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- RIGHT SIDE: ORDER RECEIPT --- */}
        <div className="w-full md:w-1/3 bg-white border-t md:border-t-0 md:border-l border-gray-200 flex flex-col max-h-[40vh] md:max-h-none z-20">


            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 hidden md:flex">
                <h3 className="font-extrabold text-gray-800 text-lg tracking-tight">Order Summary</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl font-bold transition-transform hover:rotate-90">&times;</button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-6 space-y-6">

                
                {/* Restaurant Header */}
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-red-100">🥡</div>
                    <div>
                        <h4 className="font-bold text-xl text-gray-800 leading-tight">{order.restaurant || "Restaurant"}</h4>
                        <p className="text-xs text-gray-500 mt-1">{order.items ? order.items.length : 1} Items • {order.location || "Patna"}</p>
                    </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                {/* Items List */}
                <div className="space-y-4">
                    {order.items && order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-start text-sm group">
                            <div className="flex gap-3">
                                <div className={`w-4 h-4 mt-0.5 border flex items-center justify-center rounded-sm ${item.isVeg !== false ? 'border-green-600' : 'border-red-600'}`}>
                                    <div className={`w-2 h-2 rounded-full ${item.isVeg !== false ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700 font-semibold group-hover:text-gray-900 transition-colors">1 x {item.name}</span>
                                    <span className="text-[10px] text-gray-400">Customization info</span>
                                </div>
                            </div>
                            <span className="font-bold text-gray-600">₹{item.price}</span>
                        </div>
                    ))}
                </div>

                {/* Bill Card */}
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Item Total</span>
                        <span>₹{order.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Delivery Fee</span>
                        <span>₹40</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-₹0</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-extrabold text-gray-900">
                        <span>Grand Total</span>
                        <span>₹{order.totalAmount}</span>
                    </div>
                </div>
            </div>

            {/* Footer Status Bar */}
            <div className={`p-5 text-center font-bold text-white tracking-widest uppercase transition-all duration-500 shadow-inner text-sm
                ${currentStep === 3 ? "bg-green-500" : "bg-gray-800"}`}>
                {currentStep === 3 ? "ORDER COMPLETED ✓" : "TRACKING LIVE..."}
            </div>
        </div>

      </div>
      
      {/* CSS for Falling Confetti Animation */}
      <style>{`
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(120%) rotate(720deg); opacity: 0; }
        }
        .animate-fall {
            animation-name: fall;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default OrderTrackingModal;