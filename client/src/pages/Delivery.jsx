import React, { useState, useEffect, useCallback } from "react";
import Filters from "../components/Filters";
import RestaurantCard from "../components/RestaurantCard";

// NOTE: We assume this component receives the 'city' prop from App.jsx
const Delivery = ({ searchTerm, city }) => { 
  // State to hold the full list of restaurants fetched from the API for the current city
  const [restaurants, setRestaurants] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);

  // --- API DATA FETCHING (Triggered by City Change) ---
  const fetchRestaurants = useCallback(() => {
    setLoading(true);
    
    // Fetch ALL data (since your API doesn't seem to filter by city directly)
    fetch("/api/restaurants") 
      .then((res) => res.json())
      .then((data) => {
        
        const lowerSelectedCity = city.toLowerCase().trim();

        // 1. Attempt a strict city match (Current strict logic)
        let filteredList = data.filter(
            (r) => r.city && r.city.toLowerCase().trim() === lowerSelectedCity
        );

        // 🚨 SOLUTION: Implement a fallback if the strict match fails 🚨
        if (filteredList.length === 0 && data.length > 0) {
            console.warn(`Strict city match failed for "${city}". Trying partial match as fallback.`);
            
            // 2. Fallback to partial match (e.g., "Delhi" matches "Delhi NCR")
            filteredList = data.filter(
                // Check if the city name in the data INCLUDES the selected city name
                (r) => r.city && r.city.toLowerCase().includes(lowerSelectedCity)
            );
            
            // 3. Final Fallback: If partial match also fails, show ALL restaurants 
            //    (This ensures the page doesn't break, though data may be inconsistent)
            if (filteredList.length === 0) {
                console.warn("Partial match also failed. Showing all restaurants as final fallback.");
                filteredList = data; 
            }
        }

        setRestaurants(filteredList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
        setRestaurants([]); 
      });
  }, [city]); // CRUCIAL: Re-run when city changes

  // Fetch data on initial load AND when the city changes
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);


  // --- Infinite Scroll Handler (Kept simple as data is fetched upfront) ---
  const handleScroll = useCallback(() => {
    return;
  }, []); 

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // --- FILTER LOGIC (Applied to the city-filtered data) ---
  const filteredItems = restaurants.filter((restaurant) => {
    
    // 1. Search Filter
    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        // Ensure fields exist before calling toLowerCase()
        const nameMatch = restaurant.name && restaurant.name.toLowerCase().includes(lowerSearch);
        const cuisineMatch = restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(lowerSearch);
        const menuMatch = restaurant.menu && restaurant.menu.some((dish) => 
            dish.name && dish.name.toLowerCase().includes(lowerSearch)
        );
        if (!nameMatch && !cuisineMatch && !menuMatch) return false;
    }

    // 2. Rating Filter (4.0+)
    if (activeFilters.includes("rating")) {
        if (parseFloat(restaurant.rating) < 4.0) return false;
    }

    // 3. Pure Veg Filter
    if (activeFilters.includes("veg")) {
        if (restaurant.isVeg === false) return false;
    }

    // 4. Specific Cuisine Filters
    const selectedCuisines = activeFilters.filter(f => f !== "rating" && f !== "veg");
    if (selectedCuisines.length > 0) {
        const restaurantCuisines = restaurant.cuisine ? restaurant.cuisine.toLowerCase() : '';
        const hasMatch = selectedCuisines.some(c => restaurantCuisines.includes(c.toLowerCase()));
        if (!hasMatch) return false;
    }

    return true;
  });

  return (
    <>
      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Delivery Restaurants in {city}
          </h1>
          
          <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {loading ? (
                <div className="col-span-3 text-center py-20">
                    <div className="inline-block w-8 h-8 border-4 border-zomatoRed border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 mt-2">Fetching the latest delivery options...</p>
                </div>
            ) : filteredItems.length > 0 ? (
                filteredItems.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} info={restaurant} currentCity={city} /> 
                ))
            ) : (
                <div className="col-span-3 text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-400">No restaurants found in {city} 😔</h2>
                    <p className="text-gray-400">Try removing some filters or changing the city.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;