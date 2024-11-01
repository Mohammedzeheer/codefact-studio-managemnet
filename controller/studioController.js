const Studio = require('../models/Studio');

// Get All Studios with Filters
exports.getStudios = async (req, res) => {
  try {
    const { location, category, minPrice, maxPrice, rating } = req.query;
    const filter = {};

    if (location) filter.location = location;
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
    if (rating) filter.rating = { $gte: rating };

    const studios = await Studio.find(filter);
    res.json(studios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add New Studio
exports.addStudio = async (req, res) => {
  try {
    const studio = new Studio(req.body);
    await studio.save();
    res.status(201).json(studio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Studio by ID
exports.getStudioById = async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.json(studio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Studio
exports.updateStudio = async (req, res) => {
  try {
    const studio = await Studio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.json(studio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
