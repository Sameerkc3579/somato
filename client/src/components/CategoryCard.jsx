import React from "react";
import { Link } from "react-router-dom"; // <--- IMPORTANT: Must import this

const CategoryCard = () => {
  const cards = [
    {
      title: "Order Online",
      desc: "Stay home and order to your doorstep",
      image: "https://b.zmtcdn.com/webFrontend/e5b8785c257af2a7f354f1addaf37e4e1647364814.jpeg",
      link: "/delivery" // <--- The path to the new page
    },
    {
      title: "Dining",
      desc: "View the city's favourite dining venues",
      image: "https://b.zmtcdn.com/webFrontend/d026b357feb0d63c99754843108ca5351647364915.jpeg",
      link: "/dining"
    },
    {
      title: "Live Events",
      desc: "Discover India's best events & concerts",
      image: "https://b.zmtcdn.com/webFrontend/d9d80ef91cb552e3fdfadb3d4f4379761647365057.jpeg",
      link: "/nightlife"
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        // IMPORTANT: We use <Link> here, NOT <a> or <div>
        <Link to={card.link} key={index} className="block">
          <div className="rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg cursor-pointer transition duration-300 transform hover:scale-105">
            <div className="h-40 w-full overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{card.desc}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCard;