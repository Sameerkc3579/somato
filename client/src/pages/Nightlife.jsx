import React, { useState, useEffect, useRef, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import RestaurantCard from "../components/RestaurantCard"; 
import TabOptions from "../components/TabOptions";

// --- NIGHTLIFE DATA ---
const nightlifeData = [
  { name: "Lord of the Drinks", cuisine: "Lounge, North Indian", image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80" },
  { name: "Tamasha", cuisine: "Pub, Continental", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80" },
  { name: "The Flying Saucer", cuisine: "Lounge, Italian", image: "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&q=80" },
  { name: "Warehouse Cafe", cuisine: "Bar, American", image: "https://images.unsplash.com/photo-1536935338788-843bb52b3646?w=800&q=80" },
  { name: "Openhouse Cafe", cuisine: "Cafe, Bar", image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80" },
  { name: "Ministry of Beer", cuisine: "Microbrewery", image: "https://images.unsplash.com/photo-1583623733237-4d5764a9dc2b?w=800&q=80" },
  { name: "The Beer Cafe", cuisine: "Pub, Finger Food", image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800&q=80" },
  { name: "The Irish House", cuisine: "Pub, European", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" },
  { name: "Monkey Bar", cuisine: "Bar, Asian", image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=800&q=80" },
  { name: "Social", cuisine: "Lounge, American", image: "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=800&q=80" },
  { name: "Raasta", cuisine: "Lounge, Caribbean", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80" },
  { name: "Summer House Cafe", cuisine: "Cafe, Live Music", image: "https://images.unsplash.com/photo-1459749411177-3c2eaafa0951?w=800&q=80" },
  { name: "Auro", cuisine: "Bar, Modern Indian", image: "https://images.unsplash.com/photo-1563841930606-67e26ce48b19?w=800&q=80" },
  { name: "Privee", cuisine: "Club", image: "https://images.unsplash.com/photo-1570554807997-6a4057639f75?w=800&q=80" },
  { name: "Kitty Su", cuisine: "Club, Finger Food", image: "https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80" },
  { name: "Playboy Club", cuisine: "Club, Continental", image: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80" },
  { name: "Toy Room", cuisine: "Club, R&B", image: "https://images.unsplash.com/photo-1621379377473-b3c377a02293?w=800&q=80" },
  { name: "SoHo", cuisine: "Club, European", image: "https://images.unsplash.com/photo-1571217622634-118838382c24?w=800&q=80" },
  { name: "The Electric Room", cuisine: "Bar, Live Music", image: "https://images.unsplash.com/photo-1504502350617-c88a93707d91?w=800&q=80" },
  { name: "Lithiyum", cuisine: "Club", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=800&q=80" },
  { name: "Key", cuisine: "Club, Finger Food", image: "https://images.unsplash.com/photo-1566417713204-3849913590ac?w=800&q=80" },
  { name: "Pacha", cuisine: "Club, Spanish", image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=800&q=80" },
  { name: "Hype", cuisine: "Club", image: "https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?w=800&q=80" },
  { name: "RSVP", cuisine: "Club, Modern", image: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?w=800&q=80" },
  { name: "Slique", cuisine: "Bar, Asian", image: "https://images.unsplash.com/photo-1578474843222-9593bc81e58f?w=800&q=80" },
  { name: "Diablo", cuisine: "Mediterranean, Bar", image: "https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80" },
  { name: "Dragonfly", cuisine: "Asian, Bar", image: "https://images.unsplash.com/photo-1627993077750-482a033c4832?w=800&q=80" },
  { name: "Plum by Bent Chair", cuisine: "Asian, Bar", image: "https://images.unsplash.com/photo-1519671482538-58d77a90e6af?w=800&q=80" },
  { name: "Miso Sexy", cuisine: "Asian, Bar", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" },
  { name: "Dear Donna", cuisine: "Bar, European", image: "https://images.unsplash.com/photo-1596701062302-8a50d2aa8f0c?w=800&q=80" },
  { name: "Bo Tai", cuisine: "Thai, Bar", image: "https://images.unsplash.com/photo-1582298538104-fe2e74c2ed54?w=800&q=80" },
  { name: "Pa Pa Ya", cuisine: "Asian, Bar", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=800&q=80" },
  { name: "Farzi Cafe", cuisine: "Modern Indian, Bar", image: "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?w=800&q=80" },
  { name: "Masala Library", cuisine: "Modern Indian", image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800&q=80" },
  { name: "Made in Punjab", cuisine: "North Indian, Bar", image: "https://images.unsplash.com/photo-1582229237624-9b2447997233?w=800&q=80" },
  { name: "The Wine Company", cuisine: "Wine Bar, European", image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80" },
  { name: "The Cocktail Bar", cuisine: "Bar, Finger Food", image: "https://images.unsplash.com/photo-1559070169-a3077159ee16?w=800&q=80" },
  { name: "Sidecar", cuisine: "Bar, Asian", image: "https://images.unsplash.com/photo-1583921769399-6379963972c6?w=800&q=80" },
  { name: "Whiskey Samba", cuisine: "Bar, Italian", image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80" },
  { name: "The Piano Man", cuisine: "Jazz Bar", image: "https://images.unsplash.com/photo-1596919248234-f26cb4723902?w=800&q=80" },
  { name: "Speak Easy", cuisine: "Bar, Finger Food", image: "https://images.unsplash.com/photo-1570560258879-af7f8e1447ac?w=800&q=80" },
  { name: "The Library", cuisine: "Bar, Lounge", image: "https://images.unsplash.com/photo-1586796676779-37330777e49c?w=800&q=80" },
  { name: "The Blue Bar", cuisine: "Bar, Outdoor", image: "https://images.unsplash.com/photo-1519671482538-58d77a90e6af?w=800&q=80" },
  { name: "The Polo Lounge", cuisine: "Bar, British", image: "https://images.unsplash.com/photo-1582106245687-cbb6e913d8d8?w=800&q=80" },
  { name: "Rick's", cuisine: "Bar, Asian", image: "https://images.unsplash.com/photo-1574096079513-d82599602959?w=800&q=80" },
  { name: "100% Rock", cuisine: "Pub, Rock Music", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80" },
  { name: "My Bar", cuisine: "Bar, North Indian", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80" },
  { name: "Cafe MRP", cuisine: "Cafe, Bar", image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800&q=80" },
  { name: "Pebble Street", cuisine: "Pub, European", image: "https://images.unsplash.com/photo-1594937104583-0d63d446e631?w=800&q=80" },
  { name: "The Hangar", cuisine: "Bar, Lounge", image: "https://images.unsplash.com/photo-1563245372-f21724e3a8c9?w=800&q=80" }
];

const fullNightlifeList = nightlifeData.map((item, index) => ({
    id: 300 + index,
    name: item.name,
    rating: (Math.random() * (4.9 - 3.5) + 3.5).toFixed(1),
    cuisine: item.cuisine,
    price: `₹${Math.floor(Math.random() * 3000) + 1000} for two`,
    image: item.image,
    servesCocktails: true,
    hasLiveMusic: index % 3 === 0,
    hasOutdoor: index % 4 === 0,
    hasHappyHour: index % 2 === 0,
    discount: index % 5 === 0 ? "Free Drink" : null
}));

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

// 🔥 1. Define Filterable Bar Types
const BAR_TYPES = ["Pub", "Club", "Lounge", "Bar", "Microbrewery", "Cafe", "Wine Bar", "Jazz Bar"];

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

const Nightlife = ({ city }) => { 
    // 🔥 2. State for Filters & Bar Types
    const [activeFilters, setActiveFilters] = useState([]);
    const [activeBarTypes, setActiveBarTypes] = useState([]);
    const [isBarTypeDropdownOpen, setIsBarTypeDropdownOpen] = useState(false);

    const [infiniteList, setInfiniteList] = useState([]);
    const loaderRef = useRef(null);
    
    // 🔥 3. Filter Logic (Checks "cuisine" string for bar type keywords)
    const filteredList = useMemo(() => fullNightlifeList.filter(spot => { 
        // Standard Filters
        if (activeFilters.includes("cocktails") && !spot.servesCocktails) return false;
        if (activeFilters.includes("liveMusic") && !spot.hasLiveMusic) return false;
        if (activeFilters.includes("outdoorBar") && !spot.hasOutdoor) return false;
        if (activeFilters.includes("happyHour") && !spot.hasHappyHour) return false;
        
        // Bar Type Filter
        if (activeBarTypes.length > 0) {
            // e.g., spot.cuisine might be "Pub, Continental"
            const hasMatch = activeBarTypes.some(type => 
                spot.cuisine.toLowerCase().includes(type.toLowerCase())
            );
            if (!hasMatch) return false;
        }

        return true;
    }), [activeFilters, activeBarTypes]);

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

    const toggleFilter = (f) => setActiveFilters(prev => prev.includes(f) ? prev.filter(i => i !== f) : [...prev, f]);
    
    const toggleBarType = (type) => {
        setActiveBarTypes(prev => prev.includes(type) ? prev.filter(i => i !== type) : [...prev, type]);
    };

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20 w-full overflow-x-hidden">
            <TabOptions activeTab="Nightlife" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🔥 4. Invisible Backdrop */}
                {isBarTypeDropdownOpen && (
                    <div className="fixed inset-0 z-40" onClick={() => setIsBarTypeDropdownOpen(false)}></div>
                )}

                <div className="py-4 mb-6 relative z-50">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Nightlife in <span className="font-bold text-[#EF4F5F]">{city || "Hajipur"}</span></h1>
                    
                    <div className="flex flex-wrap gap-3">
                        <FilterButton icon={SlidersHorizontal} text="Filters" />
                        <FilterButton text="Serves Cocktails" active={activeFilters.includes("cocktails")} onClick={() => toggleFilter("cocktails")} />
                        <FilterButton text="Live Music" active={activeFilters.includes("liveMusic")} onClick={() => toggleFilter("liveMusic")} />
                        <FilterButton text="Outdoor Bar" active={activeFilters.includes("outdoorBar")} onClick={() => toggleFilter("outdoorBar")} />
                        <FilterButton text="Happy Hour" active={activeFilters.includes("happyHour")} onClick={() => toggleFilter("happyHour")} />
                        
                        {/* 🔥 5. Bar Type Dropdown Container */}
                        <div className="relative">
                            <FilterButton 
                                text="Bar Type" 
                                hasDropdown 
                                active={activeBarTypes.length > 0}
                                badgeCount={activeBarTypes.length}
                                onClick={() => setIsBarTypeDropdownOpen(!isBarTypeDropdownOpen)} 
                            />
                            
                            {/* Dropdown Menu */}
                            {isBarTypeDropdownOpen && (
                                <div className="absolute top-12 left-0 bg-white border border-gray-100 shadow-xl rounded-xl p-4 w-64 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-sm font-bold text-gray-700">Select Type</span>
                                        {activeBarTypes.length > 0 && (
                                            <button onClick={() => setActiveBarTypes([])} className="text-xs text-[#EF4F5F] font-bold hover:underline">Clear</button>
                                        )}
                                    </div>
                                    
                                    <div className="max-h-64 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
                                        {BAR_TYPES.map((type) => (
                                            <div 
                                                key={type} 
                                                onClick={() => toggleBarType(type)}
                                                className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${activeBarTypes.includes(type) ? "bg-[#EF4F5F] border-[#EF4F5F]" : "border-gray-300"}`}>
                                                        {activeBarTypes.includes(type) && <Check className="w-3 h-3 text-white" />}
                                                    </div>
                                                    <span className={`text-sm ${activeBarTypes.includes(type) ? "text-gray-800 font-medium" : "text-gray-500"}`}>{type}</span>
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
                        infiniteList.map((spot, index) => (
                            <RestaurantCard key={`${spot.id}-${index}`} info={spot} currentCity={city} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500">
                            <div className="text-4xl mb-4">🥂</div>
                            <p>No nightlife spots match your filters.</p>
                            <button onClick={() => {setActiveFilters([]); setActiveBarTypes([]);}} className="mt-4 text-[#EF4F5F] font-bold hover:underline">Clear all filters</button>
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

export default Nightlife;