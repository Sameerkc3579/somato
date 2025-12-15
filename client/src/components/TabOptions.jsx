import React from "react";
import { Link, useLocation } from "react-router-dom";

// We use real Zomato assets here for a more authentic look
const tabs = [
  {
    id: "Delivery",
    name: "Delivery",
    active_img: "https://b.zmtcdn.com/data/o2_assets/c0bb85d3a634753048b646f0175b6e291616149578.png",
    backdrop: "#FCEEC0",
    inactive_img: "https://b.zmtcdn.com/data/o2_assets/246bbd71fbba420d5996452be3024d351616150055.png",
    path: "/delivery"
  },
  {
    id: "Dining Out",
    name: "Dining Out",
    active_img: "https://b.zmtcdn.com/data/o2_assets/30fa0a844f3ba820db50578288c26a631616149662.png",
    backdrop: "#E5F3F3",
    inactive_img: "https://b.zmtcdn.com/data/o2_assets/78d25215ff4c1299578ed36eefd5f39d1616149985.png",
    path: "/dining-out"
  },
  {
    id: "Nightlife",
    name: "Nightlife",
    active_img: "https://b.zmtcdn.com/data/o2_assets/855687dc64a5e06d737dae45b7f6a13b1616149818.png",
    backdrop: "#EDf4FF",
    inactive_img: "https://b.zmtcdn.com/data/o2_assets/01040767e4943c398e38e3592bb1ba8a1616150142.png",
    path: "/nightlife"
  },
];

const TabOptions = ({ activeTab }) => {
  const location = useLocation();
  
  // Logic to keep the correct tab highlighted even on refresh
  const currentTab = activeTab || tabs.find(t => t.path === location.pathname)?.name || "Delivery";

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] border-t border-gray-200 md:static md:border-none md:shadow-none">
      <div className="max-w-6xl mx-auto px-4">
        {/* Mobile: Justify Around (Spread out) | Desktop: Start (Left aligned) */}
        <div className="flex justify-around md:justify-start items-center gap-2 md:gap-12 h-20 md:h-24">
          
          {tabs.map((tab) => {
            const isActive = currentTab === tab.name;
            
            return (
              <Link to={tab.path} key={tab.id} className="w-full md:w-auto text-decoration-none">
                <div
                  className={`flex flex-col md:flex-row items-center cursor-pointer transition-all duration-300 md:gap-3 px-2 py-2 md:px-0 md:py-0
                    ${isActive ? "md:border-b-2 md:border-zomatoRed" : "md:border-b-2 md:border-transparent"}
                  `}
                >
                  {/* Icon Container */}
                  <div
                    className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-1 md:mb-0 transition-all
                      ${isActive ? "bg-[var(--backdrop)]" : "bg-transparent md:bg-gray-50"}
                    `}
                    style={{ "--backdrop": tab.backdrop }}
                  >
                    <img
                      src={isActive ? tab.active_img : tab.inactive_img}
                      alt={tab.name}
                      className={`w-6 h-6 md:w-8 md:h-8 object-cover transition-transform duration-300 ${isActive ? "scale-110" : "grayscale opacity-70"}`}
                    />
                  </div>

                  {/* Text Label */}
                  <div className="text-center md:text-left">
                    <h3 className={`text-xs md:text-xl font-medium md:font-semibold ${isActive ? "text-zomatoRed" : "text-gray-500"}`}>
                      {tab.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabOptions;