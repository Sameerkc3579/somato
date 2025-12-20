// server/models/Favorite.js
const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    restaurantName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ""
    },
    cuisine: {
        type: String,
        default: "Fast Food"
    },
    rating: {
        type: Number,
        default: 4.0
    },
    time: {
        type: String,
        default: "30 mins"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate favorites for the same user + restaurant
FavoriteSchema.index({ userEmail: 1, restaurantName: 1 }, { unique: true });

module.exports = mongoose.model('Favorite', FavoriteSchema);