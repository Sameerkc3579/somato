import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useLocation } from 'react-router-dom'; // Import useLocation to read query params
import Filters from "../components/Filters";
import RestaurantCard from "../components/RestaurantCard";

// NOTE: We assume this component receives the 'searchTerm' and 'city' prop from App.jsx
const Delivery = ({ searchTerm, city }) => { 
  // State to hold the full list of restaurants fetched from the API for the current city
  const [restaurants, setRestaurants] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState([]);
  
  // 🚨 VIRTUAL SCROLLING STATE 🚨
  // The number of items currently visible to the user
  const initialLoadCount = 18;
  const loadIncrement = 9; // Load 9 more items each time
  const [visibleCount, setVisibleCount] = useState(initialLoadCount);
  
  // Ref for the bottom-most element (used for Intersection Observer)
  const loaderRef = useRef(null); 
  
  // Get query parameters from URL (e.g., ?filter=Nightlife)
  const location = useLocation();

  // --- API DATA FETCHING (Triggered by City Change) ---
  const fetchRestaurants = useCallback(() => {
    setLoading(true);
    setVisibleCount(initialLoadCount); // Reset visible count on new city fetch
    
    // Fetch ALL data (since your API doesn't seem to filter by city directly)
    fetch("/api/restaurants") 
      .then((res) => res.json())
      .then((data) => {
        
        const lowerSelectedCity = city.toLowerCase().trim();

        // 1. Attempt a strict city match
        let filteredList = data.filter(
            (r) => r.city && r.city.toLowerCase().trim() === lowerSelectedCity
        );

        // 🚨 SOLUTION: Implement a fallback if the strict match fails 🚨
        if (filteredList.length === 0 && data.length > 0) {
            console.warn(`Strict city match failed for "${city}". Trying partial match as fallback.`);
            
            // 2. Fallback to partial match 
            filteredList = data.filter(
                (r) => r.city && r.city.toLowerCase().includes(lowerSelectedCity)
            );
            
            // 3. Final Fallback: If partial match also fails, show ALL restaurants 
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
  }, [city, initialLoadCount]); // Re-run when city changes

  // Fetch data on initial load AND when the city changes
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);


  // --- INITIALIZE FILTERS FROM URL QUERY PARAMETERS ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterFromUrl = params.get('filter'); // Get the value of ?filter=...
    
    // Check if the URL requested the Nightlife filter
    if (filterFromUrl === 'Nightlife' && activeFilters.length === 0) {
      // Set the active filter state to trigger the Nightlife logic below
      setActiveFilters(['Bar']); 
    }
  }, [location.search]);


  // --- FILTER LOGIC (Applied to the city-filtered data) ---
  // useMemo ensures this expensive filter operation only runs when dependencies change
  const filteredItems = useMemo(() => {
    return restaurants.filter((restaurant) => {
    
      // 1. Search Filter
      if (searchTerm) {
          const lowerSearch = searchTerm.toLowerCase();
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

      // 4. Specific Cuisine Filters (INCLUDING NIGHTLIFE/BAR)
      const selectedCuisines = activeFilters.filter(f => f !== "rating" && f !== "veg");
      if (selectedCuisines.length > 0) {
          const restaurantCuisines = restaurant.cuisine ? restaurant.cuisine.toLowerCase() : '';
          const hasMatch = selectedCuisines.some(c => {
              const lowerC = c.toLowerCase();
              
              // Handle Nightlife filter case: check for Bar, Pub, Nightlife tags
              if (lowerC === 'nightlife' || lowerC === 'bar') {
                  return restaurantCuisines.includes('bar') || restaurantCuisines.includes('pub') || restaurantCuisines.includes('nightlife');
              }
              
              // Handle general cuisine filters
              return restaurantCuisines.includes(lowerC);
          });
          if (!hasMatch) return false;
      }

      return true;
    });
  }, [restaurants, searchTerm, activeFilters]);


  // --- 🚨 INFINITE SCROLLING EFFECT (Intersection Observer) 🚨
  useEffect(() => {
    if (loading || !filteredItems.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredItems.length) {
          // If the loader is visible and there are more items to show, load more
          setVisibleCount(prevCount => prevCount + loadIncrement);
        }
      },
      {
        rootMargin: '200px', // Start loading when the user is 200px above the bottom
      }
    );

    // Attach the observer to the loader element
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // Cleanup function
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, filteredItems.length, visibleCount]); 


  // --- Items to render (Only a subset of the fully filtered list) ---
  const itemsToRender = filteredItems.slice(0, visibleCount);
  const showLoader = visibleCount < filteredItems.length;

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
            ) : itemsToRender.length > 0 ? (
                itemsToRender.map((restaurant) => (
                    <RestaurantCard key={restaurant._id} info={restaurant} currentCity={city} /> 
                ))
            ) : (
                <div className="col-span-3 text-center py-20">
                    <h2 className="text-2xl font-bold text-gray-400">No restaurants found in {city} 😔</h2>
                    <p className="text-gray-400">Try removing some filters or changing the city.</p>
                </div>
            )}
            
            {/* 🚨 LOADER/SCROLL TRIGGER 🚨 */}
            {showLoader && (
                <div ref={loaderRef} className="col-span-3 text-center py-4">
                    <div className="inline-block w-6 h-6 border-3 border-gray-300 border-t-zomatoRed rounded-full animate-spin"></div>
                    <p className="text-gray-500 mt-2">Loading more...</p>
                </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Delivery;