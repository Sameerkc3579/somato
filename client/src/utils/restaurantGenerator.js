export const generateNewRestaurants = (count = 3) => {
    const names = ["The Royal Table", "Spice Hub", "Tandoori Nights", "Curry House", "Urban Grill", "Green Leaf", "Pure Bites"];
    const cuisines = ["North Indian", "Chinese", "South Indian", "Fast Food", "Biryani"];
    
    // Fallback images if Unsplash has issues
    const images = [
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600"
    ];
  
    const newItems = [];
    for (let i = 0; i < count; i++) {
      const randomName = names[Math.floor(Math.random() * names.length)];
      
      // 50% chance of being Pure Veg
      const isVeg = Math.random() > 0.5;
  
      newItems.push({
        id: Date.now() + i,
        name: `${randomName} ${Math.floor(Math.random() * 100)}`,
        rating: (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1),
        cuisine: cuisines[Math.floor(Math.random() * cuisines.length)],
        price: `₹${Math.floor(Math.random() * 500) + 100} for one`,
        isVeg: isVeg, // Assign the flag
        discount: Math.random() > 0.7 ? "Flat 20% OFF" : "",
        image: images[Math.floor(Math.random() * images.length)]
      });
    }
    return newItems;
  };