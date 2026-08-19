const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true }, // e.g. 'main-course', 'grocery', 'deluxe-room'
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    isAvailable: { type: Boolean, default: true },
    stock: { type: Number, default: 0 }, // relevant for mart items

    // Hotel-specific fields (only used when vendor.type === 'hotel')
    roomType: { type: String }, // e.g. 'Deluxe', 'Standard', 'Suite'
    maxGuests: { type: Number },
    pricePerNight: { type: Number },
    amenities: [{ type: String }],
  },
  { timestamps: true }
);

productSchema.index({ vendor: 1, category: 1 });

module.exports = mongoose.model('Product', productSchema);
