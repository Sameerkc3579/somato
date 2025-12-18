import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Utensils, Music } from "lucide-react";

const tabs = [
  {
    id: "delivery",
    name: "Delivery",
    icon: ShoppingBag,
    path: "/delivery",
  },
  {
    id: "dining",
    name: "Dining Out",
    icon: Utensils,
    path: "/dining-out",
  },
  {
    id: "nightlife",
    name: "Nightlife",
    icon: Music,
    path: "/nightlife",
  },
];

const TabOptions = () => {
  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-10 h-[72px]">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link key={tab.id} to={tab.path} className="no-underline">
                <div
                  className={`flex items-center gap-3 h-full border-b-[3px] transition-all ${
                    isActive
                      ? "border-[#EF4F5F]"
                      : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      isActive ? "bg-red-50" : "bg-gray-100"
                    }`}
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.6}
                      className={
                        isActive ? "text-[#EF4F5F]" : "text-gray-500"
                      }
                    />
                  </div>

                  <span
                    className={`text-[18px] font-medium ${
                      isActive ? "text-[#EF4F5F]" : "text-gray-500"
                    }`}
                  >
                    {tab.name}
                  </span>
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
