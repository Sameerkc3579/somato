import React, { useState, useEffect, useRef, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, X, Check } from 'lucide-react'; // Added X and Check icons
import RestaurantCard from "../components/RestaurantCard"; 
import TabOptions from "../components/TabOptions";

// --- 50 UNIQUE REAL IMAGES FOR DELIVERY (SAME DATA AS BEFORE) ---
const deliveryData = [
  { name: "Domino's Pizza", cuisine: "Pizza, Fast Food", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80" },
  { name: "KFC", cuisine: "Burger, Fast Food", image: "https://website.menu.app/app/uploads/sites/76/kfc-picture-with-colonel-burger_2880x1800.jpg" },
  { name: "Burger King", cuisine: "Burger, American", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80" },
  { name: "Subway", cuisine: "Healthy, Sandwich", image: "https://thumbs.dreamstime.com/b/subway-restaurant-20140255.jpg" },
  { name: "McDonald's", cuisine: "Burger, Fast Food", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80" },
  { name: "Haldiram's", cuisine: "North Indian, Sweets", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80" },
  { name: "Pizza Hut", cuisine: "Pizza, Pasta", image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80" },
  { name: "Bikanervala", cuisine: "Mithai, Street Food", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80" },
  { name: "Biryani Blues", cuisine: "Biryani, Hyderabadi", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80" },
  { name: "Behrouz Biryani", cuisine: "Biryani, Mughlai", image: "https://images.unsplash.com/photo-1631515243349-e06036043944?w=800&q=80" },
  { name: "Faasos", cuisine: "Wraps, Fast Food", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80" },
  { name: "Oven Story Pizza", cuisine: "Pizza", image: "https://images.unsplash.com/photo-1593560708920-6316e4e6ec28?w=800&q=80" },
  { name: "LunchBox", cuisine: "North Indian, Thalis", image: "https://images.unsplash.com/photo-1546833999-b9f5816029bd?w=800&q=80" },
  { name: "The Good Bowl", cuisine: "North Indian, Asian", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80" },
  { name: "Sweet Truth", cuisine: "Desserts, Bakery", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80" },
  { name: "Firangi Bake", cuisine: "Mexican, Italian", image: "https://images.unsplash.com/photo-1551183053-bf91b1dca038?w=800&q=80" },
  { name: "Mandarin Oak", cuisine: "Chinese, Asian", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80" },
  { name: "Slay Coffee", cuisine: "Coffee, Beverages", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80" },
  { name: "Chai Point", cuisine: "Tea, Snacks", image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=800&q=80" },
  { name: "Chaayos", cuisine: "Tea, Desi Snacks", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80" },
  { name: "Keventers", cuisine: "Shake, Beverages", image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&q=80" },
  { name: "Frozen Bottle", cuisine: "Desserts, Shakes", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80" },
  { name: "Goli Vada Pav", cuisine: "Street Food", image: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?w=800&q=80" },
  { name: "Wow! Momo", cuisine: "Momos, Tibetan", image: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=800&q=80" },
  { name: "Wow! China", cuisine: "Chinese", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&q=80" },
  { name: "Tibbs Frankie", cuisine: "Rolls, Fast Food", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800&q=80" },
  { name: "Rolls Mania", cuisine: "Rolls, Wraps", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80" },
  { name: "Taco Bell", cuisine: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80" },
  { name: "La Pino'z Pizza", cuisine: "Pizza, Italian", image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=800&q=80" },
  { name: "Belgian Waffle", cuisine: "Waffle, Desserts", image: "https://images.unsplash.com/photo-1562083236-4c3c34a23753?w=800&q=80" },
  { name: "Theobroma", cuisine: "Bakery, Desserts", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80" },
  { name: "Dunkin'", cuisine: "Donuts, Coffee", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80" },
  { name: "Krispy Kreme", cuisine: "Donuts, Desserts", image: "https://images.unsplash.com/photo-1626094309830-26d8d30213a7?w=800&q=80" },
  { name: "Baskin Robbins", cuisine: "Ice Cream", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80" },
  { name: "Naturals Ice Cream", cuisine: "Ice Cream", image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d1?w=800&q=80" },
  { name: "Gianis", cuisine: "Ice Cream, Desserts", image: "https://images.unsplash.com/photo-1558500272-3e2849209793?w=800&q=80" },
  { name: "Kwality Wall's", cuisine: "Ice Cream", image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=800&q=80" },
  { name: "Vadilal", cuisine: "Ice Cream", image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=800&q=80" },
  { name: "Cream Bell", cuisine: "Ice Cream", image: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=800&q=80" },
  { name: "Havmor", cuisine: "Ice Cream", image: "https://images.unsplash.com/photo-1567206563064-6f60f40a2c57?w=800&q=80" },
  { name: "Amul", cuisine: "Ice Cream, Desserts", image: "https://images.unsplash.com/photo-1626804475297-411d8c669930?w=800&q=80" },
  { name: "Sagar Ratna", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80" },
  { name: "Saravana Bhavan", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?w=800&q=80" },
  { name: "Naivedyam", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1630395822970-4b1d62eb7469?w=800&q=80" },
  { name: "Moti Mahal", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=80" },
  { name: "Karim's", cuisine: "Mughlai, North Indian", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" },
  { name: "Paradise Biryani", cuisine: "Biryani", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&q=80" },
  { name: "Bawarchi", cuisine: "Biryani, North Indian", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&q=80" },
  { name: "Hotel Saravana", cuisine: "South Indian", image: "https://images.unsplash.com/photo-1606491956689-2ea28c674675?w=800&q=80" },
  { name: "Punjabi Rasoi", cuisine: "North Indian", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80" }
];

const fullDeliveryList = deliveryData.map((item, index) => ({
    id: 100 + index,
    name: item.name,
    rating: (Math.random() * (4.9 - 3.5) + 3.5).toFixed(1),
    cuisine: item.cuisine,
    price: `₹${Math.floor(Math.random() * 400) + 150} for one`,
    image: item.image,
    deliveryTime: `${Math.floor(Math.random() * 30) + 20} min`,
    isVeg: index % 4 === 0,
    discount: index % 3 === 0 ? "50% OFF" : null
}));

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// 🔥 1. Define Filterable Cuisines
const CUISINE_OPTIONS = [
    "North Indian", "South Indian", "Chinese", "Italian", 
    "Pizza", "Burger", "Biryani", "Fast Food", "Desserts", 
    "Ice Cream", "Street Food", "Healthy", "Rolls", "Mughlai"
];

// Reusable Filter Button Component
const FilterButton = ({ icon: Icon, text, hasDropdown, active, onClick, badgeCount }) => (
  <button 
    onClick={onClick} 
    className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm font-medium transition-all ${
        active 
        ? 'border-[#EF4F5F] bg-red-50 text-[#EF4F5F]' 
        : 'border-gray-300 text-gray-500 hover:bg-gray-50'
    }`}
  >
    {Icon && <Icon className="w-4 h-4" />} 
    {text} 
    {badgeCount > 0 && <span className="bg-[#EF4F5F] text-white text-[10px] px-1.5 py-0.5 rounded-full">{badgeCount}</span>}
    {hasDropdown && <ChevronDown className="w-4 h-4" />}
  </button>
);

const Delivery = ({ city }) => {
  // 🔥 2. Add State for Filters
  const [activeFilters, setActiveFilters] = useState([]);
  const [activeCuisines, setActiveCuisines] = useState([]);
  const [isCuisineDropdownOpen, setIsCuisineDropdownOpen] = useState(false);
  
  const [infiniteList, setInfiniteList] = useState([]);
  const loaderRef = useRef(null);

  // 🔥 3. Filter Logic
  const filteredList = useMemo(() => {
    return fullDeliveryList.filter((restaurant) => {
      // Rating Filter
      if (activeFilters.includes("rating") && parseFloat(restaurant.rating) < 4.0) return false;
      // Pure Veg Filter
      if (activeFilters.includes("veg") && !restaurant.isVeg) return false;
      
      // Cuisine Filter
      if (activeCuisines.length > 0) {
        // Check if restaurant cuisine string contains ANY of the selected active cuisines
        const hasMatch = activeCuisines.some(selectedCuisine => 
            restaurant.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase())
        );
        if (!hasMatch) return false;
      }

      return true;
    });
  }, [activeFilters, activeCuisines]);

  useEffect(() => { setInfiniteList(filteredList.slice(0, 12)); }, [filteredList]);

  // Infinite Scroll Observer
  useEffect(() => {
    if(filteredList.length === 0) return;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
             setInfiniteList(prev => [...prev, ...shuffleArray(filteredList).slice(0, 8)]);
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
    <div className="min-h-screen bg-gray-50/20 pb-20 w-full overflow-x-hidden">
      <TabOptions activeTab="Delivery" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 🔥 4. Invisible Backdrop to Close Dropdown */}
        {isCuisineDropdownOpen && (
            <div className="fixed inset-0 z-10" onClick={() => setIsCuisineDropdownOpen(false)}></div>
        )}

        <div className="py-4 mb-2 relative z-50">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Delivery Restaurants in <span className="font-bold text-[#EF4F5F]">{city || "Hajipur"}</span></h1>
            
            <div className="flex flex-wrap gap-3">
                <FilterButton icon={SlidersHorizontal} text="Filters" />
                
                <FilterButton 
                    text="Rating: 4.0+" 
                    active={activeFilters.includes("rating")} 
                    onClick={() => toggleFilter("rating")} 
                />
                
                <FilterButton 
                    text="Pure Veg" 
                    active={activeFilters.includes("veg")} 
                    onClick={() => toggleFilter("veg")} 
                />
                
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

        {/* Results Grid */}
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
            
            {/* Loader */}
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

export default Delivery;