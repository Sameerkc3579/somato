import React, { useState, useEffect, useRef, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import RestaurantCard from "../components/RestaurantCard"; 
import TabOptions from "../components/TabOptions";

// --- DINING DATA ---
const diningData = [
  { name: "Barbeque Nation", cuisine: "BBQ, North Indian", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" },
  { name: "Mainland China", cuisine: "Chinese, Asian", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80" },
  { name: "Punjab Grill", cuisine: "North Indian, Mughlai", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
  { name: "The GT Road", cuisine: "North Indian, Buffet", image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80" },
  { name: "Pirates of Grill", cuisine: "BBQ, Continental", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80" },
  { name: "Absolute Barbecues", cuisine: "BBQ, Indian", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80" },
  { name: "Chili's", cuisine: "American, Mexican", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" },
  { name: "Nando's", cuisine: "Portuguese, Chicken", image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&q=80" },
  { name: "TGI Fridays", cuisine: "American, Bar", image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80" },
  { name: "Hard Rock Cafe", cuisine: "American, Burgers", image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80" },
  { name: "Social", cuisine: "Continental, Indian", image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80" },
  { name: "Farzi Cafe", cuisine: "Modern Indian", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" },
  { name: "The Bombay Canteen", cuisine: "Indian, Modern", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c2ed54?w=800&q=80" },
  { name: "Indian Accent", cuisine: "Modern Indian", image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80" },
  { name: "Bukhara", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80" },
  { name: "Dum Pukht", cuisine: "Lucknowi, Mughlai", image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80" },
  { name: "Peshawri", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800&q=80" },
  { name: "Dakshin", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80" },
  { name: "Karavalli", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1626804475297-411d8c669930?w=800&q=80" },
  { name: "Jamavar", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1596701062302-8a50d2aa8f0c?w=800&q=80" },
  { name: "Wasabi by Morimoto", cuisine: "Japanese, Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80" },
  { name: "Megu", cuisine: "Japanese", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800&q=80" },
  { name: "Le Cirque", cuisine: "French, Italian", image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=800&q=80" },
  { name: "Orient Express", cuisine: "European", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" },
  { name: "1911", cuisine: "Continental", image: "https://images.unsplash.com/photo-1578474843222-9593bc81e58f?w=800&q=80" },
  { name: "The Spice Route", cuisine: "Thai, Asian", image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80" },
  { name: "Sevilla", cuisine: "Spanish, Tapas", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" },
  { name: "Threesixtyone", cuisine: "Multi-Cuisine", image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80" },
  { name: "K3", cuisine: "JW Marriott", image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80" },
  { name: "Spectra", cuisine: "Multi-Cuisine", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80" },
  { name: "The Pavilion", cuisine: "Continental", image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80" },
  { name: "Tamra", cuisine: "Asian, Indian", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
  { name: "AnnaMaya", cuisine: "European, Indian", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" },
  { name: "Pluck", cuisine: "Modern European", image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=800&q=80" },
  { name: "The Qube", cuisine: "Continental", image: "https://images.unsplash.com/photo-1578474843222-9593bc81e58f?w=800&q=80" },
  { name: "Machan", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80" },
  { name: "The Capital Kitchen", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
  { name: "Yellow Brick Road", cuisine: "Continental", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80" },
  { name: "Gulati", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?w=800&q=80" },
  { name: "Havemore", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80" },
  { name: "Pind Balluchi", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80" },
  { name: "Moti Mahal Delux", cuisine: "Mughlai", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80" },
  { name: "Kwality", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80" },
  { name: "United Coffee House", cuisine: "Continental", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" },
  { name: "Embassy", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80" },
  { name: "Wenger's", cuisine: "Bakery, Fast Food", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80" },
  { name: "The Big Chill", cuisine: "Italian, Cafe", image: "https://images.unsplash.com/photo-1579970373678-4394c8e734c6?w=800&q=80" },
  { name: "Diggin", cuisine: "Italian, Continental", image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&q=80" },
  { name: "Music & Mountains", cuisine: "Continental", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=800&q=80" },
  { name: "Olive Bar & Kitchen", cuisine: "Mediterranean", image: "https://images.unsplash.com/photo-1572528751508-349887707e76?w=800&q=80" }
];

const fullDiningList = diningData.map((item, index) => ({
    id: 200 + index,
    name: item.name,
    rating: (Math.random() * (4.9 - 3.8) + 3.8).toFixed(1),
    cuisine: item.cuisine,
    price: `₹${Math.floor(Math.random() * 2000) + 800} for two`,
    image: item.image,
    hasBooking: index % 2 === 0,
    hasOutdoor: index % 3 === 0,
    servesBuffet: index % 4 === 0,
    isDiningVeg: index % 5 === 0,
    discount: index % 4 === 0 ? "Flat 20% OFF" : null
}));

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// 🔥 1. Define Filterable Cuisines
const CUISINE_OPTIONS = [
    "North Indian", "Chinese", "Italian", "Continental", "Mughlai", "BBQ",
    "Japanese", "Thai", "Asian", "Modern Indian", "South Indian", "Mediterranean", 
    "European", "American", "Mexican", "Cafe", "Bakery"
];

// Reusable Filter Button Component
const FilterButton = ({ icon: Icon, text, hasDropdown, active, onClick, badgeCount }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-4 py-2 bg-white border ${active ? 'border-[#EF4F5F] bg-red-50 text-[#EF4F5F]' : 'border-gray-300 text-gray-500'} rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-all`}
  >
    {Icon && <Icon className="w-4 h-4" />} 
    {text} 
    {badgeCount > 0 && <span className="bg-[#EF4F5F] text-white text-[10px] px-1.5 py-0.5 rounded-full">{badgeCount}</span>}
    {hasDropdown && <ChevronDown className="w-4 h-4" />}
  </button>
);

const DiningOut = ({ city }) => { 
    // 🔥 2. Add State for Filters
    const [activeFilters, setActiveFilters] = useState([]);
    const [activeCuisines, setActiveCuisines] = useState([]);
    const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);

    const [infiniteList, setInfiniteList] = useState([]);
    const loaderRef = useRef(null);
    
    // 🔥 3. Filter Logic
    const filteredList = useMemo(() => fullDiningList.filter(r => { 
        // Standard Filters
        if (activeFilters.includes("tableBooking") && !r.hasBooking) return false;
        if (activeFilters.includes("outdoorSeating") && !r.hasOutdoor) return false;
        if (activeFilters.includes("buffet") && !r.servesBuffet) return false;
        if (activeFilters.includes("pureVeg") && !r.isDiningVeg) return false;
        
        // Cuisine Filter
        if (activeCuisines.length > 0) {
            const hasMatch = activeCuisines.some(selectedCuisine => 
                r.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
            );
            if (!hasMatch) return false;
        }

        return true;
    }), [activeFilters, activeCuisines]);

    useEffect(() => { setInfiniteList(filteredList.slice(0, 9)); }, [filteredList]);

    useEffect(() => {
        if(filteredList.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setInfiniteList(prev => [...prev, ...shuffleArray(filteredList).slice(0, 6)]);
            }
        }, { rootMargin: '200px', threshold: 0.1 });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
    }, [filteredList]); 

    // Helpers
    const toggleFilter = (f) => setActiveFilters(prev => prev.includes(f) ? prev.filter(i => i !== f) : [...prev, f]);
    const toggleCuisine = (c) => {
        setActiveCuisines(prev => prev.includes(c) ? prev.filter(i => i !== c) : [...prev, c]);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20 w-full overflow-x-hidden">
            <TabOptions activeTab="Dining Out" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🔥 4. Invisible Backdrop to Close Dropdown */}
                {isCuisineDropdownOpen && (
                    <div className="fixed inset-0 z-40" onClick={() => setIsCuisineDropdownOpen(false)}></div>
                )}

                <div className="py-4 mb-6 relative z-50">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Dining Out Restaurants in <span className="font-bold text-[#EF4F5F]">{city || "Hajipur"}</span></h1>
                    
                    <div className="flex flex-wrap gap-3">
                        <FilterButton icon={SlidersHorizontal} text="Filters" />
                        <FilterButton text="Table Booking" active={activeFilters.includes("tableBooking")} onClick={() => toggleFilter("tableBooking")} />
                        <FilterButton text="Outdoor Seating" active={activeFilters.includes("outdoorSeating")} onClick={() => toggleFilter("outdoorSeating")} />
                        <FilterButton text="Serves Buffet" active={activeFilters.includes("buffet")} onClick={() => toggleFilter("buffet")} />
                        <FilterButton text="Pure Veg" active={activeFilters.includes("pureVeg")} onClick={() => toggleFilter("pureVeg")} />
                        
                        {/* 🔥 5. Cuisines Dropdown Container */}
                        <div className="relative">
                            <FilterButton 
                                text="Cuisines" 
                                hasDropdown 
                                active={activeCuisines.length > 0}
                                badgeCount={activeCuisines.length}
                                onClick={() => setIsCuisineDropdownOpen(!isCuisineDropdownOpen)} 
                            />
                            
                            {/* Dropdown Menu */}
                            {isCuisineDropdownOpen && (
                                <div className="absolute top-12 left-0 bg-white border border-gray-100 shadow-xl rounded-xl p-4 w-64 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-bold text-gray-700">Select Cuisines</span>
                                        {activeCuisines.length > 0 && (
                                            <button onClick={() => setActiveCuisines([])} className="text-xs text-[#EF4F5F] font-bold hover:underline">Clear</button>
                                        )}
                                    </div>
                                    
                                    <div className="max-h-64 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                                        {CUISINE_OPTIONS.map((cuisine) => (
                                            <div 
                                                key={cuisine} 
                                                onClick={() => toggleCuisine(cuisine)}
                                                className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${activeCuisines.includes(cuisine) ? "bg-[#EF4F5F] border-[#EF4F5F]" : "border-gray-300"}`}>
                                                        {activeCuisines.includes(cuisine) && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <span className={`text-sm ${activeCuisines.includes(cuisine) ? "text-gray-800 font-medium" : "text-gray-500"}`}>{cuisine}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredList.length > 0 ? (
                        infiniteList.map((restaurant, index) => (
                            <RestaurantCard key={`${restaurant.id}-${index}`} info={restaurant} currentCity={city} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <div className="text-4xl mb-4">🍽️</div>
                            <p>No restaurants match your filters.</p>
                            <button onClick={() => {setActiveFilters([]); setActiveCuisines([]);}} className="mt-4 text-[#EF4F5F] font-bold hover:underline">Clear all filters</button>
                        </div>
                    )}
                    
                    {filteredList.length > 0 && (
                        <div ref={loaderRef} className="col-span-1 md:col-span-2 lg:col-span-3 h-20 flex justify-center items-center">
                             <div className="w-8 h-8 border-4 border-gray-200 border-t-[#EF4F5F] rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DiningOut;