const express = require('express');
const router = express.Router();
const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require('../controllers/vendorController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getVendors);
router.get('/:id', getVendorById);
router.post('/', protect, authorize('vendor', 'admin'), createVendor);
router.put('/:id', protect, authorize('vendor', 'admin'), updateVendor);
router.delete('/:id', protect, authorize('admin'), deleteVendor);

module.exports = router;
