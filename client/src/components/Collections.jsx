import React from "react";

const Collections = () => {
  const collections = [
    {
      title: "Top Trending Spots",
      places: "29 Places",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=80",
    },
    {
      title: "Best of Live Events",
      places: "15 Places",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&q=80",
    },
    {
      title: "Newly Opened",
      places: "12 Places",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=500&q=80",
    },
    {
      title: "Veggie Friendly",
      places: "22 Places",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Title Section */}
      <h2 className="text-3xl font-semibold text-gray-800">Collections</h2>
      <div className="flex justify-between items-end mb-6">
        <p className="text-gray-500 text-lg">
          Explore curated lists of top restaurants, cafes, pubs, and bars in your city, based on trends
        </p>
        <a href="#" className="text-zomatoRed text-lg hover:underline hidden md:block">
          All collections in Hajipur ▶
        </a>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {collections.map((item, index) => (
          <div 
            key={index} 
            className="relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition duration-300"
          >
            {/* Background Image */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>

            {/* Text Content */}
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm flex items-center gap-1">
                {item.places} <span className="text-xs">▶</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;