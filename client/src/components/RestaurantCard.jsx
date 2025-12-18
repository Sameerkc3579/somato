import React from "react";
import { Link } from "react-router-dom";

const RestaurantCard = ({ info, currentCity }) => {
  if (!info) return null;

  const {
    id,
    _id,
    image = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    name = "Restaurant Name",
    rating = "4.0",
    cuisine = "Food",
    price = "₹200 for two",
    deliveryTime = "30 min",
    discount = ""
  } = info;

  const restaurantId = id || _id;

  return (
    <Link 
        to={`/restaurant/${restaurantId}`} 
        state={{ restaurant: info, selectedCity: currentCity }}
        className="block h-full" 
    >
      <div className="group h-full bg-white rounded-2xl overflow-hidden border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 flex flex-col cursor-pointer">
        
        {/* IMAGE SECTION */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {discount && (
            <div className="absolute bottom-4 left-0 bg-[#256fef] text-white text-[10px] font-bold px-2 py-[2px] rounded-r uppercase tracking-wide shadow-sm">
              {discount}
            </div>
          )}

          <div className="absolute bottom-4 right-4 bg-white/95 px-2 py-[2px] rounded-md text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
            {deliveryTime}
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="p-3 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-semibold text-gray-800 truncate w-3/4 group-hover:text-[#EF4F5F] transition-colors duration-300">
              {name}
            </h3>
            
            <div className={`text-white text-[11px] font-bold px-1.5 py-[2px] rounded flex items-center gap-0.5 ${parseFloat(rating) >= 4.0 ? 'bg-[#24963F]' : 'bg-[#E1B055]'}`}>
              <span>{rating}</span>
              <span className="text-[8px]">★</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-3 truncate">
            <p className="truncate w-3/5">{cuisine}</p>
            <p className="text-gray-500">{price}</p>
          </div>

          <div className="h-px bg-gray-200 my-auto"></div>

          <div className="flex items-center gap-2 mt-3">
             <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                    src="https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png" 
                    alt="Safe" 
                    className="w-full h-full object-cover" 
                />
             </div>
             <p className="text-[11px] text-gray-500 font-medium uppercase tracking-tight">
                Follows all safety measures
             </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;