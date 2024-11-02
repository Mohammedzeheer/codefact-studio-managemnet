const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Studio name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
    min: 0
  },
  amenities: [{
    type: String,
    trim: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    // default: 'https://res.cloudinary.com/dah6aafle/image/upload/v1730554339/codefact/codefaxsds_a98pnf.jpg'
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
    trim: true,
    lowercase: true
  },
  contactPhone: {
    type: String,
    required: [true, 'Contact phone is required'],
    trim: true
  },
  availability: {
    monday: {
      start: String,
      end: String
    },
    tuesday: {
      start: String,
      end: String
    },
    wednesday: {
      start: String,
      end: String
    },
    thursday: {
      start: String,
      end: String
    },
    friday: {
      start: String,
      end: String
    },
    saturday: {
      start: String,
      end: String
    },
    sunday: {
      start: String,
      end: String
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

studioSchema.index({ name: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Studio', studioSchema);