import React from "react";
import { Link, useLocation } from "react-router-dom"; 

const tabs = [
  {
    id: 1,
    name: "Delivery",
    // This is an SVG (Drawing code), not a link. It cannot be blocked.
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z" fill="currentColor"/>
        <path d="M9 13C9 14.1046 8.10457 15 7 15C5.89543 15 5 14.1046 5 13C5 11.8954 5.89543 11 7 11C8.10457 11 9 11.8954 9 13Z" fill="currentColor"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1 7C1 5.89543 1.89543 5 3 5H17C18.1046 5 19 5.89543 19 7V9H21C22.1046 9 23 9.89543 23 11V13C23 14.1046 22.1046 15 21 15H19.9C19.6436 17.2736 17.7126 19 15.4 19H8.60005C6.2874 19 4.35645 17.2736 4.10005 15H3C1.89543 15 1 14.1046 1 13V7ZM3 7V13H4.10005C4.35645 10.7264 6.2874 9 8.60005 9H15.4C17.7126 9 19.6436 10.7264 19.9 13H21V11H19V7H3Z" fill="currentColor"/>
      </svg>
    ),
    backdrop: "#FCEEC0",
    path: "/delivery",
  },
  {
    id: 2,
    name: "Dining Out",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19 4C19 2.89543 19.8954 2 21 2C22.1046 2 23 2.89543 23 4V20C23 21.1046 22.1046 22 21 22C19.8954 22 19 21.1046 19 20V4ZM5 2C3.89543 2 3 2.89543 3 4V9C3 10.6569 4.34315 12 6 12V20C6 21.1046 5.10457 22 4 22C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H5ZM9 4V20C9 21.1046 8.10457 22 7 22C5.89543 22 5 21.1046 5 20V12C6.65685 12 8 10.6569 8 9V4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4V20C12 21.1046 11.1046 22 10 22C8.89543 22 8 21.1046 8 20V4C8 2.89543 7.10457 2 6 2H9Z" fill="currentColor"/>
      </svg>
    ),
    backdrop: "#E5F3F3",
    path: "/dining",   
  },
  {
    id: 3,
    name: "Nightlife",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" clipRule="evenodd" d="M7 2C5.89543 2 5 2.89543 5 4V9.5C5 11.2396 6.27365 12.6775 7.9271 12.9553L11 18.3329V20H8C6.89543 20 6 20.8954 6 22C6 23.1046 6.89543 24 8 24H16C17.1046 24 18 23.1046 18 22C18 20.8954 17.1046 20 16 20H13V18.3329L16.0729 12.9553C17.7264 12.6775 19 11.2396 19 9.5V4C19 2.89543 18.1046 2 17 2H7ZM7 4H17V9.5C17 10.8807 15.8807 12 14.5 12H9.5C8.11929 12 7 10.8807 7 9.5V4Z" fill="currentColor"/>
      </svg>
    ),
    backdrop: "#EDf4FF",
    path: "/nightlife", 
  },
];

const TabOptions = ({ activeTab = "Delivery" }) => {
  const location = useLocation();

  return (
    <div className="bg-white pb-4 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 pt-6 flex gap-12 border-b border-gray-200">
        {tabs.map((tab) => {
           const isActive = location.pathname === tab.path || (location.pathname === '/' && tab.name === 'Delivery');
           return (
            <Link key={tab.id} to={tab.path}>
              <div
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-300 border-b-2 ${
                  isActive ? "border-zomatoRed" : "border-transparent"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 ${
                     isActive ? "text-zomatoRed" : "text-gray-500 bg-gray-100"
                  }`}
                  style={{
                    backgroundColor: isActive ? tab.backdrop : "#F8F8F8",
                  }}
                >
                  {/* Render the SVG Icon directly */}
                  {tab.icon}
                </div>
                <h3
                  className={`text-xl font-semibold ${
                    isActive ? "text-zomatoRed" : "text-gray-500"
                  }`}
                >
                  {tab.name}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TabOptions;