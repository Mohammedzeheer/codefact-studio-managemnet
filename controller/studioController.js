const Studio = require('../models/Studio');
const { validateStudio } = require('../utils/validation');
const ApiError = require('../utils/ApiError');


exports.getStudios = async (req, res, next) => {
  console.log('hello')
  try {
    const {
      location,
      priceRange,
      rating,
      searchTerm,
      page = 1,
      limit = 10
    } = req.query;
    const query = {};

    // Add filters
    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (priceRange) {
      switch (priceRange) {
        case 'budget':
          query.pricePerHour = { $lte: 1000 };
          break;
        case 'mid':
          query.pricePerHour = { $gt: 1000, $lte: 3000 };
          break;
        case 'premium':
          query.pricePerHour = { $gt: 3000 };
          break;
      }
    }

    if (rating) {
      query.rating = { $gte: parseInt(rating) };
    }

    if (searchTerm) {
      query.$text = { $search: searchTerm };
    }

    // Execute query with pagination
    const studios = await Studio.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count for pagination
    const total = await Studio.countDocuments(query);

    res.status(200).json({
      studios,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    next(error);
  }
},

  // Get single studio
  exports.getStudio = async (req, res, next) => {
    try {
      const studio = await Studio.findById(req.params.id);
      if (!studio) {
        throw new ApiError(404, 'Studio not found');
      }
      res.status(200).json(studio);
    } catch (error) {
      next(error);
    }
  },

  exports.createStudio = async (req, res, next) => {
    try {
      const validatedData = validateStudio(req.body);
      validatedData.owner = req.user.userId;
      validatedData.image = req.body.image ?? ''
      const studio = await Studio.create(validatedData);
      
      res.status(201).json({
        status: 'success',
        data: studio
      });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({
          status: 'error',
          message: error.message,
          errors: error.errors
        });
      } else {
        next(error);
      }
    }
  };


  // Update studio
  exports.updateStudio = async (req, res, next) => {
    try {
      const studio = await Studio.findById(req.params.id);

      if (!studio) {
        throw new ApiError(404, 'Studio not found');
      }

      // Check user
      if (studio.owner.toString() !== req.user.userId) {
        throw new ApiError(403, 'Not authorized to update this studio');
      }

      // Validate update data
      const validatedData = validateStudio(req.body);

      // Update studio
      const updatedStudio = await Studio.findByIdAndUpdate(
        req.params.id,
        validatedData,
        { new: true, runValidators: true }
      );

      res.status(200).json(updatedStudio);
    } catch (error) {
      next(error);
    }
  },

  // Delete studio
  exports.deleteStudio = async (req, res, next) => {
    try {
      const studio = await Studio.findById(req.params.id);

      if (!studio) {
        throw new ApiError(404, 'Studio not found');
      }

      // Check ownership
      if (studio.owner.toString() !== req.user.id) {
        throw new ApiError(403, 'Not authorized to delete this studio');
      }

      await studio.remove();

      res.status(200).json({ message: 'Studio deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
