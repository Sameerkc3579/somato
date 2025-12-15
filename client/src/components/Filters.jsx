import React, { useState } from "react";

const Filters = ({ activeFilters, setActiveFilters }) => {
  const [isCuisineOpen, setIsCuisineOpen] = useState(false);

  const cuisineList = ["North Indian", "South Indian", "Chinese", "Italian", "Biryani"];

  const toggleFilter = (filterName) => {
    if (activeFilters.includes(filterName)) {
      setActiveFilters(activeFilters.filter((f) => f !== filterName));
    } else {
      setActiveFilters([...activeFilters, filterName]);
    }
  };

  const getClass = (name) => {
    return activeFilters.includes(name)
      ? "bg-red-100 border-red-500 text-zomatoRed"
      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50";
  };

  return (
    <>
      {/* 1. INVISIBLE BACKDROP: Closes dropdown when clicking outside */}
      {isCuisineOpen && (
        <div 
          className="fixed inset-0 z-10 cursor-default" 
          onClick={() => setIsCuisineOpen(false)}
        ></div>
      )}

      <div className="flex flex-wrap gap-3 py-4 relative z-20">
        {/* Main Filter Icon */}
        <div className="border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition shadow-sm text-gray-500">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-medium">Filters</span>
        </div>

        {/* Rating Toggle */}
        <button
          onClick={() => toggleFilter("rating")}
          className={`border rounded-lg px-3 py-2 text-sm font-medium transition shadow-sm ${getClass("rating")}`}
        >
          Rating: 4.0+
        </button>

        {/* Pure Veg Toggle */}
        <button
          onClick={() => toggleFilter("veg")}
          className={`border rounded-lg px-3 py-2 text-sm font-medium transition shadow-sm ${getClass("veg")}`}
        >
          Pure Veg
        </button>

        {/* CUISINES DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setIsCuisineOpen(!isCuisineOpen)}
            className={`border rounded-lg px-3 py-2 flex items-center gap-2 cursor-pointer transition shadow-sm text-sm font-medium ${
              cuisineList.some(c => activeFilters.includes(c)) ? "bg-red-100 border-red-500 text-zomatoRed" : "bg-white border-gray-300 text-gray-500"
            }`}
          >
            <span>Cuisines</span>
            <span className="text-xs">▼</span>
          </button>

          {isCuisineOpen && (
            <div className="absolute top-12 left-0 bg-white border border-gray-200 shadow-xl rounded-lg p-4 w-48 flex flex-col gap-2 z-50">
              {cuisineList.map((cuisine) => (
                <div 
                  key={cuisine} 
                  onClick={() => toggleFilter(cuisine)}
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <div className={`w-4 h-4 border rounded flex items-center justify-center ${activeFilters.includes(cuisine) ? "bg-zomatoRed border-zomatoRed" : "border-gray-400"}`}>
                      {activeFilters.includes(cuisine) && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${activeFilters.includes(cuisine) ? "text-gray-800 font-bold" : "text-gray-600"}`}>
                      {cuisine}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Filters;