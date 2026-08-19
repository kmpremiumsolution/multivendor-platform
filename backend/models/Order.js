const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    title: String,
    quantity: { type: Number, default: 1 },
    price: Number,
    // Hotel booking specific
    checkInDate: Date,
    checkOutDate: Date,
    guests: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    type: {
      type: String,
      enum: ['food_delivery', 'hotel_booking', 'grocery'],
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    deliveryAddress: {
      street: String,
      city: String,
      lat: Number,
      lng: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'checked_in', 'checked_out', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: { type: String, enum: ['cod', 'card', 'wallet'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'pending' },
    notes: { type: String },
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ vendor: 1, status: 1 });

module.exports = mongoose.model('Order', orderSchema);
