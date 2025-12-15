import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ info }) => {
  return (
    <Link to={`/restaurant/${info.id}`} state={{ restaurant: info }}>
      <div className="bg-white rounded-2xl hover:shadow-lg transition duration-300 cursor-pointer p-3 hover:border hover:border-gray-200">
        
        <div className="relative w-full h-60 overflow-hidden rounded-2xl">
          <img
            src={info.image}
            alt={info.name}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
            onError={(e) => {
              e.target.src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600";
            }}
          />
          {info.discount && (
            <div className="absolute bottom-4 left-0 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-r-md uppercase">
              {info.discount}
            </div>
          )}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold shadow-sm">
            {info.time}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 truncate w-2/3">
              {info.name}
            </h3>
            <div className="bg-green-700 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              {info.rating} ★
            </div>
          </div>
          <div className="flex justify-between items-center mt-1 text-gray-500 text-sm">
            <p className="truncate w-1/2">{info.cuisine}</p>
            <p>{info.price}</p>
          </div>
          
          {/* NEW: VISUAL FEEDBACK FOR SEARCH MATCHES (Optional) */}
          {/* If the card was found via search, we could highlight it here if we passed the search term down. 
              For now, this is just a clean card. */}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;