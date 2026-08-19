const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProductsByVendor,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

router.get('/vendor/:vendorId', getProductsByVendor);
router.get('/:id', getProductById);
router.post('/', protect, authorize('vendor', 'admin'), createProduct);
router.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

module.exports = router;
