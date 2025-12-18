import React, { useState, useEffect, useRef, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import RestaurantCard from "../components/RestaurantCard"; 
import TabOptions from "../components/TabOptions";

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

const FilterButton = ({ icon: Icon, text, hasDropdown, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-4 py-2 bg-white border ${active ? 'border-[#EF4F5F] bg-red-50 text-[#EF4F5F]' : 'border-gray-300 text-gray-500'} rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm transition-all`}>
    {Icon && <Icon className="w-4 h-4" />} {text} {hasDropdown && <ChevronDown className="w-4 h-4" />}
  </button>
);

const DiningOut = ({ city }) => { 
    const [activeFilters, setActiveFilters] = useState([]);
    const [infiniteList, setInfiniteList] = useState([]);
    const loaderRef = useRef(null);
    
    const filteredList = useMemo(() => fullDiningList.filter(r => { 
        if (activeFilters.includes("tableBooking") && !r.hasBooking) return false;
        if (activeFilters.includes("outdoorSeating") && !r.hasOutdoor) return false;
        if (activeFilters.includes("buffet") && !r.servesBuffet) return false;
        if (activeFilters.includes("pureVeg") && !r.isDiningVeg) return false;
        return true;
    }), [activeFilters]);

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

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20">
            <TabOptions activeTab="Dining Out" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-4 mb-6">
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Dining Out Restaurants in <span className="font-bold text-[#EF4F5F]">{city || "Hajipur"}</span></h1>
                    <div className="flex flex-wrap gap-3">
                        <FilterButton icon={SlidersHorizontal} text="Filters" />
                        <FilterButton text="Table Booking" active={activeFilters.includes("tableBooking")} onClick={() => toggleFilter("tableBooking")} />
                        <FilterButton text="Outdoor Seating" active={activeFilters.includes("outdoorSeating")} onClick={() => toggleFilter("outdoorSeating")} />
                        <FilterButton text="Serves Buffet" active={activeFilters.includes("buffet")} onClick={() => toggleFilter("buffet")} />
                        <FilterButton text="Pure Veg" active={activeFilters.includes("pureVeg")} onClick={() => toggleFilter("pureVeg")} />
                        <FilterButton text="Cuisines" hasDropdown />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {infiniteList.map((restaurant, index) => (
                        <RestaurantCard key={`${restaurant.id}-${index}`} info={restaurant} currentCity={city} />
                    ))}
                    <div ref={loaderRef} className="col-span-3 h-20 flex justify-center items-center">
                         <div className="w-8 h-8 border-4 border-gray-200 border-t-[#EF4F5F] rounded-full animate-spin"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiningOut;