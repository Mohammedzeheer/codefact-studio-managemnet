const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  description: { type: String },
  availability: { type: Boolean, default: true },
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Studio', studioSchema);

