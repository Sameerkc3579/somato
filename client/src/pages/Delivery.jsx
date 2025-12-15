import React, { useState, useEffect, useCallback } from "react";
import TabOptions from "../components/TabOptions";
import Filters from "../components/Filters";
import RestaurantCard from "../components/RestaurantCard";
import restaurantList from "../data/restaurants.json"; 
import { generateNewRestaurants } from "../utils/restaurantGenerator"; 

// 🚨 ACCEPT CITY PROP 🚨
const Delivery = ({ searchTerm, city }) => {
  const [items, setItems] = useState(restaurantList);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // --- Infinite Scroll Handler ---
  const handleScroll = useCallback(() => {
    // Stop scrolling if loading, searching, filtering, OR if looking at specific city results
    // We don't want to generate random "Hajipur" restaurants when viewing "Mumbai"
    if (isLoading || searchTerm.length > 0 || activeFilters.length > 0) return;
    
    if (
      window.innerHeight + document.documentElement.scrollTop + 300 >=
      document.documentElement.scrollHeight
    ) {
      loadMoreItems();
    }
  }, [isLoading, searchTerm, activeFilters]);

  const loadMoreItems = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newRestaurants = generateNewRestaurants(3);
      setItems((prev) => [...prev, ...newRestaurants]);
      setIsLoading(false);
    }, 200); 
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // --- CITY & FILTER LOGIC ---
  
  // 1. First, determine the base list of restaurants for the selected CITY
  let cityBasedItems = items.filter(r => r.city === city);

  // 2. AUTO-FILL LOGIC:
  // If no restaurants exist for this city (and it's not a search),
  // take the existing list and "pretend" they are in the selected city.
  if (cityBasedItems.length === 0 && !searchTerm) {
      cityBasedItems = items.map(restaurant => ({
          ...restaurant,
          city: city, // Override city
          // Simple replace to make the address look local
          address: restaurant.address ? restaurant.address.replace("Hajipur", city).replace("Delhi NCR", city).replace("Mumbai", city) : `${city} Main Road`
      }));
  }

  // 3. Now apply the rest of the filters (Search, Veg, Rating) on this city list
  const filteredItems = cityBasedItems.filter((restaurant) => {
    
    // Search Filter
    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const nameMatch = restaurant.name.toLowerCase().includes(lowerSearch);
        const cuisineMatch = restaurant.cuisine.toLowerCase().includes(lowerSearch);
        const menuMatch = restaurant.menu && restaurant.menu.some((dish) => 
            dish.name.toLowerCase().includes(lowerSearch)
        );
        if (!nameMatch && !cuisineMatch && !menuMatch) return false;
    }

    // Rating Filter (4.0+)
    if (activeFilters.includes("rating")) {
        if (parseFloat(restaurant.rating) < 4.0) return false;
    }

    // Pure Veg Filter
    if (activeFilters.includes("veg")) {
        if (restaurant.isVeg === false) return false;
        if (restaurant.isVeg === undefined) {
             const cuisine = restaurant.cuisine.toLowerCase();
             const nonVegKeywords = ["chicken", "mutton", "biryani", "kebab", "burger", "non-veg"];
             if (restaurant.menu && restaurant.menu.some(item => !item.isVeg)) return false;
             if (nonVegKeywords.some(keyword => cuisine.includes(keyword)) && !restaurant.name.toLowerCase().includes("veg")) {
                return false;
             }
        }
    }

    // Specific Cuisine Filters
    const selectedCuisines = activeFilters.filter(f => f !== "rating" && f !== "veg");
    if (selectedCuisines.length > 0) {
        const restaurantCuisines = restaurant.cuisine.toLowerCase();
        const hasMatch = selectedCuisines.some(c => restaurantCuisines.includes(c.toLowerCase()));
        if (!hasMatch) return false;
    }

    return true;
  });

  return (
    <>
      <TabOptions activeTab="Delivery" />

      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          {/* Dynamic Header with City Name */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {searchTerm ? `Results for "${searchTerm}"` : `Delivery Restaurants in ${city}`}
          </h1>
          
          <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredItems.length > 0 ? (
                filteredItems.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} info={restaurant} />
                ))
            ) : (
                <div className="col-span-3 text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-400">No restaurants found 🍃</h2>
                    <p className="text-gray-400">Try removing some filters.</p>
                </div>
            )}
          </div>

          {/* Loading Spinner */}
          {isLoading && !searchTerm && activeFilters.length === 0 && (
            <div className="p-10 text-center">
               <div className="inline-block w-8 h-8 border-4 border-zomatoRed border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Delivery;