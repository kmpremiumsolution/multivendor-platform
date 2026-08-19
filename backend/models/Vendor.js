const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['restaurant', 'hotel', 'mart'],
      required: true,
    },
    description: { type: String },
    logo: { type: String },
    coverImage: { type: String },
    location: {
      address: String,
      city: String,
      lat: Number,
      lng: Number,
    },
    phone: { type: String, required: true },
    commissionRate: { type: Number, default: 10 }, // percentage
    isApproved: { type: Boolean, default: false },
    isOpen: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

vendorSchema.index({ 'location.lat': 1, 'location.lng': 1 });
vendorSchema.index({ type: 1 });

module.exports = mongoose.model('Vendor', vendorSchema);
