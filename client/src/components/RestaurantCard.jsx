import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RestaurantCard = ({ info, currentCity }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

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

  // --- 1. CHECK DATABASE ON LOAD (Keeps the heart Red if liked) ---
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user?.email) return;

      try {
        const baseUrl = window.location.hostname === "localhost" 
            ? "http://localhost:4000" 
            : "https://somato-new.vercel.app";

        const response = await fetch(`${baseUrl}/api/favorites?email=${user.email}`);
        if (response.ok) {
          const favorites = await response.json();
          // Check if THIS restaurant is already in the list
          const isFav = favorites.some(fav => fav.restaurantName === name);
          setIsLiked(isFav);
        }
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };

    checkFavoriteStatus();
  }, [user, name]);

  // --- 2. TOGGLE FAVORITE (Save to DB) ---
  const toggleFavorite = async (e) => {
    e.preventDefault(); // Stop link click
    e.stopPropagation();

    if (!user) {
      alert("Please login to save favorites!");
      return;
    }

    // Optimistic UI Update (Turn Red/White immediately)
    const previousState = isLiked;
    setIsLiked(!isLiked);

    try {
      const baseUrl = window.location.hostname === "localhost" 
          ? "http://localhost:4000" 
          : "https://somato-new.vercel.app";

      if (!previousState) {
        // --- ADD TO FAVORITES ---
        const res = await fetch(`${baseUrl}/api/favorites/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail: user.email,
            restaurantName: name,
            image: image,
            cuisine: cuisine,
            rating: rating,
            time: deliveryTime
          })
        });
        if(res.ok) console.log("Added to Favorites");
      } else {
        // --- REMOVE FROM FAVORITES ---
        const res = await fetch(`${baseUrl}/api/favorites/remove`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            restaurantName: name
          })
        });
        if(res.ok) console.log("Removed from Favorites");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setIsLiked(previousState); // Revert UI if failed
    }
  };

  return (
    <Link 
        to={`/restaurant/${restaurantId}`} 
        state={{ restaurant: info, selectedCity: currentCity }}
        className="block h-full relative" 
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

          {/* ❤️ HEART BUTTON */}
          <button 
            onClick={toggleFavorite}
            className="absolute top-3 right-3 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-sm group-hover:shadow-md"
          >
            <Heart 
                size={20} 
                fill={isLiked ? "#EF4F5F" : "transparent"} 
                className={isLiked ? "text-[#EF4F5F]" : "text-white"} 
            />
          </button>

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