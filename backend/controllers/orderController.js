const Order = require('../models/Order');

// @desc    Create new order/booking
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user._id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('vendor', 'name type')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get orders for a vendor (vendor dashboard)
// @route   GET /api/orders/vendor/:vendorId
exports.getVendorOrders = async (req, res) => {
  try {
    const orders = await Order.find({ vendor: req.params.vendorId })
      .populate('user', 'name phone')
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (vendor/admin)
// @route   PUT /api/orders/:id/status
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
