import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Collection = () => {
  const { type } = useParams();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const titles = {
    trending: "Top Trending Spots",
    veggie: "Pure Veggie Friendly",
    new: "Newly Opened Places",
    events: "Best of Live Events"
  };

  useEffect(() => {
    // Fetch filtered data from our new API
    fetch(`/api/collections/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [type]);

  if (loading) return <div className="text-center mt-20 text-xl">Loading Collection...</div>;

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{titles[type] || "Collection"}</h1>
      <p className="text-gray-500 mb-8">{restaurants.length} places found</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((res) => (
          <Link to={`/delivery`} key={res._id} className="block group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
              <img 
                src={res.image} 
                alt={res.name} 
                className="w-full h-60 object-cover group-hover:scale-105 transition duration-300" 
              />
              <div className="p-4 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold text-gray-800">{res.name}</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">
                    {res.rating} ★
                  </span>
                </div>
                <p className="text-gray-500 text-sm truncate">{res.cuisine}</p>
                <div className="mt-3 flex justify-between text-sm text-gray-400">
                  <span>{res.city}</span>
                  <span>{res.price}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;