import React, { useState, useEffect } from "react";
import TabOptions from "../components/TabOptions";
import RestaurantCard from "../components/RestaurantCard"; 
import NightlifeFilters from "../components/NightlifeFilters"; 

// --- EXPANDED SIMULATED NIGHTLIFE DATA (48 Unique Images) ---
const nightlifeList = [
    // --- Batch 1 ---
    { id: 30, name: "The Irish House", rating: 4.4, cuisine: "Pub, Finger Food", price: "₹2500 for two", image: "https://images.pexels.com/photos/176378/pexels-photo-176378.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: true, type: "Pub", location: "Patna" },
    { id: 31, name: "Brewmaster's Heaven", rating: 4.6, cuisine: "Microbrewery, German", price: "₹2200 for two", image: "https://images.pexels.com/photos/158651/pexels-photo-158651.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: false, hasOutdoor: true, hasHappyHour: true, type: "Microbrewery", location: "Patna" },
    { id: 32, name: "The Electric Lounge", rating: 3.9, cuisine: "Lounge, Italian", price: "₹3000 for two", image: "https://tse3.mm.bing.net/th/id/OIP.dbeGnjBA2XQPmtR5iaGmKwHaE8?cb=ucfimg2&ucfimg=1&w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: false, type: "Lounge", location: "Patna" },
    { id: 33, name: "Club Zenith", rating: 4.1, cuisine: "Club, Global", price: "₹3500 for two", image: "https://images.pexels.com/photos/2087532/pexels-photo-2087532.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 34, name: "Hajipur Brew Co.", rating: 4.0, cuisine: "Brewery, American", price: "₹2000 for two", image: "https://images.pexels.com/photos/3482706/pexels-photo-3482706.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Brewery", location: "Hajipur" },
    { id: 35, name: "Skyline Bar", rating: 4.8, cuisine: "Lounge, Asian", price: "₹4000 for two", image: "https://images.pexels.com/photos/2263054/pexels-photo-2263054.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Lounge", location: "Patna" },

    // --- Batch 2 ---
    { id: 36, name: "The Whiskey Barrel", rating: 4.3, cuisine: "Pub, Steak", price: "₹2800 for two", image: "https://images.pexels.com/photos/1036324/pexels-photo-1036324.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Pub", location: "Patna" },
    { id: 37, name: "Retro Beats Club", rating: 3.5, cuisine: "Club, Fusion", price: "₹3200 for two", image: "https://images.pexels.com/photos/2794865/pexels-photo-2794865.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 38, name: "The Golden Tap", rating: 4.5, cuisine: "Microbrewery, Pizza", price: "₹1800 for two", image: "https://images.pexels.com/photos/2034878/pexels-photo-2034878.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: false, hasOutdoor: true, hasHappyHour: true, type: "Microbrewery", location: "Hajipur" },
    { id: 39, name: "The Den Lounge", rating: 4.2, cuisine: "Lounge, Desserts", price: "₹2700 for two", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: false, type: "Lounge", location: "Hajipur" },
    { id: 40, name: "Patna Social Pub", rating: 4.7, cuisine: "Pub, Indian", price: "₹2100 for two", image: "https://images.pexels.com/photos/1586991/pexels-photo-1586991.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Pub", location: "Patna" },
    { id: 41, name: "Hoppy Place Brewery", rating: 3.8, cuisine: "Brewery, Snacks", price: "₹1900 for two", image: "https://images.pexels.com/photos/2789311/pexels-photo-2789311.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: false, hasOutdoor: true, hasHappyHour: true, type: "Brewery", location: "Hajipur" },
    
    // --- Batch 3 ---
    { id: 42, name: "The Velvet Rope Club", rating: 4.5, cuisine: "Club, Exclusive", price: "₹4500 for two", image: "https://images.pexels.com/photos/1474828/pexels-photo-1474828.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 43, name: "Taproom Central Brewery", rating: 4.1, cuisine: "Brewery, Finger Food", price: "₹1900 for two", image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Brewery", location: "Hajipur" },
    { id: 44, name: "High Five Lounge", rating: 4.0, cuisine: "Lounge, Burgers", price: "₹2600 for two", image: "https://images.pexels.com/photos/1015694/pexels-photo-1015694.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Lounge", location: "Patna" },
    { id: 45, name: "The Sports Bar", rating: 3.7, cuisine: "Pub, Pizza", price: "₹1800 for two", image: "https://images.pexels.com/photos/1501712/pexels-photo-1501712.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: true, type: "Pub", location: "Hajipur" },
    { id: 46, name: "The Barrel & Grill Microbrewery", rating: 4.3, cuisine: "Microbrewery, BBQ", price: "₹2400 for two", image: "https://images.pexels.com/photos/2263054/pexels-photo-2263054.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Microbrewery", location: "Patna" },
    { id: 47, name: "Euphoria Club", rating: 4.2, cuisine: "Club, Drinks", price: "₹3800 for two", image: "https://images.pexels.com/photos/1474828/pexels-photo-1474828.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },

    // --- Batch 4 ---
    { id: 48, name: "Phoenix Lounge", rating: 4.6, cuisine: "Lounge, Cocktails", price: "₹3200 for two", image: "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Lounge", location: "Patna" },
    { id: 49, name: "The Classic Pub", rating: 4.0, cuisine: "Pub, English", price: "₹1900 for two", image: "https://images.pexels.com/photos/2115629/pexels-photo-2115629.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: true, type: "Pub", location: "Hajipur" },
    { id: 50, name: "Zero Gravity Club", rating: 3.8, cuisine: "Club, EDM", price: "₹3900 for two", image: "https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 51, name: "Barrel House Brewery", rating: 4.5, cuisine: "Brewery, Snacks", price: "₹2300 for two", image: "https://images.pexels.com/photos/158651/pexels-photo-158651.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Brewery", location: "Patna" },
    { id: 52, name: "The Copper Mug", rating: 4.1, cuisine: "Microbrewery, Pub", price: "₹2100 for two", image: "https://images.pexels.com/photos/2034878/pexels-photo-2034878.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Microbrewery", location: "Hajipur" },
    { id: 53, name: "Midnight Delight Lounge", rating: 4.7, cuisine: "Lounge, Desserts", price: "₹3100 for two", image: "https://images.pexels.com/photos/1015694/pexels-photo-1015694.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Lounge", location: "Patna" },

    // --- Batch 5 ---
    { id: 54, name: "The Local Taproom", rating: 4.3, cuisine: "Brewery, American", price: "₹1800 for two", image: "https://images.pexels.com/photos/3482706/pexels-photo-3482706.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: true, type: "Brewery", location: "Hajipur" },
    { id: 55, name: "District 9 Club", rating: 4.0, cuisine: "Club, High Energy", price: "₹4200 for two", image: "https://images.pexels.com/photos/2087532/pexels-photo-2087532.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 56, name: "The Royal Oak Pub", rating: 4.5, cuisine: "Pub, Traditional", price: "₹2500 for two", image: "https://images.pexels.com/photos/176378/pexels-photo-176378.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Pub", location: "Patna" },
    { id: 57, name: "Infinity Microbrewery", rating: 4.6, cuisine: "Microbrewery, Fusion", price: "₹2700 for two", image: "https://images.pexels.com/photos/2034878/pexels-photo-2034878.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: false, type: "Microbrewery", location: "Patna" },
    { id: 58, name: "The Terrace Bar", rating: 4.8, cuisine: "Lounge, Rooftop", price: "₹4000 for two", image: "https://images.pexels.com/photos/2263054/pexels-photo-2263054.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Lounge", location: "Hajipur" },
    { id: 59, name: "Pulse Nightclub", rating: 3.9, cuisine: "Club, Modern", price: "₹3500 for two", image: "https://images.pexels.com/photos/1474828/pexels-photo-1474828.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },

    // --- Batch 6 ---
    { id: 60, name: "The Dive Bar", rating: 3.5, cuisine: "Pub, Budget", price: "₹1500 for two", image: "https://images.pexels.com/photos/1572528/pexels-photo-1572528.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: true, type: "Pub", location: "Hajipur" },
    { id: 61, name: "Urban Barrel Microbrewery", rating: 4.1, cuisine: "Microbrewery, Snacks", price: "₹2000 for two", image: "https://images.pexels.com/photos/2034878/pexels-photo-2034878.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Microbrewery", location: "Patna" },
    { id: 62, name: "Liquid Lounge", rating: 4.3, cuisine: "Lounge, Signature Drinks", price: "₹3400 for two", image: "https://tse3.mm.bing.net/th/id/OIP.dbeGnjBA2XQPmtR5iaGmKwHaE8?cb=ucfimg2&ucfimg=1&w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: false, type: "Lounge", location: "Patna" },
    { id: 63, name: "The Grand Club", rating: 4.7, cuisine: "Club, VIP", price: "₹5000 for two", image: "https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 64, name: "The Corner Brewery", rating: 4.0, cuisine: "Brewery, Pub Grub", price: "₹1900 for two", image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Brewery", location: "Hajipur" },
    { id: 65, name: "Red Dragon Pub", rating: 4.2, cuisine: "Pub, Asian", price: "₹2200 for two", image: "https://images.pexels.com/photos/2115629/pexels-photo-2115629.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Pub", location: "Patna" },

    // --- Batch 7 ---
    { id: 66, name: "Silent Disco Club", rating: 4.5, cuisine: "Club, Fun", price: "₹3600 for two", image: "https://images.pexels.com/photos/2087532/pexels-photo-2087532.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 67, name: "The Speakeasy Lounge", rating: 4.8, cuisine: "Lounge, Exclusive", price: "₹4500 for two", image: "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Lounge", location: "Patna" },
    { id: 68, name: "The Patio Bar", rating: 4.3, cuisine: "Pub, Outdoor", price: "₹2100 for two", image: "https://images.pexels.com/photos/1501712/pexels-photo-1501712.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Pub", location: "Hajipur" },
    { id: 69, name: "Riverview Microbrewery", rating: 4.6, cuisine: "Microbrewery, Scenic", price: "₹2800 for two", image: "https://images.pexels.com/photos/2034878/pexels-photo-2034878.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Microbrewery", location: "Patna" },
    { id: 70, name: "Hajipur Hangout Club", rating: 4.0, cuisine: "Club, Local", price: "₹3000 for two", image: "https://images.pexels.com/photos/3482706/pexels-photo-3482706.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: true, type: "Club", location: "Hajipur" },
    { id: 71, name: "The Golden Hour Lounge", rating: 4.9, cuisine: "Lounge, Premium", price: "₹5500 for two", image: "https://images.pexels.com/photos/2263054/pexels-photo-2263054.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: false, type: "Lounge", location: "Patna" },
    
    // --- Batch 8 ---
    { id: 72, name: "The Last Call Pub", rating: 3.9, cuisine: "Pub, Late Night", price: "₹1800 for two", image: "https://images.pexels.com/photos/1572528/pexels-photo-1572528.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Pub", location: "Patna" },
    { id: 73, name: "Highlander Brewery", rating: 4.2, cuisine: "Brewery, Scottish", price: "₹2400 for two", image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Brewery", location: "Patna" },
    { id: 74, name: "The Cozy Corner Microbrewery", rating: 4.5, cuisine: "Microbrewery, Comfort Food", price: "₹2100 for two", image: "https://images.pexels.com/photos/2034878/pexels-photo-2034878.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: false, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: true, type: "Microbrewery", location: "Hajipur" },
    { id: 75, name: "Vibe Club", rating: 4.1, cuisine: "Club, Techno", price: "₹3700 for two", image: "https://images.pexels.com/photos/2087532/pexels-photo-2087532.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: false, hasOutdoor: false, hasHappyHour: false, type: "Club", location: "Patna" },
    { id: 76, name: "Fusion Lounge", rating: 4.4, cuisine: "Lounge, Global", price: "₹3300 for two", image: "https://tse3.mm.bing.net/th/id/OIP.dbeGnjBA2XQPmtR5iaGmKwHaE8?cb=ucfimg2&ucfimg=1&w=1200&h=800&rs=1&pid=ImgDetMain&o=7&rm=3", servesCocktails: true, hasLiveMusic: true, hasOutdoor: false, hasHappyHour: true, type: "Lounge", location: "Hajipur" },
    { id: 77, name: "The Patriot Pub", rating: 4.6, cuisine: "Pub, Irish", price: "₹2300 for two", image: "https://images.pexels.com/photos/176378/pexels-photo-176378.jpeg?auto=compress&cs=tinysrgb&w=600", servesCocktails: true, hasLiveMusic: true, hasOutdoor: true, hasHappyHour: true, type: "Pub", location: "Patna" }
];


const Nightlife = () => {
    const INITIAL_LOAD_COUNT = 6;
    const LOAD_STEP = 6; 

    const [activeFilters, setActiveFilters] = useState([]);
    const [displayedNightlifeItems, setDisplayedNightlifeItems] = useState(nightlifeList.slice(0, INITIAL_LOAD_COUNT));
    const [isLoading, setIsLoading] = useState(false);

    // Reset initial display when filters change
    useEffect(() => {
        const initialFiltered = filteredItems.slice(0, INITIAL_LOAD_COUNT);
        setDisplayedNightlifeItems(initialFiltered);
    }, [activeFilters]); 

    // --- FILTERING LOGIC ---
    const filteredItems = nightlifeList.filter((spot) => {
        // 1. Feature Filters
        if (activeFilters.includes("cocktails") && !spot.servesCocktails) { return false; }
        if (activeFilters.includes("liveMusic") && !spot.hasLiveMusic) { return false; }
        if (activeFilters.includes("outdoorBar") && !spot.hasOutdoor) { return false; }
        if (activeFilters.includes("happyHour") && !spot.hasHappyHour) { return false; }
        
        // 2. Bar Type Filters
        const selectedTypes = activeFilters.filter(f => !["cocktails", "liveMusic", "outdoorBar", "happyHour"].includes(f));
        
        if (selectedTypes.length > 0) {
            const hasMatch = selectedTypes.some(type => spot.type === type);
            if (!hasMatch) return false;
        }

        return true;
    });
    
    const hasMoreToLoad = displayedNightlifeItems.length < filteredItems.length;


    // --- INFINITE SCROLL HANDLER (Using the reliable logic) ---
    const handleScroll = () => {
        if (!hasMoreToLoad || isLoading) return; 
        
        const scrollThreshold = 300; 
        
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        const isNearBottom = (scrollTop + clientHeight) >= (scrollHeight - scrollThreshold);

        if (isNearBottom) {
            setIsLoading(true);
            
            const currentCount = displayedNightlifeItems.length;
            const nextBatch = filteredItems.slice(currentCount, currentCount + LOAD_STEP);

            setTimeout(() => {
                setDisplayedNightlifeItems(prev => [...prev, ...nextBatch]);
                setIsLoading(false);
            }, 300); // Simulate network delay
        }
    };
    
    // --- SET UP SCROLL LISTENER ---
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, [displayedNightlifeItems.length, filteredItems.length, isLoading]); 

    return (
        <>
            <TabOptions activeTab="Nightlife" />
            <div className="bg-white min-h-screen pb-20">
                <div className="max-w-6xl mx-auto px-4 pt-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">
                        Nightlife in Patna & Hajipur
                    </h1>
                    
                    <NightlifeFilters 
                        activeFilters={activeFilters} 
                        setActiveFilters={setActiveFilters} 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                        {displayedNightlifeItems.length > 0 ? (
                            displayedNightlifeItems.map((spot) => (
                                <RestaurantCard key={spot.id} info={spot} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-20">
                                <h2 className="text-2xl font-bold text-gray-400">No nightlife spots found 😔</h2>
                                <p className="text-gray-400">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Loading Spinner */}
                    {hasMoreToLoad && isLoading && (
                        <div className="p-10 text-center">
                            <span className="w-6 h-6 border-4 border-zomatoRed border-t-transparent rounded-full animate-spin inline-block"></span>
                            <p className="text-sm text-gray-500 mt-2">Mixing another round of recommendations...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Nightlife;