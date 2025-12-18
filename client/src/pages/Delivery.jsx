import React, { useState, useEffect, useRef, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import RestaurantCard from "../components/RestaurantCard"; 
import TabOptions from "../components/TabOptions";

// --- 50 UNIQUE REAL IMAGES FOR DELIVERY ---
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

const FilterButton = ({ icon: Icon, text, hasDropdown, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center gap-2 px-3 py-2 bg-white border ${active ? 'border-[#EF4F5F] bg-red-50 text-[#EF4F5F]' : 'border-gray-300 text-gray-500'} rounded-lg text-sm font-medium hover:bg-gray-50 transition-all`}>
    {Icon && <Icon className="w-4 h-4" />} {text} {hasDropdown && <ChevronDown className="w-4 h-4" />}
  </button>
);

const Delivery = ({ city }) => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [infiniteList, setInfiniteList] = useState([]);
  const loaderRef = useRef(null);

  const filteredList = useMemo(() => {
    return fullDeliveryList.filter((restaurant) => {
      if (activeFilters.includes("rating") && parseFloat(restaurant.rating) < 4.0) return false;
      if (activeFilters.includes("veg") && !restaurant.isVeg) return false;
      return true;
    });
  }, [activeFilters]);

  useEffect(() => { setInfiniteList(filteredList.slice(0, 12)); }, [filteredList]);

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

  const toggleFilter = (f) => setActiveFilters(prev => prev.includes(f) ? prev.filter(i => i !== f) : [...prev, f]);

  return (
    <div className="min-h-screen bg-gray-50/20 pb-20">
      <TabOptions activeTab="Delivery" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">Delivery Restaurants in <span className="font-bold text-[#EF4F5F]">{city || "Hajipur"}</span></h1>
            <div className="flex flex-wrap gap-3">
                <FilterButton icon={SlidersHorizontal} text="Filters" />
                <FilterButton text="Rating: 4.0+" active={activeFilters.includes("rating")} onClick={() => toggleFilter("rating")} />
                <FilterButton text="Pure Veg" active={activeFilters.includes("veg")} onClick={() => toggleFilter("veg")} />
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

export default Delivery;