import React, { useState, useEffect, useCallback } from "react";
import TabOptions from "../components/TabOptions";
import RestaurantCard from "../components/RestaurantCard"; 
import DiningFilters from "../components/DiningFilters"; 

// --- EXPANDED SIMULATED DINING DATA (15 total) ---
const diningList = [
    // --- 9 Initial Restaurants ---
    { id: 10, name: "BBQ Grand Buffet", rating: 4.4, cuisine: "Barbeque, North Indian", price: "₹1800 for two", image: "https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: true, servesBuffet: true, location: "Patna" },
    { id: 11, name: "The Royal Table", rating: 4.1, cuisine: "North Indian, Mughlai", price: "₹1200 for two", image: "https://images.pexels.com/photos/1449767/pexels-photo-1449767.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: false, servesBuffet: false, location: "Patna" },
    { id: 12, name: "Green Leaf Pure Veg", rating: 4.6, cuisine: "South Indian, North Indian", price: "₹800 for two", image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: true, hasBooking: false, hasOutdoor: false, servesBuffet: false, location: "Hajipur" },
    { id: 13, name: "Italian Bistro", rating: 4.2, cuisine: "Italian, Continental", price: "₹1500 for two", image: "https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: true, hasBooking: true, hasOutdoor: true, servesBuffet: false, location: "Patna" },
    { id: 14, name: "Chopsticks Diner", rating: 3.9, cuisine: "Chinese, Asian", price: "₹900 for two", image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: false, hasOutdoor: false, servesBuffet: false, location: "Hajipur" },
    { id: 15, name: "Tandoori Nights", rating: 4.5, cuisine: "North Indian, Mughlai", price: "₹1100 for two", image: "https://images.pexels.com/photos/9609835/pexels-photo-9609835.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: true, servesBuffet: false, location: "Patna" },
    { id: 16, name: "Cafe Delight", rating: 3.8, cuisine: "Cafe, Beverages", price: "₹700 for two", image: "https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: true, hasBooking: false, hasOutdoor: true, servesBuffet: false, location: "Hajipur" },
    { id: 17, name: "Spice Route", rating: 4.3, cuisine: "Indian, Hyderabadi", price: "₹1300 for two", image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: false, servesBuffet: false, location: "Patna" },
    { id: 18, name: "The Vault Lounge", rating: 4.7, cuisine: "Finger Food, Continental", price: "₹2000 for two", image: "https://images.pexels.com/photos/1239922/pexels-photo-1239922.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: true, servesBuffet: false, location: "Patna" },
    
    // --- Remaining Restaurants (To be loaded by infinite scroll) ---
    { id: 19, name: "Sunset Grill", rating: 4.0, cuisine: "American, BBQ", price: "₹1600 for two", image: "https://images.pexels.com/photos/4551722/pexels-photo-4551722.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: false, hasOutdoor: true, servesBuffet: false, location: "Patna" },
    { id: 20, name: "Dosa World", rating: 4.5, cuisine: "South Indian", price: "₹500 for two", image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: true, hasBooking: false, hasOutdoor: false, servesBuffet: false, location: "Hajipur" },
    { id: 21, name: "Shri Mahavir Sweets", rating: 4.1, cuisine: "Sweets, Indian", price: "₹300 for two", image: "https://images.pexels.com/photos/5638276/pexels-photo-5638276.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: true, hasBooking: false, hasOutdoor: false, servesBuffet: false, location: "Hajipur" },
    { id: 22, name: "Noodle House", rating: 3.7, cuisine: "Chinese", price: "₹850 for two", image: "https://images.pexels.com/photos/1897033/pexels-photo-1897033.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: false, hasOutdoor: false, servesBuffet: false, location: "Patna" },
    { id: 23, name: "The Big Chill", rating: 4.8, cuisine: "European, Desserts", price: "₹1700 for two", image: "https://images.pexels.com/photos/1798314/pexels-photo-1798314.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: true, servesBuffet: false, location: "Patna" },
    { id: 24, name: "Urban Tandoor", rating: 4.6, cuisine: "North Indian", price: "₹950 for two", image: "https://images.pexels.com/photos/1199958/pexels-photo-1199958.jpeg?auto=compress&cs=tinysrgb&w=600", isDiningVeg: false, hasBooking: true, hasOutdoor: false, servesBuffet: false, location: "Hajipur" },
];

const DiningOut = () => {
    const INITIAL_DISPLAY_COUNT = 9;
    const LOAD_STEP = 6; 
    
    // State to hold the displayed list
    const [displayedDiningItems, setDisplayedDiningItems] = useState(diningList.slice(0, INITIAL_DISPLAY_COUNT));
    const [activeFilters, setActiveFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Filter the full list based on active filters
    const filteredItems = diningList.filter((restaurant) => {
        if (activeFilters.includes("tableBooking") && !restaurant.hasBooking) { return false; }
        if (activeFilters.includes("outdoorSeating") && !restaurant.hasOutdoor) { return false; }
        if (activeFilters.includes("buffet") && !restaurant.servesBuffet) { return false; }
        if (activeFilters.includes("pureVeg") && !restaurant.isDiningVeg) { return false; }
        
        const selectedCuisines = activeFilters.filter(f => !["tableBooking", "outdoorSeating", "buffet", "pureVeg"].includes(f));
        
        if (selectedCuisines.length > 0) {
            const restaurantCuisines = restaurant.cuisine.toLowerCase();
            const hasMatch = selectedCuisines.some(c => restaurantCuisines.includes(c.toLowerCase()));
            if (!hasMatch) return false;
        }

        return true;
    });

    // --- SCROLL / LOAD LOGIC (Matches your Delivery.jsx structure) ---
    
    const loadMoreItems = () => {
        setIsLoading(true);
        // Find the index of the last displayed item in the filtered list
        const currentCount = displayedDiningItems.length;
        
        // Items to add are the next batch from the filtered list
        const nextBatch = filteredItems.slice(currentCount, currentCount + LOAD_STEP);

        setTimeout(() => {
            // Update the displayed items
            setDisplayedDiningItems(prev => [...prev, ...nextBatch]);
            setIsLoading(false);
        }, 300); // Small delay for effect
    };


    const handleScroll = useCallback(() => {
        // Prevent loading if loading OR if all filtered items are already visible
        if (isLoading || displayedDiningItems.length >= filteredItems.length) return;
        
        // Use the robust scroll check from your working Delivery.jsx context
        if (
            window.innerHeight + document.documentElement.scrollTop + 300 >=
            document.documentElement.scrollHeight
        ) {
            loadMoreItems();
        }
    }, [isLoading, filteredItems.length, displayedDiningItems.length]); // Dependencies must be explicit

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // --- Filter Reset Logic (Crucial for infinite scroll) ---
    useEffect(() => {
        // When filters change, reset the displayed list to the initial state
        setDisplayedDiningItems(filteredItems.slice(0, INITIAL_DISPLAY_COUNT));
    }, [activeFilters]);
    // Note: We depend on activeFilters, but NOT filteredItems to prevent infinite loop
    // because filteredItems depends on activeFilters.

    return (
        <>
            <TabOptions activeTab="Dining Out" />
            <div className="bg-white min-h-screen pb-20">
                <div className="max-w-6xl mx-auto px-4 pt-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Dining Out Restaurants
                    </h1>
                    
                    <DiningFilters 
                        activeFilters={activeFilters} 
                        setActiveFilters={setActiveFilters} 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {displayedDiningItems.length > 0 ? (
                            displayedDiningItems.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} info={restaurant} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20">
                                <h2 className="text-2xl font-bold text-gray-400">No dining places found 😔</h2>
                                <p className="text-gray-400">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="p-10 text-center">
                            <div className="inline-block w-8 h-8 border-4 border-zomatoRed border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default DiningOut;