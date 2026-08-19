const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getVendorOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/vendor/:vendorId', protect, authorize('vendor', 'admin'), getVendorOrders);
router.put('/:id/status', protect, authorize('vendor', 'admin'), updateOrderStatus);

module.exports = router;
