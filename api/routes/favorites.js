// api/routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite'); // Points to the file we just created

// 1. GET FAVORITES
router.get('/', async (req, res) => {
    const { email } = req.query;
    try {
        const favorites = await Favorite.find({ userEmail: email });
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. ADD FAVORITE
router.post('/add', async (req, res) => {
    const { userEmail, restaurantName, image, cuisine, rating, time } = req.body;
    try {
        const existingFav = await Favorite.findOne({ userEmail, restaurantName });
        if (existingFav) return res.status(400).json({ message: "Already in favorites" });

        const newFav = new Favorite({
            userEmail, restaurantName, image, cuisine, rating, time
        });
        const savedFav = await newFav.save();
        res.status(201).json(savedFav);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. REMOVE FAVORITE
router.delete('/:id', async (req, res) => {
    try {
        await Favorite.findByIdAndDelete(req.params.id);
        res.json({ message: "Removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. REMOVE BY NAME (Alternative for "Toggle" buttons)
router.post('/remove', async (req, res) => {
    const { email, restaurantName } = req.body;
    try {
        await Favorite.findOneAndDelete({ userEmail: email, restaurantName });
        res.json({ message: "Removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;